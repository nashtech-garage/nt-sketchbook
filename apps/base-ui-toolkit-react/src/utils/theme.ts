export const isPrimaryTheme = (theme: string) => {
  return theme === 'primary'
}

export const getBorderTheme = (theme: string) => {
  return isPrimaryTheme(theme)
    ? 'border-crimson-default'
    : 'border-green-default'
}

export const getShadowTheme = (theme: string) => {
  return isPrimaryTheme(theme)
    ? 'shadow-crimson-default'
    : 'shadow-green-default'
}

export const getBgTheme = (theme: string) => {
  return isPrimaryTheme(theme)
    ? 'bg-crimson-default'
    : 'bg-green-default'
}

export const getHoverBorder = (theme: string) => {
  return isPrimaryTheme(theme)
    ? 'hover:border-crimson-default'
    : 'hover:border-green-default'
}

export const getActiveBgWithTheme = (theme: string) => {
  return isPrimaryTheme(theme)
    ? 'active:bg-crimson-default'
    : 'active:bg-green-default'
}
