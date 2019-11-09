import yargs from 'yargs'

import { Global } from './options/GlobalOptions'
import ListCommand, { ListOptions } from './commands/list'
import ConfigCommand, { ConfigOptions } from './commands/config'

Global(yargs)
  .scriptName('dosboxed')
  .usage('$0 <command>')
  .pkgConf(__dirname)
  .command<ConfigOptions>(ConfigCommand)
  .command<ListOptions>(ListCommand)
  .showHelpOnFail(true)
  .parse()
