import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import Select, { SelectProps } from './select'
import Option from './option'

config.disabled = true

const testProps: SelectProps = {
  placeholder: 'basic Select',
  name: 'viking-select',
  onChange: jest.fn(),
  onVisibleChange: jest.fn()
}

const multipleProps: SelectProps = {
  placeholder: 'multiple Select',
  name: 'viking-select',
  multiple: true,
  onChange: jest.fn()
}

const disabledProps: SelectProps = {
  placeholder: 'disabled Select',
  name: 'viking-select',
  disabled: true
}

const generateSelect = (props: SelectProps) => {
  return (
    <Select {...props}>
      <Option value="active" />
      <Option
        disabled
        value="disabled"
      />
      <Option value="nihao" />
      <Option value="nihao2" />
      <Option value="nihao3" />
    </Select>
  )
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test Select component', () => {
  it('test basic Select behavior', () => {
    wrapper = render(generateSelect(testProps))
    inputNode = wrapper.getByPlaceholderText('basic Select') as HTMLInputElement
    // input click
    fireEvent.click(inputNode)
    // should show Dropdown Menu
    const dropdownElement = wrapper.container.querySelector('.select-dropdown')
    expect(dropdownElement).toBeInTheDocument()
    // trigger onVisibleChange
    expect(testProps.onVisibleChange).toHaveBeenCalledWith(true)
    // should have Five Options
    expect(wrapper.container.querySelectorAll('.select-item').length).toEqual(5)
    // disabled option should have is-disabled class
    const disabledElement = wrapper.getByText('disabled')
    expect(disabledElement).toHaveClass('select-item is-disabled')
    // click the active item
    const activeElement = wrapper.getByText('active')
    fireEvent.click(activeElement)
    expect(testProps.onChange).toHaveBeenCalled()
    expect(activeElement).toHaveClass('select-item is-active')
    expect(dropdownElement).not.toBeInTheDocument()
    // // trigger onVisibleChange
    expect(testProps.onVisibleChange).toHaveBeenCalledWith(false)
    // fill the input
    expect(inputNode.value).toBe('active')
  })
  it('test multiple Select when multiple is set to true', () => {
    wrapper = render(generateSelect(multipleProps))
    inputNode = wrapper.getByPlaceholderText('multiple Select') as HTMLInputElement
    // input click
    fireEvent.click(inputNode)
    // should show Dropdown Menu
    const dropdownElement = wrapper.container.querySelector('.select-dropdown')
    expect(dropdownElement).toBeInTheDocument()
    // click the nihao、nihao2、nihao3 item
    const nihaoItem = wrapper.getByText('nihao')
    const nihao2Item = wrapper.getByText('nihao2')
    const nihao3Item = wrapper.getByText('nihao3')
    fireEvent.click(nihaoItem)
    fireEvent.click(nihao2Item)
    fireEvent.click(nihao3Item)
    // clicked item should have is-selected class
    expect(nihaoItem).toHaveClass('select-item is-selected')
    expect(nihao2Item).toHaveClass('select-item is-selected')
    expect(nihao3Item).toHaveClass('select-item is-selected')
    // should have three selected tags
    expect(wrapper.container.querySelectorAll('.tag').length).toEqual(3)
  })
  it('should render disabled Select when disabled set to true', () => {
    wrapper = render(generateSelect(disabledProps))
    inputNode = wrapper.getByPlaceholderText('disabled Select') as HTMLInputElement
    expect(inputNode.disabled).toBeTruthy()
  })
})