import React, { useContext } from 'react'
import classNames from 'classnames'
import { TabsContext } from './tabs'

export interface TabItemProps {
  index?: number,
  label: string,
  disabled?: boolean,
  children?: React.ReactNode
}

const TabItem: React.FC<TabItemProps> = (props) => {
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

export default TabItem