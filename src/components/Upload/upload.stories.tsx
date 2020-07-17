import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload, { UploadFile } from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  }
  return true
}
const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', { type: file.type })
  return Promise.resolve(newFile)
}

const SimpleUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      name="fileName"
      onChange={action('change')}
      onProgress={action('progress')}
      onRemove={action('remove')}
      onSuccess={action('success')}
    >
      <Button
        btnType="primary"
        disabled={false}
        size="lg"
      >
        <Icon icon="upload" />
        点击上传 
      </Button>
    </Upload>
  )
}

const checkSizeUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('changed')}
      beforeUploadFile={checkFileSize}
    >
      <Button
        btnType="primary"
        size="lg"
      >
        <Icon icon="upload" />
        不能传大于50Kb！
      </Button>
    </Upload> 
  )
}

const DragUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      drag
      multiple
      name="fileName"
      onChange={action('changed')}
      onRemove={action('remove')}
    >
      <Icon
        icon="upload"
        size="5x"
        theme="secondary"
      />
      <br />
      <p>
        点击或者拖动到此区域进行上传
      </p>
    </Upload> 
  )
}

storiesOf('Upload Component', module)
  .add('Upload', SimpleUpload)
  .add('上传前检测文件大小', checkSizeUpload)
  .add('拖动上传', DragUpload)