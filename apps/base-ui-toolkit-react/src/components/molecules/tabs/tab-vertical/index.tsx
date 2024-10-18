import { combineClasses } from '@/utils/tailwind'

import { TabHorizontalProps } from '../tab-horizontal'

export type TabVerticalProps = TabHorizontalProps

const TabVertical = (props: TabVerticalProps) => {
  const {
    activeKey,
    handleChangeKey,
    items,
    classNameWrapper,
    classNameItem,
    classNameItemContent,
    classNameItemActive,
  } = props

  return (
    <div className={combineClasses('tabs flex', classNameWrapper)} data-testid="vertical">
      <ul className="flex flex-wrap border-gray-200 flex-col">
        {items.map((item) => (
          <li
            style={{
              width: `calc(100% / ${items.length})`,
            }}
            key={`vertical_label_${item.key}`}
            data-testid="item"
          >
            <span
              className={combineClasses(
                'tabs-label inline-block w-[100px] p-3 text-gray-500 rounded-sm text-sm font-medium text-center cursor-pointer',
                'hover:bg-gray-100 ',
                {
                  'active text-blue-400 bg-gray-100': activeKey === item.key,
                  'cursor-not-allowed text-gray-300 hover:bg-transparent': item.disabled,
                },
                activeKey === item.key && classNameItemActive,
                classNameItem,
              )}
              onClick={() => !item.disabled && handleChangeKey(item)}
              aria-hidden="true"
            >
              {item.children}
            </span>
          </li>
        ))}
      </ul>
      <div className="tabs-content pl-10">
        {items.map((item) => (
          <div
            key={`vertical_${item.key}`}
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

export default TabVertical
