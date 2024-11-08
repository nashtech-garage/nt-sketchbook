export const isPrimaryTheme = (theme: string) => {
    return theme === 'primary'
}

export const getBorderTheme = (theme: string) => {
    return isPrimaryTheme(theme) ? 'border-primary' : 'border-success'
}

export const getShadowTheme = (theme: string) => {
    return isPrimaryTheme(theme) ? 'shadow-primary' : 'shadow-success'
}

export const getBgTheme = (theme: string) => {
    return isPrimaryTheme(theme) ? 'bg-primary' : 'bg-success'
}

export const getHoverBorder = (theme: string) => {
    return isPrimaryTheme(theme)
        ? 'hover:border-primary'
        : 'hover:border-success'
}

export const getActiveBgWithTheme = (theme: string) => {
    return isPrimaryTheme(theme)
        ? 'active:bg-primary'
        : 'active:bg-success'
}
