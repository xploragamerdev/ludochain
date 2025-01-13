interface GameInfoProps {
  username: string;
  currentPlayerName: string;
}

export const GameInfo = ({ username, currentPlayerName }: GameInfoProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 flex justify-between items-center">
      <span className="font-semibold">Jugador: {username}</span>
      <span className="text-indigo-600">Turno: {currentPlayerName}</span>
    </div>
  );
};