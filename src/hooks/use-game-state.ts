import { useState, useCallback } from "react";
import { Player, PlayerPiece, HOME_POSITIONS, BOARD_SIZE } from "@/components/game/types";
import { toast } from "@/hooks/use-toast";

export const generateRandomSquares = (count: number, excludePositions: number[]): number[] => {
  const squares: number[] = [];
  const totalSquares = BOARD_SIZE * BOARD_SIZE;
  
  while (squares.length < count) {
    const position = Math.floor(Math.random() * totalSquares);
    if (!squares.includes(position) && !excludePositions.includes(position)) {
      squares.push(position);
    }
  }
  
  return squares;
};

export const useGameState = (username: string) => {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [safeSquares, setSafeSquares] = useState<number[]>([]);

  const initializePlayers = useCallback((lobbyPlayers: Player[]) => {
    const initialPlayers = lobbyPlayers.map((player, index) => ({
      ...player,
      pieces: Array.from({ length: 4 }, (_, pieceIndex) => ({
        id: pieceIndex,
        position: HOME_POSITIONS[index][pieceIndex],
        isHome: true,
        isFinished: false
      }))
    }));

    // Generar casillas seguras aleatorias, excluyendo las posiciones de inicio
    const excludePositions = Object.values(HOME_POSITIONS).flat();
    const randomSafeSquares = generateRandomSquares(8, excludePositions);
    
    setPlayers(initialPlayers);
    setSafeSquares(randomSafeSquares);
  }, []);

  const rollDice = useCallback(() => {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newValue);
    
    const currentPlayerPieces = players[currentPlayer].pieces;
    const hasPossibleMoves = currentPlayerPieces.some(piece => 
      canMovePiece(piece, newValue)
    );

    if (!hasPossibleMoves) {
      toast({
        title: "No hay movimientos posibles",
        description: "Pasando al siguiente jugador...",
      });
      if (newValue !== 6) {
        setCurrentPlayer((prev) => (prev + 1) % 4);
      }
    }
  }, [players, currentPlayer]);

  const canMovePiece = (piece: PlayerPiece, diceValue: number): boolean => {
    if (piece.isFinished) return false;
    if (piece.isHome && diceValue !== 6) return false;
    return true;
  };

  const calculateNewPosition = (currentPos: number, diceValue: number): number => {
    return (currentPos + diceValue) % (BOARD_SIZE * BOARD_SIZE);
  };

  const checkCaptures = useCallback((position: number, currentPlayerId: number, players: Player[]) => {
    players.forEach((player, playerId) => {
      if (playerId !== currentPlayerId) {
        player.pieces.forEach(piece => {
          if (piece.position === position && !piece.isHome && !safeSquares.includes(position)) {
            piece.position = HOME_POSITIONS[playerId][piece.id];
            piece.isHome = true;
            toast({
              title: "¡Captura!",
              description: `${players[currentPlayerId].name} ha capturado una ficha.`,
            });
          }
        });
      }
    });
  }, [safeSquares]);

  const checkVictory = (player: Player): boolean => {
    return player.pieces.every(piece => piece.isFinished);
  };

  const handlePieceClick = useCallback((position: number) => {
    if (!diceValue) return;

    const piece = players[currentPlayer].pieces.find(p => p.position === position);
    if (!piece || !canMovePiece(piece, diceValue)) return;

    const newPosition = calculateNewPosition(piece.position, diceValue);
    const updatedPlayers = [...players];
    const playerPiece = updatedPlayers[currentPlayer].pieces.find(p => p.id === piece.id);
    
    if (playerPiece) {
      playerPiece.position = newPosition;
      playerPiece.isHome = false;
      
      checkCaptures(newPosition, currentPlayer, updatedPlayers);
      
      if (checkVictory(updatedPlayers[currentPlayer])) {
        toast({
          title: "¡Victoria!",
          description: `${updatedPlayers[currentPlayer].name} ha ganado el juego.`,
        });
      }

      setPlayers(updatedPlayers);
      setDiceValue(null);
      if (diceValue !== 6) {
        setCurrentPlayer((prev) => (prev + 1) % 4);
      }
    }
  }, [players, currentPlayer, diceValue, checkCaptures]);

  return {
    currentPlayer,
    diceValue,
    players,
    safeSquares,
    initializePlayers,
    rollDice,
    handlePieceClick
  };
};
