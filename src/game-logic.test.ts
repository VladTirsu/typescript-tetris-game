
import { describe, it, expect } from 'vitest';
import { rotate, collides } from './game-logic';

const emptyBoard = () =>
  Array.from({ length: 20 }, () =>
    Array<string | null>(10).fill(null)
  );

describe('Piece rotation', () => {
  it('rotates an I piece vertically', () => {
    const piece = [[1, 1, 1, 1]];

    expect(rotate(piece)).toEqual([
      [1], [1], [1], [1]
    ]);
  });

  it('keeps the O piece unchanged', () => {
    const piece = [
      [1, 1],
      [1, 1]
    ];

    expect(rotate(piece)).toEqual(piece);
  });

  it('returns original shape after four rotations', () => {
    const piece = [
      [0, 1, 0],
      [1, 1, 1]
    ];

    let rotated = piece;

    for (let i = 0; i < 4; i++) {
      rotated = rotate(rotated);
    }

    expect(rotated).toEqual(piece);
  });
});

describe('Piece collisions', () => {
  it('allows a piece inside the board', () => {
    const piece = {
      x: 4, y: 0,
      matrix: [[1, 1]]
    };

    expect(
      collides(piece, emptyBoard(), 10, 20)
    ).toBe(false);
  });

  it('detects collision with left wall', () => {
    const piece = {
      x: 0, y: 0,
      matrix: [[1, 1]]
    };

    expect(
      collides(piece, emptyBoard(), 10, 20, -1)
    ).toBe(true);
  });

  it('detects collision with right wall', () => {
    const piece = {
      x: 9, y: 0,
      matrix: [[1, 1]]
    };

    expect(
      collides(piece, emptyBoard(), 10, 20)
    ).toBe(true);
  });

  it('detects collision with the floor', () => {
    const piece = {
      x: 4, y: 19,
      matrix: [[1], [1]]
    };

    expect(
      collides(piece, emptyBoard(), 10, 20)
    ).toBe(true);
  });

  it('detects occupied cells', () => {
    const board = emptyBoard();
    board[5][4] = 'T';

    const piece = {
      x: 4, y: 5,
      matrix: [[1]]
    };

    expect(
      collides(piece, board, 10, 20)
    ).toBe(true);
  });
});
