import { Player, BOARD_SIZE, HOME_POSITIONS } from "./types";

interface GameBoardProps {
  players: Player[];
  currentPlayer: number;
  onPieceClick: (position: number) => void;
  safeSquares: number[];
}

export const GameBoard = ({ 
  players, 
  currentPlayer, 
  onPieceClick,
  safeSquares 
}: GameBoardProps) => {
  const isHome = (index: number): boolean => {
    return Object.values(HOME_POSITIONS).flat().includes(index);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="grid grid-cols-15 grid-rows-15 gap-1 aspect-square">
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
          const hasPiece = players.flatMap(p => p.pieces).find(piece => piece.position === index);
          const isHomeSquare = isHome(index);
          const isSafe = safeSquares.includes(index);

          return (
            <div
              key={index}
              className={`
                relative rounded-sm aspect-square
                ${isHomeSquare ? 'bg-gray-200' : isSafe ? 'bg-yellow-100' : 'bg-gray-100'}
                ${hasPiece ? players[hasPiece.id].color : ''}
                transition-all duration-300
                ${hasPiece && players[currentPlayer].pieces.some(p => p.position === index) 
                  ? 'cursor-pointer hover:ring-2 ring-indigo-500' 
                  : ''}
              `}
              onClick={() => onPieceClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
};