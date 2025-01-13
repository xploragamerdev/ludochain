export type PlayerPiece = {
  id: number;
  position: number;
  isHome: boolean;
  isFinished: boolean;
};

export type Player = {
  id: number;
  name: string;
  pieces: PlayerPiece[];
  color: string;
};

export const BOARD_SIZE = 15;
export const SAFE_SQUARES = [1, 9, 14, 22, 27, 35, 40, 48];
export const HOME_POSITIONS = {
  0: [0, 1, 2, 3],
  1: [11, 12, 13, 14],
  2: [210, 211, 212, 213],
  3: [221, 222, 223, 224]
};

export const PLAYER_COLORS = {
  0: "bg-blue-500",
  1: "bg-red-500",
  2: "bg-yellow-500",
  3: "bg-green-500"
};