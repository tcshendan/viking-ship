import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Alert from './alert'

const defaultAlert = () => (
  <Alert
    title="this is alert!"
    closable
  />
)

const buttonWithType = () => (
  <React.Fragment>
    <Alert
      title="this is Success"
      type="success"
      closable
    />
    <Alert
      title="this is Danger!"
      type="danger"
      closable
    />
    <Alert
      title="this is Warning!"
      type="warning"
    />
  </React.Fragment>
)

const buttonWithDescription = () => (
  <Alert 
    title="提示标题欧亲"
    description="this is a long description"
    closable
    onClose={action('closed')}
  />
)

storiesOf('Alert Component', module)
  .add('Alert', defaultAlert)
  .add('不同样式的 Alert', buttonWithType)
  .add('添加描述的 Alert', buttonWithDescription)