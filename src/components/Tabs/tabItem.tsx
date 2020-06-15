import React, { useContext, FC } from 'react'
import classNames from 'classnames'
import { TabsContext } from './tabs'

export interface TabItemProps {
  index?: number,
  /** Tab选项上面的文字 */
  label: string | JSX.Element,
  /** Tab选项是否被禁用 */
  disabled?: boolean,
  children?: React.ReactNode
}

export const TabItem: FC<TabItemProps> = (props) => {
  const {
    index,
    label,
    disabled
  } = props
  const context = useContext(TabsContext)
  const classes = classNames('tabs-nav-item', {
    'is-active': context.index === index,
    'disabled': disabled
  })
  const handleClick = () => { 
    if (context.onSelect && !disabled && typeof index === 'number') {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} onClick={handleClick}>
      {label}
    </li>
  )
}

TabItem.displayName = 'TabItem'

export default TabItem;