// Deterministic-ish word search grid builder. Places each word along a
// randomly chosen direction, falling back gracefully if it cannot fit,
// then fills remaining cells with random filler letters.

const DIRECTIONS = {
  horizontal: [[0, 1], [0, -1]],
  vertical: [[1, 0], [-1, 0]],
  diagonal: [[1, 1], [1, -1], [-1, 1], [-1, -1]],
};

function directionsFor(allowDiagonal) {
  return allowDiagonal
    ? [...DIRECTIONS.horizontal, ...DIRECTIONS.vertical, ...DIRECTIONS.diagonal]
    : [...DIRECTIONS.horizontal, ...DIRECTIONS.vertical];
}

function randInt(n) {
  return Math.floor(Math.random() * n);
}

export function buildWordSearch(words, { size = 10, allowDiagonal = true } = {}) {
  const grid = Array.from({ length: size }, () => Array(size).fill(null));
  const placements = [];
  const dirs = directionsFor(allowDiagonal);
  const sorted = [...words].sort((a, b) => b.word.length - a.word.length);

  for (const entry of sorted) {
    const letters = entry.word.split("");
    let placed = false;
    for (let attempt = 0; attempt < 200 && !placed; attempt++) {
      const [dr, dc] = dirs[randInt(dirs.length)];
      const row = randInt(size);
      const col = randInt(size);
      const endRow = row + dr * (letters.length - 1);
      const endCol = col + dc * (letters.length - 1);
      if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) continue;

      let fits = true;
      for (let i = 0; i < letters.length; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        const existing = grid[r][c];
        if (existing && existing !== letters[i]) {
          fits = false;
          break;
        }
      }
      if (!fits) continue;

      for (let i = 0; i < letters.length; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        grid[r][c] = letters[i];
      }
      placements.push({ word: entry.word, meta: entry.meta, row, col, dr, dc });
      placed = true;
    }

    if (!placed) {
      placements.push({ word: entry.word, meta: entry.meta, row: null, col: null, dr: 0, dc: 0, failed: true });
    }
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) grid[r][c] = alphabet[randInt(alphabet.length)];
    }
  }

  return { grid, placements, size };
}
