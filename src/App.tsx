import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UploadButton from "@/components/UploadButton";
import MediaModal from "@/components/MediaModal";

const initialGames = [
  { name: 'Minecraft Java', media: [] },
  { name: 'Minecraft Bedrock', media: [] },
  { name: 'CS2', media: [] },
  { name: 'Roblox', media: [] },
  { name: 'Steam Games', media: [] },
];

export default function App() {
  const [games, setGames] = useState(initialGames);
  const [modalMedia, setModalMedia] = useState<{ url: string; type: "image" | "video" } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleUpload(gameIdx: number, files: FileList) {
    const newMedia = Array.from(files).map(file => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith("video") ? "video" : "image";
      return { url, type };
    });
    setGames(games => games.map((g, i) => i === gameIdx ? { ...g, media: [...g.media, ...newMedia] } : g));
  }

  function openMedia(media: { url: string; type: "image" | "video" }) {
    setModalMedia(media);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setTimeout(() => setModalMedia(null), 300);
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary">Wall of Gaming Moments (WGM)</h1>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {games.map((game, idx) => (
          <Card key={game.name} className="bg-secondary border-primary h-28 flex flex-col justify-center">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
              <CardTitle className="text-primary text-base font-semibold truncate max-w-[120px]">{game.name}</CardTitle>
              <UploadButton onUpload={files => handleUpload(idx, files)} />
            </CardHeader>
            <CardContent className="flex flex-row gap-2 px-4 pb-2 overflow-x-auto">
              {game.media.length === 0 && (
                <span className="text-xs text-muted-foreground italic">No moments yet</span>
              )}
              {game.media.map((media, i) => (
                <button
                  key={i}
                  className="focus:outline-none"
                  onClick={() => openMedia(media)}
                  tabIndex={0}
                  aria-label="View media"
                >
                  {media.type === "image" ? (
                    <img
                      src={media.url}
                      alt="Moment"
                      className="h-12 w-12 object-cover rounded shadow border border-primary hover:scale-105 transition"
                    />
                  ) : (
                    <video
                      src={media.url}
                      className="h-12 w-12 object-cover rounded shadow border border-primary hover:scale-105 transition"
                      tabIndex={-1}
                      muted
                    />
                  )}
                </button>
              ))}
            </CardContent>
            <CardFooter className="h-0 p-0 m-0" />
          </Card>
        ))}
      </main>
      <MediaModal open={modalOpen} onClose={closeModal} media={modalMedia} />
    </div>
  );
}
