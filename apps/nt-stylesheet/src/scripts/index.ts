import pkg from '../../package.json'
import { NtCombobox } from './nt-combobox'
import { NtModal } from './nt-modal'
import { NtPopover } from './nt-popover'
import { NtTooltip } from './nt-tooltip'

NtModal.init()
NtTooltip.init()
NtPopover.init()
NtCombobox.init()
console.log(`Welcome to NT Stylesheet v${pkg.version} — Ready to go!`)
