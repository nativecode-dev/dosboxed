import { Chain } from '@nofrills/patterns'
import { CommandModule, Arguments } from 'yargs'

import ConfFinder, { File, FileMap } from '../services/ConfFinder'
import { GlobalOptions } from '../options/GlobalOptions'

function ConvertFileMap(filemap: FileMap) {
  return Object.keys(filemap)
    .map(key => filemap[key])
    .reduce((results, current) => results.concat(current), [])
}

function FilterFileMap(app: string, conf: string, filemap: FileMap) {
  return filemap[app].filter(file => file.name.toLowerCase() === conf.toLowerCase())
}

export interface ListOptions extends GlobalOptions {
  app: string
  conf: string
  refresh: boolean
}

class ListCommand implements CommandModule<{}, ListOptions> {
  aliases = ['ls']
  command = 'list [app] [conf]'

  builder = {
    refresh: {
      alias: 'r',
      default: false,
    },
  }

  handler = async (args: Arguments<ListOptions>) => {
    const filemap = await ConfFinder(args.games)

    const chains = new Chain<File[], File[]>()
    chains.add(files => files)
    chains.add(files => (args.app ? filemap[args.app] : files))
    chains.add(files => (args.app && args.conf ? FilterFileMap(args.app, args.conf, filemap) : files))

    console.log(chains.execute(ConvertFileMap(filemap)))
  }
}

export default new ListCommand()
