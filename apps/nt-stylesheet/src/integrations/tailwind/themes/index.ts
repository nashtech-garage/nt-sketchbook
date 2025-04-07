import type { ThemeConfig } from 'tailwindcss/types/config'

import { backgroundColor, boxShadow, colors } from './colors'
import { fontFamily, fontWeight } from './font'
import { borderRadius } from './radius'
import { gap, spacing } from './spacing'

const theme: Partial<ThemeConfig & { extend: Partial<ThemeConfig> }> =
    {
        extend: {
            gap,
            spacing: {
                ...spacing,
                ...gap,
                gutter: '1.5rem',
            },
            borderRadius,
            colors,
            fontFamily,
            fontWeight,
            screens: {
                'viewport-min': '80rem',
                'viewport-max': '120rem',
            },
            backgroundColor,
            boxShadow,
            gridTemplateColumns: {
                DEFAULT: 'repeat(12, minmax(0, 1fr))',
            },
        },
    }

export { theme, colors }
