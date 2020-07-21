import '@testing-library/jest-dom/extend-expect'
import React, { ReactElement, ReactEventHandler } from 'react'
import axios from 'axios'
import { render, RenderResult, fireEvent, wait, createEvent } from '@testing-library/react'

import { Upload, UploadProps } from './upload'

jest.mock('../Icon/icon', () => {
  return ({ icon, onClick } : { icon: ReactElement, onClick: ReactEventHandler }) => {
    return <span onClick={onClick}>{icon}</span>
  }
})

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.file-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
  })
  it('upload process should works fine', async () => {
    const { queryByText } = wrapper
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({ 'data': 'cool' })
    // })
    mockedAxios.post.mockResolvedValue({ 'data': 'cool' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [ testFile ] } })
    // show spinner icon
    expect(queryByText('spinner')).toBeInTheDocument()
    await wait(() => {
      // show the filename
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    // show check-circle icon
    expect(queryByText('check-circle')).toBeInTheDocument()
    // trigger onSuccess
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      name: 'test.png',
      raw: testFile
    }))
    // trigger onChange
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      name: 'test.png',
      raw: testFile
    }))

    // remove the uploaded file
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(queryByText('times') as HTMLElement)
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      name: 'test.png',
      status: 'success',
      raw: testFile
    }))
  })
  it('drag and drop files should works fine', async () => {
    const { queryByText } = wrapper
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')

    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [ testFile ]
      }
    })
    fireEvent(uploadArea, mockDropEvent)
    await wait(() => {
      // show the filename
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    // trigger onSuccess
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      name: 'test.png',
      raw: testFile
    }))
  })
})