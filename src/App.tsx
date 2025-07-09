import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const games = [
  { name: 'Minecraft Java', images: ['/placeholder.svg', '/placeholder.svg'] },
  { name: 'Minecraft Bedrock', images: ['/placeholder.svg', '/placeholder.svg'] },
  { name: 'CS2', images: ['/placeholder.svg', '/placeholder.svg'] },
  { name: 'Roblox', images: ['/placeholder.svg', '/placeholder.svg'] },
  { name: 'Steam Games', images: ['/placeholder.svg', '/placeholder.svg'] },
];

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary">Wall of Gaming Moments (WGM)</h1>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {games.map((game) => (
          <Card key={game.name} className="bg-secondary border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6">
              <CardTitle className="text-primary text-xl">{game.name}</CardTitle>
              <Link to={`/moments/${game.name}`}>
                <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-secondary">
                  Moments
                </Button>
              </Link>
            </CardHeader>
            <CardContent />
            <CardFooter>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}

export default App;