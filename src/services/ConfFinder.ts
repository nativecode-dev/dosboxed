import { fs } from '@nofrills/fs'

import CacheConf, { CacheName } from './CacheConf'

export interface File {
  directory: string
  filename: string
  filepath: string
  name: string
}

export interface FileMap {
  [key: string]: File[]
}

export default async function(cwd: string, force: boolean = false) {
  const name = fs.basename(cwd)
  const cachepath = CacheName(name)

  if ((await fs.exists(cachepath)) && force === false) {
    return fs.json<FileMap>(cachepath)
  }

  const files = await fs.glob('**/*.conf', cwd)

  const filemaps = files.map(file => ({
    directory: fs.dirname(file),
    filename: fs.basename(file),
    filepath: file,
    name: fs.basename(file, false),
  }))

  const results = filemaps.reduce<FileMap>((result, current) => {
    const key = fs.basename(current.directory)
    const property = result[key]

    if (property) {
      result[key].push(current)
      return result
    }

    result[key] = [current]
    return result
  }, {})

  await CacheConf(name, results)

  return results
}
