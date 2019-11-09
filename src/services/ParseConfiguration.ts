import { fs } from '@nofrills/fs'
import { encode, decode } from 'ini'

import { DosBoxConf } from './DosBoxConf'

export async function SaveConfiguration(filename: string, config: DosBoxConf) {
  const buffer = encode(config)
  await fs.writeFile(filename, buffer)
}

export default function<T extends any>(config: string): { [key: string]: T } {
  return decode(config)
}
