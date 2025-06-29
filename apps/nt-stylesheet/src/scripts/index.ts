import pkg from '../../package.json'
import { NtCheckBox } from './nt-checkbox'
import { NtModal } from './nt-modal'

NtModal.init()
NtCheckBox.init()

console.log(`🚀 Welcome to MyLibrary v${pkg.version} — Ready to go!`)
