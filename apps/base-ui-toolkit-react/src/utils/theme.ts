export const isPrimaryTheme = (theme: string) => theme === 'primary'

export const getBorderTheme = (theme: string) =>
    isPrimaryTheme(theme) ? 'border-primary' : 'border-success'

export const getShadowTheme = (theme: string) =>
    isPrimaryTheme(theme) ? 'shadow-primary' : 'shadow-success'

export const getBgTheme = (theme: string) =>
    isPrimaryTheme(theme) ? 'bg-primary' : 'bg-success'

export const getHoverBorder = (theme: string) =>
    isPrimaryTheme(theme)
        ? 'hover:border-primary'
        : 'hover:border-success'

export const getActiveBgWithTheme = (theme: string) =>
    isPrimaryTheme(theme) ? 'active:bg-primary' : 'active:bg-success'
