import { useMemo, useState } from 'react'

import { Theme, Value } from '@/types'
import { isPrimaryTheme } from '@/utils/theme'

import style from './tab.module.scss'
import TabHorizontal from './tab-horizontal'
import TabVertical from './tab-vertical'

export interface TabItem {
  key: Value
  label: string | React.ReactNode
  children: string | React.ReactNode
  disabled?: boolean
}

export type Position = 'horizontal' | 'vertical'

export type TabsProps = {
  items: TabItem[]
  defaultActiveKey?: Value
  classNameWrapper?: string
  position?: Position
  classNameItem?: string
  classNameItemContent?: string
  classNameItemActive?: string
  theme?: Theme
}

export const Tabs = (props: TabsProps) => {
  const {
    items = [],
    defaultActiveKey,
    classNameWrapper,
    position = 'horizontal',
    classNameItemContent,
    classNameItem,
    classNameItemActive,
    theme,
  } = props
  const [activeKey, setActiveKey] = useState<Value>(
    defaultActiveKey ?? items[0]?.key,
  )

  const handleChangeKey = (item: TabItem) => {
    setActiveKey(item.key)
  }

  const classNameItemActiveWithTheme = useMemo(() => {
    if (isPrimaryTheme(theme!)) {
      return style['tab-theme__item--active']
    }
    return classNameItemActive
  }, [classNameItemActive, theme])

  const classNameWrapperWithTheme = useMemo(() => {
    if (isPrimaryTheme(theme!)) {
      return style['tab-theme']
    }
    return classNameWrapper
  }, [classNameWrapper, theme])

  const classNameItemWithTheme = useMemo(() => {
    if (isPrimaryTheme(theme!)) {
      return style['tab-theme__item']
    }
    return classNameItem
  }, [classNameItem, theme])

  const classNameItemContentWithTheme = useMemo(() => {
    if (isPrimaryTheme(theme!)) {
      return style['tab-theme__item-content']
    }
    return classNameItemContent
  }, [classNameItemContent, theme])

  if (position === 'vertical') {
    return (
      <TabVertical
        handleChangeKey={handleChangeKey}
        activeKey={activeKey}
        classNameWrapper={classNameWrapperWithTheme}
        classNameItemContent={classNameItemContentWithTheme}
        classNameItem={classNameItemWithTheme}
        classNameItemActive={classNameItemActiveWithTheme}
        items={items}
      />
    )
  }

  return (
    <TabHorizontal
      handleChangeKey={handleChangeKey}
      activeKey={activeKey}
      classNameWrapper={classNameWrapperWithTheme}
      classNameItemContent={classNameItemContentWithTheme}
      classNameItem={classNameItemWithTheme}
      classNameItemActive={classNameItemActiveWithTheme}
      items={items}
    />
  )
}
