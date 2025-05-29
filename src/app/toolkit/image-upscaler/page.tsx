"use client";

import { useEffect, useState } from "react";
import { 
  superscaleImage, 
  getSupercaleHistory, 
  getRateLimitInfo, 
  isRateLimited, 
  getRateLimitResetTime 
} from "@/utils/superscale";
import Link from "next/link";

export default function ImageUpscalerPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [resizeFactor, setResizeFactor] = useState<number>(4);
  const [isAnime, setIsAnime] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [rateLimitCount, setRateLimitCount] = useState<number>(0);
  const [rateLimitReset, setRateLimitReset] = useState<string>("");

  // Load history and rate limit info when component mounts
  useEffect(() => {
    setHistory(getSupercaleHistory());
    updateRateLimitInfo();

    // Update rate limit info every minute
    const interval = setInterval(updateRateLimitInfo, 60000);
    return () => clearInterval(interval);
  }, []);

  // Update rate limit information
  const updateRateLimitInfo = () => {
    const info = getRateLimitInfo();
    setRateLimitCount(info.count);
    setRateLimitReset(getRateLimitResetTime());
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!imageUrl) {
      setError("Image URL is required");
      return;
    }

    try {
      setIsLoading(true);
      const response = await superscaleImage(imageUrl, resizeFactor, isAnime);
      
      if (response.status === "error") {
        setError(response.error || "An error occurred");
      } else {
        setResult(response.imageUrl || "");
      }
      
      // Refresh history and rate limit info
      setHistory(getSupercaleHistory());
      updateRateLimitInfo();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle history item click
  const handleHistoryItemClick = (item: any) => {
    setImageUrl(item.originalUrl);
    setResizeFactor(item.resize);
    setIsAnime(item.anime);
    setResult(item.imageUrl);
  };

  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/toolkit" className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-primary font-medium py-2 px-4 rounded-lg transition-colors w-fit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Toolkit
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">AI Image Upscaler</h1>
        <p className="text-gray-600">
          Enhance and upscale your images with AI technology up to 8x resolution while maintaining quality.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Form Superscale */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            {/* Rate Limit Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-gray-700">Rate Limit:</span>
                  <span className="ml-2 text-sm text-gray-600">{rateLimitCount}/5 requests per hour</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Resets in:</span>
                  <span className="ml-2 text-sm text-gray-600">{rateLimitReset}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Resize Factor (2, 4, 6, 8, 16)
                </label>
                <select
                  value={resizeFactor}
                  onChange={(e) => setResizeFactor(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value={2}>2x</option>
                  <option value={4}>4x</option>
                  <option value={6}>6x</option>
                  <option value={8}>8x</option>
                  <option value={16}>16x</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isAnime}
                    onChange={(e) => setIsAnime(e.target.checked)}
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Anime Mode (for anime/cartoon images)
                  </span>
                </label>
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-primary py-3 px-6 text-white hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || isRateLimited()}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">Processing...</span>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></span>
                    </>
                  ) : isRateLimited() ? (
                    `Rate limit reached. Try again in ${rateLimitReset}`
                  ) : (
                    "Process Image"
                  )}
                </button>
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Result</h3>
                <div className="flex flex-col gap-4">
                  <div className="border border-gray-200 p-1 rounded-lg">
                    <img 
                      src={result} 
                      alt="Superscale Result" 
                      className="w-full h-auto rounded"
                    />
                  </div>
                  <div>
                    <a 
                      href={result} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Open image in new tab
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">History</h2>
            
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">No history yet. Process some images to see them here.</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                {history.map((item, index) => (
                  <div 
                    key={index}
                    onClick={() => handleHistoryItemClick(item)}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs text-gray-500">
                        {formatDate(item.timestamp)}
                      </div>
                      <div className="text-xs">
                        <span className={`px-2 py-1 rounded-full ${
                          item.status === 'success' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    
                    {item.status === 'success' && item.imageUrl && (
                      <div className="mb-2 border border-gray-200 rounded overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt="Thumbnail" 
                          className="w-full h-20 object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="text-xs truncate">
                      <span className="font-medium">URL: </span>
                      {item.originalUrl}
                    </div>
                    <div className="text-xs">
                      <span className="font-medium">Resize: </span>
                      {item.resize}x
                      <span className="ml-2 font-medium">Anime: </span>
                      {item.anime ? 'Yes' : 'No'}
                    </div>
                    
                    {item.status === 'error' && (
                      <div className="text-xs text-red-600 mt-1">
                        {item.error}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 