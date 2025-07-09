import React from "react";

interface MediaModalProps {
  open: boolean;
  onClose: () => void;
  media: { url: string; type: "image" | "video" } | null;
}

export default function MediaModal({ open, onClose, media }: MediaModalProps) {
  if (!open || !media) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fade-in">
      <button
        className="absolute top-6 right-8 text-white text-3xl bg-black/60 rounded-full px-4 py-2 hover:bg-black/80 transition shadow-lg"
        onClick={onClose}
        aria-label="Close preview"
        style={{ zIndex: 101 }}
      >
        ×
      </button>
      <div className="max-w-[96vw] max-h-[90vh] flex items-center justify-center animate-zoom-in rounded-xl overflow-hidden shadow-2xl bg-black/80">
        {media.type === "image" ? (
          <img
            src={media.url}
            alt="Zoomed"
            className="rounded-xl max-h-[80vh] max-w-[90vw] object-contain"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
          />
        ) : (
          <video
            src={media.url}
            controls
            autoPlay
            className="rounded-xl max-h-[80vh] max-w-[90vw] object-contain"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
          />
        )}
      </div>
      {/* Click outside to close */}
      <div
        className="fixed inset-0 z-[99]"
        onClick={onClose}
        aria-label="Close preview background"
      />
    </div>
  );
}
