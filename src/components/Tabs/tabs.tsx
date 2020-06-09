import React, { createContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './tabItem'

type NavType = 'line' | 'card'
type SelectCallback = (selectedIndex: number) => void

export interface TabsProps {
  defaultIndex?: number,
  className?: string,
  type?: NavType,
  onSelect?: SelectCallback
}

interface ITabsContext {
  index: number,
  onSelect?: SelectCallback
}

export const TabsContext = createContext<ITabsContext>({ index: 0 })
const Tabs: React.FC<TabsProps> = (props) => {
  const {
    defaultIndex,
    className,
    type,
    onSelect,
    children
  } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('tabs-nav', className, {
    'nav-line': type === 'line',
    'nav-card': type !== 'line'
  })
  const handleClick = (index: number) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext:ITabsContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  }
  let tabsContents:any[] = []
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElemment = child as FunctionComponentElement<TabItemProps>
      const { displayName } = childElemment.type
      if (displayName === 'TabItem') {
        tabsContents.push(childElemment.props.children)
        return React.cloneElement(childElemment, {
          index
        })
      } else{
        console.error('Warning: Tabs has a child which is not a TabItem component')
      }
    })
  }
  return (
    <div className="tabs" data-testid="test-tabs">
      <ul className={classes}>
        <TabsContext.Provider value={passedContext}>
          {renderChildren()}
        </TabsContext.Provider>
      </ul>
      <div className="tabs-content">
        <div className="tab-panel">
          {tabsContents[currentActive as number]}
        </div>
      </div>
    </div>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line'
}

export default Tabs