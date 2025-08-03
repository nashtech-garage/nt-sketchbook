import pkg from '../../package.json'
import { NtModal } from './nt-modal'
import { NtMultiSelect } from './nt-multi-select'
import { NtPopover } from './nt-popover'
import { NtTooltip } from './nt-tooltip'

NtModal.init()
NtTooltip.init()
NtPopover.init()
NtMultiSelect.init()

console.log(`Welcome to NT Stylesheet v${pkg.version} — Ready to go!`)
