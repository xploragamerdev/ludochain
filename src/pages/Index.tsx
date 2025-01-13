import { useState } from "react";
import { GameBoard } from "@/components/game/GameBoard";
import { DiceControl } from "@/components/game/DiceControl";
import { GameInfo } from "@/components/game/GameInfo";
import { LoginForm } from "@/components/game/LoginForm";
import { LobbyRoom } from "@/components/game/LobbyRoom";
import { useGameState } from "@/hooks/use-game-state";
import { Player } from "@/components/game/types";

const Index = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  const {
    currentPlayer,
    diceValue,
    players,
    safeSquares,
    initializePlayers,
    rollDice,
    handlePieceClick
  } = useGameState(username);

  const handleLogin = () => {
    if (username.trim()) {
      setIsLoggedIn(true);
    }
  };

  const handleGameStart = (lobbyPlayers: Player[]) => {
    setGameStarted(true);
    initializePlayers(lobbyPlayers);
  };

  if (!isLoggedIn) {
    return (
      <LoginForm 
        username={username}
        onUsernameChange={setUsername}
        onLogin={handleLogin}
      />
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <LobbyRoom 
          username={username}
          onGameStart={handleGameStart}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <GameInfo 
          username={username}
          currentPlayerName={players[currentPlayer]?.name}
        />
        
        <GameBoard
          players={players}
          currentPlayer={currentPlayer}
          onPieceClick={handlePieceClick}
          safeSquares={safeSquares}
        />

        <DiceControl
          diceValue={diceValue}
          onRollDice={rollDice}
          disabled={diceValue !== null}
        />
      </div>
    </div>
  );
};

export default Index;