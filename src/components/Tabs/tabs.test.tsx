import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'

import Tabs, { TabsProps } from './tabs'
import TabItem from './tabItem'

const testProps: TabsProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'klass'
}
const testCardProps: TabsProps = {
  defaultIndex: 0,
  type: 'card'
}
const generateTabs = (props: TabsProps) => {
  return (
    <Tabs {...props}>
      <TabItem label="active">
        this is content one
      </TabItem>
      <TabItem label="disabled" disabled>
        this is content two
      </TabItem>
      <TabItem label="选项卡三">
        this is content three
      </TabItem>
    </Tabs>
  )
}

let wrapper: RenderResult, tabsElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
let tabsNavElement: HTMLElement, tabsContentElement: HTMLElement

describe('test Tabs and TabItem component', () => {
  beforeEach(() => {
    wrapper = render(generateTabs(testProps))
    tabsElement = wrapper.getByTestId('test-tabs')
    tabsNavElement = wrapper.container.getElementsByTagName('ul')[0]
    tabsContentElement = wrapper.getByText('this is content one')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Tabs and TabItem based on default props', () => {
    expect(tabsElement).toBeInTheDocument()
    expect(tabsNavElement).toHaveClass('tabs-nav klass nav-line')
    expect(tabsNavElement.querySelectorAll('li').length).toEqual(3)
    expect(activeElement).toHaveClass('tabs-nav-item is-active')
    expect(disabledElement).toHaveClass('tabs-nav-item disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('选项卡三')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    expect(tabsContentElement.innerHTML).toEqual('this is content three')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
    expect(tabsContentElement.innerHTML).not.toEqual('this is content two')
  })
  it('should render card type when type is set to card', () => {
    cleanup()
    wrapper = render(generateTabs(testCardProps))
    tabsElement = wrapper.getByTestId('test-tabs')
    tabsNavElement = wrapper.container.getElementsByTagName('ul')[0]
    expect(tabsElement).toBeInTheDocument()
    expect(tabsNavElement).toHaveClass('nav-card')
  })
})