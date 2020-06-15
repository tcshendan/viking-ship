import React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from './icon'
import Button from '../Button/button'

const defaultIcon = () =>(
  <React.Fragment>
    <Icon
      icon="check"
      size="3x"
    />
    <Icon
      icon="times"
      size="3x"
    />
    <Icon
      icon="anchor"
      size="3x"
    />
    <Icon
      icon="trash"
      size="3x"
    />
    <Button
      btnType="primary"
      disabled={false}
      size="lg"
    >
      <Icon icon="check" />
       check 
    </Button>
  </React.Fragment>
)

const iconWithTheme = () => (
  <React.Fragment>
    <Icon
      icon="check"
      size="3x"
      theme="success"
    />
    <Icon
      icon="times"
      size="3x"
      theme="danger"
    />
    <Icon
      icon="anchor"
      size="3x"
      theme="primary"
    />
    <Icon
      icon="exclamation-circle"
      size="3x"
      theme="warning"
    />
  </React.Fragment>
)

const iconWithAction = () => (
  <React.Fragment>
    <Icon
      icon="spinner"
      size="3x"
      spin
      theme="primary"
    />
    <Icon
      icon="spinner"
      size="3x"
      pulse
      theme="success"
    />
  </React.Fragment>
)

storiesOf('Icon component', module)
  .add('Icon', defaultIcon)
  .add('不同主题的 Icon', iconWithTheme)
  .add('更多行为的 Icon', iconWithAction)