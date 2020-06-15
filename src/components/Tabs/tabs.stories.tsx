import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Tabs from './tabs'
import TabItem from './tabItem'
import Icon from '../Icon/icon'

const defaultTabs = () => (
  <Tabs
    defaultIndex={0}
    onSelect={action('selected')}
    type="line"
  >
    <TabItem label="选项卡一">
      this is content one
    </TabItem>
    <TabItem label="选项卡二">
      this is content two
    </TabItem>
    <TabItem label="用户管理">
      this is content three
    </TabItem>
  </Tabs>
)

const tabsWithCardStyle = () => (
  <Tabs
    defaultIndex={0}
    onSelect={action('selected')}
    type="card"
  >
    <TabItem label="card1">
      this is card one
    </TabItem>
    <TabItem label="card2">
      this is content two
    </TabItem>
    <TabItem
      disabled
      label="disabled"
    >
      this is content three
    </TabItem>
  </Tabs>
)

const tabsWithCustomStyle = () => {
  const labelElement = <React.Fragment><Icon icon="exclamation-circle" />{'  '}自定义图标</React.Fragment> as JSX.Element
  return (
    <Tabs
      defaultIndex={0}
      onSelect={action('selected')}
      type="card"
    >
      <TabItem label={labelElement}>
        this is card one
      </TabItem>
      <TabItem label="card2">
        this is content two
      </TabItem>
    </Tabs>
  )
}

storiesOf('Tabs component', module)
  .add('Tabs', defaultTabs)
  .add('选项卡样式的 Tabs', tabsWithCardStyle)
  .add('自定义选项卡样式', tabsWithCustomStyle)