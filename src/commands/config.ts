import { CommandModule, Arguments } from 'yargs'

import { GlobalOptions } from '../options/GlobalOptions'

export interface ConfigOptions extends GlobalOptions {}

class ConfigCommand implements CommandModule<{}, ConfigOptions> {
  command = 'config'

  handler = (args: Arguments) => {
    console.log(args)
  }
}

export default new ConfigCommand()
