/** @format */

import { Board } from '../../../src/core/board';
import { getMoves } from '../../../src/core/moveGenerator';

describe('Move Generator | Rook', () => {
	test('White rook at [1, 1]', () => {
		const board = new Board('8/8/8/8/8/8/1R6/8 w - - 0 1');
		const moves = getMoves(board, [1, 1]);

		// Ignore the order of the moves, as it doesn't matter
		const expectedMoves = [
			[0, 1],
			[2, 1],
			[3, 1],
			[4, 1],
			[5, 1],
			[6, 1],
			[7, 1],
			[1, 0],
			[1, 2],
			[1, 3],
			[1, 4],
			[1, 5],
			[1, 6],
			[1, 7],
		];

		for (const move of expectedMoves) {
			expect(moves.map((move) => move.to)).toContainEqual(move);
		}

		expect(moves.length).toBe(expectedMoves.length);
	});

	test('Rook with capture', () => {
		const board = new Board('8/1r6/8/8/8/8/1R6/8 w - - 0 1');
		const moves = getMoves(board, [1, 1]);

		expect(moves.map((move) => move.to)).toContainEqual([6, 1]);
		expect(moves.map((move) => move.to)).not.toContainEqual([7, 1]);
	});

	test('Rook with blocking piece', () => {
		const board = new Board('8/1R6/8/8/8/8/1R6/8 w - - 0 1');
		const moves = getMoves(board, [1, 1]);

		expect(moves.map((move) => move.to)).not.toContainEqual([6, 1]);
		expect(moves.map((move) => move.to)).not.toContainEqual([7, 1]);
	});
});
