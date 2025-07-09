import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import UploadButton from "@/components/UploadButton";
import MediaModal from "@/components/MediaModal";
import FullScreenMoments from "@/components/FullScreenMoments";

const LOCAL_STORAGE_KEY = 'wall_of_friends_games_v1';

function loadGamesFromStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) return initialGames;
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) return parsed;
    return initialGames;
  } catch {
    return initialGames;
  }
}

const initialGames = [
  { name: 'Minecraft Java', media: [] },
  { name: 'Minecraft Bedrock', media: [] },
  { name: 'CS2', media: [] },
  { name: 'Roblox', media: [] },
  { name: 'Steam Games', media: [] },
  { name: 'Brawl Stars', media: [] },
];

export default function App() {
  const [games, setGames] = useState(loadGamesFromStorage());
  const [modalMedia, setModalMedia] = useState<{ url: string; type: "image" | "video" } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [selectedGameIndex, setSelectedGameIndex] = useState<number | null>(null);

  function saveGamesToStorage(gamesToSave: typeof initialGames) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gamesToSave));
  }

  function handleUpload(gameIdx: number, files: FileList) {
    const newMedia = Array.from(files).map(file => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith("video") ? "video" : "image";
      return { url, type };
    });
    setGames(games => {
      const updated = games.map((g, i) => i === gameIdx ? { ...g, media: [...g.media, ...newMedia] } : g);
      saveGamesToStorage(updated);
      return updated;
    });
  }

  function handleFullScreenUpload(files: FileList) {
    if (selectedGameIndex !== null) {
      handleUpload(selectedGameIndex, files);
    }
  }

  function openMedia(media: { url: string; type: "image" | "video" }) {
    setModalMedia(media);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setTimeout(() => setModalMedia(null), 300);
  }

  function openFullScreenMoments(gameIndex: number) {
    setSelectedGameIndex(gameIndex);
    setFullScreenOpen(true);
  }

  function closeFullScreenMoments() {
    setFullScreenOpen(false);
    setSelectedGameIndex(null);
  }

  function handleDeleteMedia(gameIdx: number, mediaToDelete: { url: string; type: "image" | "video" }) {
    setGames(games => {
      const updated = games.map((g, i) =>
        i === gameIdx ? { ...g, media: g.media.filter(m => m.url !== mediaToDelete.url) } : g
      );
      saveGamesToStorage(updated);
      return updated;
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary">Wall of Gaming Moments (WGM)</h1>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game, idx) => (
          <Collapsible key={game.name} asChild>
            <Card className="bg-secondary border-primary">
              <CardHeader className="flex flex-row items-center justify-between p-4">
                <CardTitle className="text-primary text-base font-semibold truncate max-w-[150px]">{game.name}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary border-primary hover:bg-primary hover:text-secondary"
                    onClick={() => openFullScreenMoments(idx)}
                  >
                    Moments
                  </Button>
                </div>
              </CardHeader>
              <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-primary">Gallery</h4>
                    <UploadButton onUpload={files => handleUpload(idx, files)} />
                  </div>
                  <div className="flex flex-row gap-2 overflow-x-auto pb-2">
                    {game.media.length === 0 && (
                      <span className="text-xs text-muted-foreground italic">No moments yet</span>
                    )}
                    {game.media.map((media, i) => (
                      <button
                        key={i}
                        className="focus:outline-none flex-shrink-0"
                        onClick={() => openMedia(media)}
                        tabIndex={0}
                        aria-label="View media"
                      >
                        {media.type === "image" ? (
                          <img
                            src={media.url}
                            alt="Moment"
                            className="h-10 w-10 object-cover rounded shadow border border-primary hover:scale-105 transition"
                          />
                        ) : (
                          <video
                            src={media.url}
                            className="h-10 w-10 object-cover rounded shadow border border-primary hover:scale-105 transition"
                            tabIndex={-1}
                            muted
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </main>
      
      <MediaModal open={modalOpen} onClose={closeModal} media={modalMedia} />
      
      <FullScreenMoments
        isOpen={fullScreenOpen}
        onClose={closeFullScreenMoments}
        gameName={selectedGameIndex !== null ? games[selectedGameIndex].name : ""}
        media={selectedGameIndex !== null ? games[selectedGameIndex].media : []}
        onUpload={handleFullScreenUpload}
        onMediaClick={openMedia}
        onDelete={(mediaToDelete) => selectedGameIndex !== null && handleDeleteMedia(selectedGameIndex, mediaToDelete)}
      />
    </div>
  );
}