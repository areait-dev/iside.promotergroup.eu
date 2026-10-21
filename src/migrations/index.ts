import * as migration_20261021_150057_initial from './20261021_150057_initial';

export const migrations = [
  {
    up: migration_20261021_150057_initial.up,
    down: migration_20261021_150057_initial.down,
    name: '20261021_150057_initial'
  },
];
