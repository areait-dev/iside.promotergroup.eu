import * as migration_20261021_151246_initial from './20261021_151246_initial';

export const migrations = [
  {
    up: migration_20261021_151246_initial.up,
    down: migration_20261021_151246_initial.down,
    name: '20261021_151246_initial'
  },
];
