import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadButton from "@/components/UploadButton";

interface FullScreenMomentsProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
  media: { url: string; type: "image" | "video" }[];
  onUpload: (files: FileList) => void;
  onMediaClick: (media: { url: string; type: "image" | "video" }) => void;
}

export default function FullScreenMoments({
  isOpen,
  onClose,
  gameName,
  media,
  onUpload,
  onMediaClick
}: FullScreenMomentsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black/95 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-black/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white">
          {gameName} Moments
        </h2>
        <div className="flex items-center gap-4">
          <UploadButton onUpload={onUpload} />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-white hover:bg-white/20"
          >
            <X size={24} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {media.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="text-white/60 text-lg mb-4">
              No moments yet for {gameName}
            </div>
            <div className="text-white/40 text-sm">
              Upload your first gaming moment to get started!
            </div>
          </div>
        ) : (
          <>
            {/* Featured Image/Video */}
            <div className="mb-8">
              <div className="relative max-w-4xl mx-auto">
                <div className="relative aspect-video bg-secondary/20 rounded-lg overflow-hidden">
                  {media[currentIndex]?.type === "image" ? (
                    <img
                      src={media[currentIndex].url}
                      alt={`${gameName} moment`}
                      className="w-full h-full object-contain cursor-pointer"
                      onClick={() => onMediaClick(media[currentIndex])}
                    />
                  ) : (
                    <video
                      src={media[currentIndex].url}
                      className="w-full h-full object-contain cursor-pointer"
                      controls
                      onClick={() => onMediaClick(media[currentIndex])}
                    />
                  )}
                  
                  {/* Navigation arrows */}
                  {media.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>
                
                {/* Image counter */}
                {media.length > 1 && (
                  <div className="text-center mt-4 text-white/60">
                    {currentIndex + 1} of {media.length}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="max-w-6xl mx-auto">
              <h3 className="text-white text-lg font-semibold mb-4">
                All Moments ({media.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {media.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative aspect-square bg-secondary/20 rounded-lg overflow-hidden hover:scale-105 transition-transform group ${
                      index === currentIndex ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={`${gameName} moment ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                      />
                    )}
                    
                    {/* Play icon overlay for videos */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                        <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[8px] border-l-black border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}