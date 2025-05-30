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
  const [dragActive, setDragActive] = useState<boolean>(false);

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

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // In a real implementation, you would handle file upload here
    // Since we're working with URLs in this demo, we'll just show an error
    setError("Direct file upload not supported. Please provide an image URL.");
  };

  return (
    <div className="space-y-8 text-white">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <a 
            href="/toolkit" 
            className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              AI Image Upscaler
            </h1>
            <p className="text-gray-300 mt-1">
              Enhance and upscale your images with AI technology up to 16x resolution
            </p>
          </div>
        </div>
        <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
            <span className="text-gray-200">{rateLimitCount}/20</span>
            <span className="mx-2 text-gray-500">•</span>
            <span className="text-gray-300">Resets: {rateLimitReset}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content - Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="p-8">
              <div 
                className={`mb-8 border-2 border-dashed rounded-xl p-8 transition-all ${
                  dragActive 
                  ? 'border-indigo-400 bg-indigo-900/20' 
                  : 'border-gray-600 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-indigo-900/50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Upscale Your Image</h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Enter the URL of your image below or drop an image file here to enhance its resolution and quality
                  </p>
                  
                  <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
                    <div className="group">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Paste image URL here..."
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="w-full bg-white/5 border border-gray-700 rounded-xl py-4 px-5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                        {imageUrl && (
                          <button
                            type="button"
                            onClick={() => setImageUrl("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Resize Factor
                        </label>
                        <div className="relative">
                          <select
                            value={resizeFactor}
                            onChange={(e) => setResizeFactor(Number(e.target.value))}
                            className="w-full appearance-none bg-white/5 border border-gray-700 rounded-xl py-3 px-4 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          >
                            <option value={2}>2x</option>
                            <option value={4}>4x</option>
                            <option value={6}>6x</option>
                            <option value={8}>8x</option>
                            <option value={16}>16x</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-end">
                        <label className="flex items-center bg-white/5 border border-gray-700 rounded-xl p-3 cursor-pointer hover:bg-white/10 transition-colors">
                          <input
                            type="checkbox"
                            checked={isAnime}
                            onChange={(e) => setIsAnime(e.target.checked)}
                            className="h-5 w-5 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-900"
                          />
                          <div className="ml-3">
                            <span className="text-sm font-medium text-white">
                              Anime Mode
                            </span>
                            <p className="text-xs text-gray-400">Optimized for anime/illustrations</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || isRateLimited() || !imageUrl}
                      className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center transition-all ${
                        isLoading || isRateLimited() || !imageUrl
                          ? 'bg-indigo-900/50 text-indigo-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-900/50'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Image...
                        </>
                      ) : isRateLimited() ? (
                        `Rate limit reached. Try again in ${rateLimitReset}`
                      ) : !imageUrl ? (
                        "Enter Image URL"
                      ) : (
                        <>
                          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                          Enhance Image
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-900/20 border border-red-700 text-red-200 rounded-xl text-sm flex items-start">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Result Section */}
          {result && (
            <div className="rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Enhanced Result</h2>
                  <div className="flex space-x-2">
                    <a 
                      href={result} 
                      download="enhanced-image" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                      <span>Download</span>
                    </a>
                    <a 
                      href={result} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                      <span>Open in new tab</span>
                    </a>
                  </div>
                </div>
                <div className="relative group rounded-xl overflow-hidden border border-gray-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/20 to-purple-700/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src={result} 
                    alt="Upscaled Result" 
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    {resizeFactor}x upscaled with {isAnime ? 'anime' : 'standard'} mode
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* History Sidebar */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5 h-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">History</h2>
                {history.length > 0 && (
                  <span className="text-xs font-medium bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded-full">
                    {history.length} {history.length === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <svg className="w-16 h-16 mb-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-sm text-center">No history yet.</p>
                  <p className="text-sm text-center text-gray-500">Process some images to see them here.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto pr-2 custom-scrollbar">
                  {history.map((item, index) => (
                    <div 
                      key={index}
                      onClick={() => handleHistoryItemClick(item)}
                      className="group p-3 border border-gray-700 rounded-xl cursor-pointer hover:border-indigo-500 transition-all bg-white/5 hover:bg-white/10"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                          {item.imageUrl && (
                            <img 
                              src={item.imageUrl} 
                              alt="History thumbnail" 
                              className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="text-sm font-medium text-white truncate max-w-[130px]">
                              {item.originalUrl.split('/').pop()}
                            </div>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                              item.status === 'success' 
                                ? 'bg-green-900/50 text-green-400' 
                                : 'bg-red-900/50 text-red-400'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {formatDate(item.timestamp)}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">
                              {item.resize}x
                            </span>
                            {item.anime && (
                              <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full">
                                Anime
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Info Footer */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Powered by nzrNest AI Technology • {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}