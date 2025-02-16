import { Board } from "../../src/core/Board";

describe("Chess Board", () => {
  test("Rook at [0, 0]", () => {
    const board = new Board();
    expect(board.getPiece([0, 0])?.type).toBe("R");
  });

  test("Empty square", () => {
    const board = new Board();
    expect(board.getPiece([4, 4])).toBeNull();
  });

  test("White piece", () => {
    const board = new Board();
    expect(board.getPiece([0, 0])?.colour).toBe("white");
  });

  test("Black piece", () => {
    const board = new Board();
    expect(board.getPiece([7, 0])?.colour).toBe("black");
  });

  test("Custom FEN", () => {
    const board = new Board("8/8/8/8/3k4/8/8/8");
    expect(board.getPiece([3, 3])?.type).toBe("K");
  });
});
