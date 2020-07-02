import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import Alert, { AlertProps } from './alert'

const defaultProps: AlertProps = {
  title: 'this is default alert',
  closable: false
}

const testProps: AlertProps = {
  title: 'Success',
  type: 'success',
  className: 'klass'
}

const widthDescriptionProps: AlertProps = {
  title: 'this is alert width description',
  description: 'description info'
}

const closableProps: AlertProps = {
  title: 'close',
  closable: true,
  onClose: jest.fn()
}

let wrapper: RenderResult, element: HTMLDivElement, closeSpan: HTMLSpanElement
describe('test Alert component', () => {
  it('should render the correct default alert without close', () => {
    wrapper = render(<Alert {...defaultProps} />)
    element = wrapper.container.querySelector('.alert') as HTMLDivElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert alert-default')
    closeSpan = wrapper.container.querySelector('.alert-close') as HTMLSpanElement
    expect(closeSpan).not.toBeInTheDocument()
  })
  it('should render the correct alert based on different props', () => {
    wrapper = render(<Alert {...testProps} />)
    element = wrapper.container.querySelector('.alert') as HTMLDivElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert-success klass')
  })
  it('should render the correct alert width description', () => {
    wrapper = render(<Alert {...widthDescriptionProps} />)
    element = wrapper.container.querySelector('.alert') as HTMLDivElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert-with-description')
    const descriptionSpan = wrapper.container.querySelector('.alert-description') as HTMLSpanElement
    expect(descriptionSpan).toBeInTheDocument()
  })
  it('should render the closable alert when onClose have to be called ', () => {
    wrapper = render(<Alert {...closableProps} />)
    element = wrapper.container.querySelector('.alert') as HTMLDivElement
    expect(element).toBeInTheDocument()
    closeSpan = wrapper.container.querySelector('.alert-close') as HTMLSpanElement
    fireEvent.click(closeSpan)
    expect(closableProps.onClose).toHaveBeenCalled()
  })
})