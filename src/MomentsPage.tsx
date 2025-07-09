import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const gamesData = [
  { name: 'Minecraft Java', images: ['https://images.unsplash.com/photo-1629904853893-c2c8981a1d8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1629904853893-c2c8981a1d8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'] },
  { name: 'Minecraft Bedrock', images: ['https://images.unsplash.com/photo-1629904853893-c2c8981a1d8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1629904853893-c2c8981a1d8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'] },
  { name: 'CS2', images: ['https://images.unsplash.com/photo-1629904853893-c2c8981a1d8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1629904853893-c2c8981a1d8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'] },
  { name: 'Roblox', images: ['https://images.unsplash.com/photo-1629904853893-c2c8981a1d8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1629904853893-c2c8981a1d8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'] },
  { name: 'Steam Games', images: ['https://images.unsplash.com/photo-1629904853893-c2c8981a1d8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1629904853893-c2c8981a1d8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'] },
];

function MomentsPage() {
  const { gameName } = useParams();
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setShowPage(true);
  }, []);

  const game = gamesData.find(g => g.name === gameName);

  if (!game) {
    return <div className="min-h-screen bg-background text-foreground p-8 text-center text-2xl">Game not found!</div>;
  }

  return (
    <div className={`min-h-screen bg-background text-foreground p-8 transition-all duration-1000 ${showPage ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary">Moments from {game.name}</h1>
        <button onClick={() => navigate(-1)} className="mt-4 text-primary hover:underline">Back to Wall</button>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {game.images.map((image, index) => (
          <div key={index} className="bg-secondary p-4 rounded-lg shadow-lg">
            <img src={image} alt={`${game.name} Moment ${index + 1}`} className="rounded-lg w-full h-auto" />
          </div>
        ))}
      </main>
    </div>
  );
}

export default MomentsPage;
