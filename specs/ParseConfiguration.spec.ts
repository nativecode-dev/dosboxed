import 'mocha'

import { fs } from '@nofrills/fs'

import expect, { ARTIFACTS_PATH } from './expect'
import ParseConfiguration from '../src/services/ParseConfiguration'

describe('when parsing configuration files', () => {
  it('should parse default dosbox.conf', async () => {
    const filename = fs.join(ARTIFACTS_PATH, 'dosbox.conf')
    const config = await fs.readFile(filename)
    const parsed = ParseConfiguration(config.toString())
    expect(parsed.dosbox.language).to.equal('')
    expect(parsed.sdl.fullscreen).to.be.false
  })
})
