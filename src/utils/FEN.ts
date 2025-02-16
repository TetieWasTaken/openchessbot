import type { BoardType, Move, PieceType, SquareType } from "../types/Core";

/**
 * Converts a FEN string to a Board
 * @param fen A FEN string
 * @returns A Board
 */
export default function fenToBoard(fen: string): BoardType {
  const board: BoardType = [];
  const rows = fen.split(" ")[0].split("/");

  for (let i = rows.length - 1; i >= 0; i--) {
    const row = rows[i];
    const boardRow: SquareType[] = [];

    for (let j = 0; j < row.length; j++) {
      const char = row[j];

      // If the character is a number, add that many empty squares
      if (char.match(/[1-8]/)) {
        const num = parseInt(char);

        for (let k = 0; k < num; k++) {
          boardRow.push(null);
        }
      } else {
        // The character is a piece, add it to the board
        const piece: PieceType = {
          type: char.toUpperCase() as PieceType["type"],
          colour: char === char.toUpperCase() ? "white" : "black",
        };

        boardRow.push(piece);
      }
    }

    board.push(boardRow);
  }

  return board;
}

interface FENOptions {
  activeColour: string;
  castling: { king: boolean; queen: boolean } | {
    white: { king: boolean; queen: boolean };
    black: { king: boolean; queen: boolean };
  };
  enPassant: string;
  halfmove: number;
  fullmove: number;
}

/**
 * Converts a Board to a FEN string
 * @param board
 * @param options
 */
export function toFEN(
  board: BoardType,
  { activeColour, castling, enPassant, halfmove, fullmove }: FENOptions,
): string {
  return board
    .map((row) => {
      let fen = "";
      let emptyCount = 0;

      for (const square of row) {
        if (square === null) {
          emptyCount++;
        } else {
          if (emptyCount > 0) {
            fen += emptyCount;
            emptyCount = 0;
          }
          fen += pieceToFen(square);
        }
      }

      if (emptyCount > 0) fen += emptyCount;
      return fen;
    })
    .reverse()
    .join("/")
    .concat(
      ` ${activeColour} ${
        _toCastlingString(castling)
      } ${enPassant} ${halfmove} ${fullmove}`,
    );
}

function _toCastlingString(castling: FENOptions["castling"]): string {
  if ("white" in castling) {
    return `${castling.white.king ? "K" : ""}${
      castling.white.queen ? "Q" : ""
    }${castling.black.king ? "k" : ""}${castling.black.queen ? "q" : ""}`;
  }

  return `${castling.king ? "K" : ""}${castling.queen ? "Q" : ""}`;
}

/**
 * Converts a piece to its FEN representation
 * @param piece
 */
function pieceToFen(piece: PieceType): string {
  const map: { [key: string]: string } = {
    P: "P",
    N: "N",
    B: "B",
    R: "R",
    Q: "Q",
    K: "K",
  };

  return piece.colour === "white"
    ? map[piece.type]
    : map[piece.type].toLowerCase();
}

type FENParts = {
  board: string;
  activeColour: string;
  castling: string;
  enPassant: string;
  halfmove: string;
  fullmove: string;
};

/**
 * Parses a FEN string into its parts
 * @param fen
 */
export function parseFEN(fen: string): FENParts {
  const parts = fen.split(" ");
  return {
    board: parts[0],
    activeColour: parts[1],
    castling: parts[2],
    enPassant: parts[3],
    halfmove: parts[4],
    fullmove: parts[5],
  };
}
