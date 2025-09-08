import pkg from '../../package.json'
import { NtCollapse } from './nt-collapse'
import { NtCombobox } from './nt-combobox'
import { NtDropdown } from './nt-dropdown'
import { NtModal } from './nt-modal'
import { NtMultiSelect } from './nt-multi-select'
import { NtPopover } from './nt-popover'
import { NtTooltip } from './nt-tooltip'

NtModal.init()
NtTooltip.init()
NtPopover.init()
NtCombobox.init()
NtMultiSelect.init()
NtCollapse.init()
NtDropdown.init()

console.log(`Welcome to NT Stylesheet v${pkg.version} — Ready to go!`)
