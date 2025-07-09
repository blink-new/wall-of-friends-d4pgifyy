import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import UploadButton from "@/components/UploadButton";
import { X, Heart } from "lucide-react";

interface FullScreenMomentsProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
  media: { url: string; type: "image" | "video" }[];
  onUpload: (files: FileList) => void;
  onMediaClick: (media: { url: string; type: "image" | "video" }) => void;
  onDelete: (media: { url: string; type: "image" | "video" }) => void;
}

export default function FullScreenMoments({
  isOpen,
  onClose,
  gameName,
  media,
  onUpload,
  onMediaClick,
  onDelete
}: FullScreenMomentsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [likedMedia, setLikedMedia] = useState<string[]>([]); // Stores URLs of liked media
  const [confirmDelete, setConfirmDelete] = useState<null | { url: string; type: "image" | "video" }>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Load likes from localStorage when component mounts or opens
      const storedLikes = JSON.parse(localStorage.getItem('likedMedia') || '[]');
      setLikedMedia(storedLikes);
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

  const handleLikeClick = (url: string) => {
    const newLikedMedia = likedMedia.includes(url)
      ? likedMedia.filter(itemUrl => itemUrl !== url)
      : [...likedMedia, url];
    setLikedMedia(newLikedMedia);
    localStorage.setItem('likedMedia', JSON.stringify(newLikedMedia));
  };

  const handleDeleteClick = (item: { url: string; type: "image" | "video" }) => {
    if (window.confirm('Are you sure you want to delete this moment?')) {
      onDelete(item);
    }
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
            {/* Thumbnail Grid */}
            <div className="max-w-6xl mx-auto">
              <h3 className="text-white text-lg font-semibold mb-4">
                All Moments ({media.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {media.map((item, index) => (
                  <div
                    key={index}
                    role="button"
                    tabIndex={0}
                    onClick={() => onMediaClick(item)}
                    className={`relative aspect-square bg-secondary/20 rounded-lg overflow-hidden hover:scale-105 transition-transform group cursor-pointer`}
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

                    {/* Delete button */}
                    <button
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-700 text-white p-1 rounded-full transition-colors"
                      onClick={e => {
                        e.stopPropagation();
                        handleDeleteClick(item);
                      }}
                    >
                      <X size={16} />
                    </button>

                    {/* Like button */}
                    <button
                      className="absolute top-1 left-1 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                      onClick={e => {
                        e.stopPropagation();
                        handleLikeClick(item.url);
                      }}
                    >
                      <Heart size={16} fill={likedMedia.includes(item.url) ? "red" : "none"} stroke={likedMedia.includes(item.url) ? "red" : "currentColor"} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Delete Confirmation Modal */}
            {confirmDelete && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
                <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center animate-zoom-in min-w-[300px] max-w-[90vw]">
                  <div className="text-xl font-semibold text-gray-900 mb-4">Delete this moment?</div>
                  <div className="flex gap-4 mt-2">
                    <button
                      className="px-6 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition"
                      onClick={() => {
                        onDelete(confirmDelete);
                        setConfirmDelete(null);
                      }}
                    >
                      Yes, Delete
                    </button>
                    <button
                      className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
                      onClick={() => setConfirmDelete(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}