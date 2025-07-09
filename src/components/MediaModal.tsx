import React from "react";

interface MediaModalProps {
  open: boolean;
  onClose: () => void;
  media: { url: string; type: "image" | "video" } | null;
}

export default function MediaModal({ open, onClose, media }: MediaModalProps) {
  if (!open || !media) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
      <button
        className="absolute top-4 right-4 text-white text-2xl bg-black/60 rounded-full px-3 py-1 hover:bg-black/80 transition"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <div className="max-w-[90vw] max-h-[80vh] flex items-center justify-center">
        {media.type === "image" ? (
          <img
            src={media.url}
            alt="Zoomed"
            className="rounded-lg shadow-2xl max-h-[80vh] max-w-full object-contain animate-zoom-in"
          />
        ) : (
          <video
            src={media.url}
            controls
            autoPlay
            className="rounded-lg shadow-2xl max-h-[80vh] max-w-full object-contain animate-zoom-in"
          />
        )}
      </div>
    </div>
  );
}
