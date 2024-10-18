import { Value } from '@/types'
import { combineClasses } from '@/utils/tailwind'

import { TabItem, TabsProps } from '..'

export type TabHorizontalProps = {
  activeKey: Value
  handleChangeKey: (item: TabItem) => void
} & TabsProps

const TabHorizontal = (props: TabHorizontalProps) => {
  const {
    classNameWrapper,
    items,
    activeKey,
    handleChangeKey,
    classNameItem,
    classNameItemContent,
    classNameItemActive,
  } = props
  return (
    <div
      className={combineClasses('tabs w-full', classNameWrapper)}
      data-testid="horizontal"
    >
      <ul className="flex flex-wrap border-b w-full border-gray-200">
        {items.map((item) => (
          <li
            key={item.key}
            data-testid="item"
            style={{
              width: `calc(100% / ${items.length})`,
            }}
            className={combineClasses({
              'border-b border-b-green-default':
                activeKey === item.key,
            })}
          >
            <span
              className={combineClasses(
                'tabs-label inline-block text-gray-500 rounded-sm p-3 text-sm font-medium text-center cursor-pointer',
                'hover:bg-gray-100',
                {
                  'active text-green-default ':
                    activeKey === item.key,
                  'cursor-not-allowed text-gray-300 hover:bg-transparent':
                    item.disabled,
                },
                activeKey === item.key && classNameItemActive,
                classNameItem,
              )}
              onClick={() => !item.disabled && handleChangeKey(item)}
              aria-hidden="true"
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
      <div className="tabs-content pt-5">
        {items.map((item) => (
          <div
            key={`horizontal_${item.key}`}
            className={combineClasses(
              'animate-fade-in tabs-content__item',
              {
                hidden: activeKey !== item.key,
                block: activeKey === item.key,
              },
              classNameItemContent,
            )}
          >
            {item.children}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TabHorizontal
