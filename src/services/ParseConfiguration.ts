import { fs } from '@nofrills/fs'
import { encode, decode } from 'ini'

import { DosboxConf } from './DosboxConf'

export async function SaveConfiguration(filename: string, config: DosboxConf) {
  const buffer = encode(config)
  await fs.writeFile(filename, buffer)
}

export default function<T extends any>(config: string): { [key: string]: T } {
  return decode(config)
}
