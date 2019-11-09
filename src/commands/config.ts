import yargsui from 'yargs-interactive'

import { fs } from '@nofrills/fs'
import { CommandModule, Arguments } from 'yargs'

import ParseConfiguration, { SaveConfiguration } from '../services/ParseConfiguration'
import { GlobalOptions } from '../options/GlobalOptions'
import { SelectSection, SelectProperty, EditValue } from '../services/ConfEditor'

export interface ConfigOptions extends GlobalOptions {
  config_file: string
}

class ConfigCommand implements CommandModule<{}, ConfigOptions> {
  aliases = ['cfg']
  command = 'config <config_file>'

  handler = async (args: Arguments<ConfigOptions>) => {
    if ((await fs.exists(args.config_file)) === false) {
      throw new Error(`could not find config file: ${args.config_file}`)
    }

    const buffer = await fs.readFile(args.config_file)
    const config = ParseConfiguration(buffer.toString())

    const section = await SelectSection(config)
    const property = await SelectProperty(config, section)
    const updated = await EditValue(config, section, property)
    await SaveConfiguration(args.config_file, updated)
  }
}

export default new ConfigCommand()
