import { fs } from '@nofrills/fs'
import { FileMap } from './ConfFinder'

export function CacheName(name: string) {
  return fs.join(__dirname, `cache-${name}.json`)
}

export default async function(name: string, filemap: FileMap) {
  await fs.save(CacheName(name), filemap, true)
}
