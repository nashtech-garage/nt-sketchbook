import { colors, backgroundColor, boxShadow } from './colors'
import { fontFamily, fontWeight } from './font'
import { spacing, gap } from './spacing'
import { borderRadius } from './radius'

import { ThemeConfig } from 'tailwindcss/types/config'

export const theme: Partial<
    ThemeConfig & { extend: Partial<ThemeConfig> }
> = {
    extend: {
        gap,
        spacing,
        borderRadius,
        colors,
        fontFamily,
        fontWeight,
        screens: {
            'viewport-min': '80rem',
            'viewport-max': '120rem',
            'page-container-max': '80rem',
        },
        backgroundColor,
        boxShadow,
        gridTemplateColumns: {
            DEFAULT: 'repeat(12, minmax(0, 1fr))',
        },
    },
}
