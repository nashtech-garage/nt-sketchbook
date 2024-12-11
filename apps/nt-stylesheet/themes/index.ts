import './styles/styles.scss'

import { backgroundColor, boxShadow, colors } from './colors'
import { fontFamily, fontWeight } from './font'
import { gap, spacing } from './spacing'

import { ThemeConfig } from 'tailwindcss/types/config'
import { borderRadius } from './radius'

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

export default theme
