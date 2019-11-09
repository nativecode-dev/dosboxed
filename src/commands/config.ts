import { fs } from '@nofrills/fs'
import { CommandModule, Arguments } from 'yargs'
import yargsui from 'yargs-interactive'

import ParseConfiguration, { SaveConfiguration } from '../services/ParseConfiguration'
import { GlobalOptions } from '../options/GlobalOptions'

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

    const iniSection: yargsui.OptionData = {
      choices: Object.keys(config),
      default: undefined,
      describe: 'ini section',
      prompt: 'always',
      type: 'list',
    }

    const selectedSection = await yargsui().interactive({ interactive: { default: true }, iniSection })
    const section = config[selectedSection.iniSection]

    const iniValue: yargsui.OptionData = {
      choices: Object.keys(section),
      default: undefined,
      describe: 'section value',
      prompt: 'always',
      type: 'list',
    }

    const selectedValue = await yargsui().interactive({ interactive: { default: true }, iniValue })
    const value = section[selectedValue.iniValue]

    const editValue: yargsui.OptionData = {
      default: value,
      describe: 'value',
      prompt: 'always',
      type: 'input',
    }

    const changed = await yargsui().interactive({ interactive: { default: true }, editValue })

    section[selectedValue.iniValue] = changed.editValue
    await SaveConfiguration(args.config_file, config)
  }
}

export default new ConfigCommand()
