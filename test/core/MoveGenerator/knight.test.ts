/** @format */

import { Board } from '../../../src/core/board';
import { getMoves } from '../../../src/core/moveGenerator';

describe('Move Generator | Knight', () => {
	test('White knight at [1, 1]', () => {
		const board = new Board('8/8/8/8/8/8/1N6/8 w - - 0 1');
		const moves = getMoves(board, [1, 1]);

		expect(moves.map((move) => move.to)).toEqual([
			[0, 3],
			[2, 3],
			[3, 0],
			[3, 2],
		]);
	});

	test('Knight with capture', () => {
		const board = new Board('8/8/8/8/n7/8/1N6/8 w - - 0 1');
		const moves = getMoves(board, [1, 1]);

		expect(moves.map((move) => move.to)).toEqual([
			[0, 3],
			[2, 3],
			[3, 0],
			[3, 2],
		]);
	});

	test('Knight with blocking piece', () => {
		const board = new Board('8/8/8/8/P7/8/1N6/8 w - - 0 1');
		const moves = getMoves(board, [1, 1]);

		expect(moves.map((move) => move.to)).toEqual([
			[0, 3],
			[2, 3],
			[3, 2],
		]);
	});
});
