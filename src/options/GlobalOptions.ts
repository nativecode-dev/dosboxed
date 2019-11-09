import { fs } from '@nofrills/fs'
import { Argv, Options } from 'yargs'

export interface GlobalOptions {
  cwd: string
  games: string
}

export function Global(argv: Argv): Argv {
  return argv
    .option<string, Options>('cwd', {
      default: process.cwd(),
    })
    .option<string, Options>('games', {
      alias: 'games-dir',
      default: fs.join(String(process.env.HOME), 'Games'),
    })
}
