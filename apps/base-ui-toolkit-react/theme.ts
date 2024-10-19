module.exports = {
  theme: {
    fontFamily: {
      primary: [
        'LightItalic, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      ],
    },
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
        progress: {
          '0%': { transform: ' translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
        },
      },
      transformOrigin: {
        'left-right': '0% 50%',
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        progress: 'progress 1s infinite linear',
      },
      colors: {
        crimson: {
          default: 'rgb(215, 22, 25)',
          hover: '#ef4444',
        },
        default: {
          default: 'rgb(157, 157, 156)',
          hover: '#64748b',
          active: '#118cfd',
        },
        orangeRed: {
          default: 'rgb(220, 38, 38)',
          hover: 'rgb(127, 29, 29)',
        },
        green: {
          default: 'rgb(22, 163, 74)',
          hover: 'rgb(20, 83, 45)',
        },
        gold: {
          default: 'rgb(217, 119, 6)',
          hover: 'rgb(113, 63, 18)',
        },
      },
    },
  },
}
