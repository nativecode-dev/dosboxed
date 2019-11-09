import yargs from 'yargs'

import ConfigCommand, { ConfigOptions } from './commands/config'

yargs
  .scriptName('dosboxed')
  .pkgConf(process.cwd())
  .command<ConfigOptions>(ConfigCommand)
  .showHelpOnFail(true)
  .parse()
