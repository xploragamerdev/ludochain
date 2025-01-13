import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Player } from "./types";

interface LobbyRoomProps {
  onGameStart: (players: Player[]) => void;
  username: string;
}

export const LobbyRoom = ({ onGameStart, username }: LobbyRoomProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isSearching) {
      const interval = setInterval(() => {
        // Simulamos la llegada de nuevos jugadores
        if (players.length < 4) {
          const newPlayer: Player = {
            id: players.length,
            name: `Jugador ${players.length + 1}`,
            pieces: [],
            color: `bg-${['blue', 'red', 'yellow', 'green'][players.length]}-500`
          };
          
          setPlayers(prev => [...prev, newPlayer]);
          
          toast({
            title: "¡Nuevo jugador!",
            description: `${newPlayer.name} se ha unido al lobby`,
          });
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isSearching, players.length, toast]);

  useEffect(() => {
    if (players.length === 4) {
      setIsSearching(false);
      toast({
        title: "¡Partida completa!",
        description: "La partida comenzará en breve...",
      });
      setTimeout(() => onGameStart(players), 2000);
    }
  }, [players, onGameStart, toast]);

  const handleSearchGame = () => {
    setIsSearching(true);
    setPlayers([{
      id: 0,
      name: username,
      pieces: [],
      color: "bg-blue-500"
    }]);
    
    toast({
      title: "Buscando partida",
      description: "Esperando a más jugadores...",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Lobby</h2>
      
      <div className="space-y-4">
        {players.map((player, index) => (
          <div 
            key={player.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded"
          >
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${player.color}`} />
              <span>{player.name}</span>
            </div>
            <span className="text-sm text-gray-500">
              Jugador {index + 1}
            </span>
          </div>
        ))}
        
        {players.length < 4 && (
          <div className="animate-pulse flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="text-gray-400">Esperando jugador...</span>
          </div>
        )}
      </div>

      <div className="mt-6">
        {!isSearching ? (
          <Button 
            onClick={handleSearchGame}
            className="w-full"
          >
            Buscar Partida
          </Button>
        ) : (
          <Button 
            onClick={() => setIsSearching(false)}
            variant="destructive"
            className="w-full"
          >
            Cancelar Búsqueda
          </Button>
        )}
      </div>
    </div>
  );
};