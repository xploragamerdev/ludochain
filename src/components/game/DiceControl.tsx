interface DiceControlProps {
  diceValue: number | null;
  onRollDice: () => void;
  disabled: boolean;
}

export const DiceControl = ({ diceValue, onRollDice, disabled }: DiceControlProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex justify-center items-center space-x-4">
      <div className="text-2xl font-bold">
        {diceValue ? `🎲 ${diceValue}` : "🎲"}
      </div>
      <button
        onClick={onRollDice}
        className={`px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        Lanzar Dado
      </button>
    </div>
  );
};