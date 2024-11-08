import { colors } from './colors'

module.exports = {
    theme: {
        extend: {
            gap: {
                lg: '18px',
                DEFAULT: '12px',
                sm: '8px',
                xs: '6px',
            },
            spacing: {
                xxxlg: '80px',
                xxlg: '64px',
                xlg: '48px',
                lg: '36px',
                DEFAULT: '24px',
                sm: '18px',
                xs: '12px',
                xxs: '8px',
                xxxs: '4px',
            },
            borderRadius: {
                xxxlg: '20px',
                xxlg: '12px',
                md: '8px',
                lg: '6px',
                DEFAULT: '4px',
                sm: '2px',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0%' },
                    '100%': { opacity: '100%' },
                },
                progress: {
                    '0%': { transform: ' translateX(0) scaleX(0)' },
                    '40%': { transform: 'translateX(0) scaleX(0.4)' },
                    '100%': {
                        transform: 'translateX(100%) scaleX(0.5)',
                    },
                },
            },
            transformOrigin: {
                'left-right': '0% 50%',
            },
            animation: {
                'fade-in': 'fade-in 0.3s ease-in-out',
                progress: 'progress 1s infinite linear',
            },
            colors,
            typography: {},
        },
    },
}
