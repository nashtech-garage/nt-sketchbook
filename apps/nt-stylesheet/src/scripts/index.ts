import pkg from '../../package.json'
import { NtModal } from './nt-modal'
import { NtPopover } from './nt-popover'
import { NtTooltip } from './nt-tooltip'
import { NtSelect } from './nt-select'

NtModal.init()
NtTooltip.init()
NtPopover.init()
NtSelect.init()

console.log(`Welcome to NT Stylesheet v${pkg.version} — Ready to go!`)
