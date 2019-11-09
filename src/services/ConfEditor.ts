import yargsui from 'yargs-interactive'

import { DosBoxConf } from './DosBoxConf'
import { File, FileMap } from './ConfFinder'

export async function SelectFolder(filemap: FileMap): Promise<string> {
  const options: yargsui.OptionData = {
    choices: Object.keys(filemap),
    describe: '',
    prompt: 'always',
    type: 'list',
  }

  const selected = await yargsui().interactive({ interactive: { default: true }, folder: options })
  return selected.folder
}

export async function SelectFile(filemap: FileMap, folder: string): Promise<File | null> {
  const files = filemap[folder]
  const options: yargsui.OptionData = {
    choices: files.map(file => file.name),
    describe: '',
    prompt: 'always',
    type: 'list',
  }

  const selected = await yargsui().interactive({ interactive: { default: true }, name: options })
  return files.reduce<File | null>((result, file) => {
    if (file.name === selected.name) {
      return file
    }
    return result
  }, null)
}

export async function SelectSection(config: DosBoxConf): Promise<string> {
  const options: yargsui.OptionData = {
    choices: Object.keys(config),
    describe: 'ini section',
    prompt: 'always',
    type: 'list',
  }

  const selected = await yargsui().interactive({ interactive: { default: true }, section: options })
  return selected.section
}

export async function SelectProperty(config: DosBoxConf, section: string): Promise<string> {
  const options: yargsui.OptionData = {
    choices: Object.keys(config[section]),
    describe: 'section value',
    prompt: 'always',
    type: 'list',
  }

  const selected = await yargsui().interactive({ interactive: { default: true }, property: options })
  return selected.property
}

export async function EditValue(config: DosBoxConf, section: string, property: string): Promise<DosBoxConf> {
  const options: yargsui.OptionData = {
    default: config[section][property],
    describe: 'value',
    prompt: 'always',
    type: 'input',
  }

  const selected = await yargsui().interactive({ interactive: { default: true }, value: options })
  config[section][property] = selected.value

  return config
}
