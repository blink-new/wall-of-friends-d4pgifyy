import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const games = [
  { name: 'Minecraft Java', images: ['/placeholder.svg', '/placeholder.svg'] },
  { name: 'Minecraft Bedrock', images: ['/placeholder.svg', '/placeholder.svg'] },
  { name: 'CS2', images: ['/placeholder.svg', '/placeholder.svg'] },
  { name: 'Roblox', images: ['/placeholder.svg', '/placeholder.svg'] },
  { name: 'Steam Game', images: ['/placeholder.svg', '/placeholder.svg'] },
];

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary">Wall of Gaming Moments (WGM)</h1>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {games.map((game) => (
          <Card key={game.name} className="bg-secondary border-primary">
            <CardHeader>
              <CardTitle className="text-primary">{game.name}</CardTitle>
            </CardHeader>
            <CardContent />
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-secondary">
                    View Photos
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-secondary text-foreground">
                  <DialogHeader>
                    <DialogTitle className="text-primary">Photos with {game.name}</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {game.images.map((image, index) => (
                      <img key={index} src={image} alt={`${game.name} ${index + 1}`} className="rounded-lg" />
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}

export default App;