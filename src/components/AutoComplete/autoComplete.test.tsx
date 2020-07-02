import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, wait, cleanup } from '@testing-library/react'
import AutoComplete, { AutoCompleteProps } from './autoComplete'

config.disabled = true

const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
]

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

const renderOptionProps: AutoCompleteProps = {
  fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
  placeholder: 'render option autoComplete',
  renderOption: item => <React.Fragment><b>value值：{item.value}</b></React.Fragment>
}

// const handleFetch = (query: string) => {
//   return fetch('https://api.github.com/search/users?q='+ query)
//     .then(res => res.json())
//     .then(({ items }) => {
//       return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
//     })
// }
// const asyncFetchProps: AutoCompleteProps = {
//   fetchSuggestions: handleFetch,
//   onSelect: jest.fn(),
//   placeholder: 'async fetchSuggestions autoComplete'
// }

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps}/>)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // should have two suggestion items
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    // click the first item
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    // fill the input
    expect(inputNode.value).toBe('ab')
  })
  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('ab')
    const secondResult = wrapper.queryByText('abc')
    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstResult).toHaveClass('is-active')
    // arrow down 
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondResult).toHaveClass('is-active')
    // arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firstResult).toHaveClass('is-active')
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('renderOption should generate the right template', async () => {
    cleanup()
    wrapper = render(<AutoComplete {...renderOptionProps}/>)
    inputNode = wrapper.getByPlaceholderText('render option autoComplete') as HTMLInputElement
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.queryByText('value值：ab')).toBeInTheDocument()
    })
  })
  it('async fetchSuggestions should works fine', async () => {
    // cleanup()
    // wrapper = render(<AutoComplete {...asyncFetchProps}/>)
    // inputNode = wrapper.getByPlaceholderText('async fetchSuggestions autoComplete') as HTMLInputElement
    // // input change
    // fireEvent.change(inputNode, { target: { value: 'abcd' } })
    // await wait(() => {
    //   expect(wrapper.queryByText('abcd')).toBeInTheDocument()
    // })
  })
})