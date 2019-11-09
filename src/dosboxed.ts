import yargs from 'yargs'

import { Global } from './options/GlobalOptions'
import ListCommand, { ListOptions } from './commands/list'
import ConfigCommand, { ConfigOptions } from './commands/config'
import SelectCommand, { SelectOptions } from './commands/select'

Global(yargs)
  .scriptName('dosboxed')
  .usage('$0 <command>')
  .pkgConf(__dirname)
  .command<ConfigOptions>(ConfigCommand)
  .command<ListOptions>(ListCommand)
  .command<SelectOptions>(SelectCommand)
  .showHelpOnFail(true)
  .parse()
