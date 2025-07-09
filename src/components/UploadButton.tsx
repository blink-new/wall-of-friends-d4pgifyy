import React from "react";

interface UploadButtonProps {
  onUpload: (files: FileList) => void;
}

export default function UploadButton({ onUpload }: UploadButtonProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer text-xs px-2 py-1 bg-primary text-secondary rounded hover:bg-primary/80 transition">
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={e => {
          if (e.target.files) onUpload(e.target.files);
        }}
      />
      + Add Media
    </label>
  );
}
