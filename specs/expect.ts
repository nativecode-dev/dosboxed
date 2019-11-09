import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { fs } from '@nofrills/fs'

const expect = chai.use(chaiAsPromised).expect

export const ARTIFACTS_PATH = fs.join(__dirname, 'artifacts')

export default expect
