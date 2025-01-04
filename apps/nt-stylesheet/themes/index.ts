import { ThemeConfig } from 'tailwindcss/types/config'

import { backgroundColor, boxShadow, colors } from './colors'
import { fontFamily, fontWeight } from './font'
import { borderRadius } from './radius'
import { gap, spacing } from './spacing'

const theme = {
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
} as Partial<ThemeConfig & { extend: Partial<ThemeConfig> }>

export default theme
