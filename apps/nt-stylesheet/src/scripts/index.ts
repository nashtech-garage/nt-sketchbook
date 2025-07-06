import pkg from '../../package.json'
import { NtModal } from './nt-modal'
import { NtTooltip } from './nt-tooltip'

NtModal.init()
NtTooltip.init()

console.log(`Welcome to NT Stylesheet v${pkg.version} — Ready to go!`)
