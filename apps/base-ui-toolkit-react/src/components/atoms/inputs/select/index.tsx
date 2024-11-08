import { useMemo } from 'react'
import ReactSelect, { Props } from 'react-select'

import { Theme, Value } from '@/types'
import { combineClasses } from '@/utils/tailwind'
import * as ThemeUtils from '@/utils/theme'

import EmotionProvider from './emotion-provider'
import style from './select.module.scss'

export type Option = {
    value: Value
    label: string
    isDisabled?: boolean
}

export type SelectProps = {
    options?: Option[]
    className?: string
    isMultipleSelect?: boolean
    defaultValue?: Option[]
    onChange?: (option: any) => void // eslint-disable-line
    isDisabledSelect?: boolean
    themeProvide?: Theme
} & Props

export const Select = (props: SelectProps) => {
    const {
        className = '',
        options = [],
        isMultipleSelect = false,
        defaultValue,
        onChange,
        isDisabledSelect = false,
        themeProvide = 'default',
    } = props

    const borderTheme = ThemeUtils.getBorderTheme(themeProvide)
    const shadowTheme = ThemeUtils.getShadowTheme(themeProvide)
    const hoverBorderPrimary = ThemeUtils.getHoverBorder(themeProvide)

    const scrollBarWithTheme = useMemo(() => {
        if (ThemeUtils.isPrimaryTheme(themeProvide)) {
            return style['select-theme__scroll']
        }
        return style.select__scroll
    }, [themeProvide])

    const optionWithTheme = useMemo(() => {
        if (ThemeUtils.isPrimaryTheme(themeProvide)) {
            return style['select-theme__option']
        }
        return ''
    }, [])

    const activeWithTheme = useMemo(() => {
        if (ThemeUtils.isPrimaryTheme(themeProvide)) {
            return style['select-theme--active']
        }
        return 'bg-success '
    }, [])

    const hoverWithTheme = useMemo(() => {
        if (ThemeUtils.isPrimaryTheme(themeProvide)) {
            return style['select-theme--hover']
        }
        return 'hover:bg-success hover:text-white'
    }, [])

    return (
        <EmotionProvider>
            <ReactSelect
                {...props}
                classNames={{
                    control: ({ isDisabled, isFocused }) =>
                        combineClasses(
                            !isDisabled && isFocused && borderTheme,
                            isFocused &&
                                `shadow-[0_0_0_0px] ${shadowTheme}`,
                            isFocused && `${hoverBorderPrimary}`,
                            'rounded-md',
                            hoverBorderPrimary,
                            className,
                        ),
                    option: ({ isFocused, isSelected }) =>
                        combineClasses(
                            isSelected && `${activeWithTheme}`,
                            !isSelected &&
                                isFocused &&
                                `${hoverWithTheme}`,
                            optionWithTheme,
                        ),
                    menuList: () =>
                        combineClasses(scrollBarWithTheme),
                }}
                isMulti={isMultipleSelect}
                defaultValue={defaultValue}
                options={options}
                onChange={onChange}
                isDisabled={isDisabledSelect}
            />
        </EmotionProvider>
    )
}
