import { Arguments, CommandModule } from 'yargs'

import ConfFinder from '../services/ConfFinder'
import { GlobalOptions } from '../options/GlobalOptions'
import { SelectFolder, SelectFile, SelectProperty, SelectSection, EditValue } from '../services/ConfEditor'
import ParseConfiguration, { SaveConfiguration } from '../services/ParseConfiguration'
import { fs } from '@nofrills/fs'

export interface SelectOptions extends GlobalOptions {}

export class SelectCommand implements CommandModule<{}, SelectOptions> {
  command = 'select'

  handler = async (args: Arguments<SelectOptions>) => {
    const filemap = await ConfFinder(args.games)
    const folder = await SelectFolder(filemap)
    const file = await SelectFile(filemap, folder)

    if (file) {
      const buffer = await fs.readFile(file.filepath)
      const config = ParseConfiguration(buffer.toString())

      while (true) {
        const section = await SelectSection(config)
        const property = await SelectProperty(config, section)
        const updated = await EditValue(config, section, property)
        await SaveConfiguration(file.filepath, updated)
      }
    }
  }
}

export default new SelectCommand()
