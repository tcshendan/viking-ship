import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Select from './select'
import Option from './option'

const SimpleSelect = () => {
  return (
    <Select
      onChange={action('changed')}
      onVisibleChange={action('visible')}
    >
      <Option value="nihao" />
      <Option value="nihao2" />
      <Option value="nihao3" />
      <Option
        disabled
        value="disabled"
      />
      <Option value="nihao5" />
    </Select>
  )
}

const MultipleSelect = () => {
  return (
    <Select
      multiple
      placeholder="支持多选欧！"
      onChange={action('changed')}
      onVisibleChange={action('visible')}
    >
      <Option value="nihao" />
      <Option value="nihao2" />
      <Option value="nihao3" />
      <Option value="viking" />
      <Option value="viking2" />
    </Select>
  )
}

const DisabledSelect = () => {
  return (
    <Select 
      disabled
      placeholder="禁用啦！"
    >
      <Option value="nihao" />
      <Option value="nihao2" />
      <Option value="nihao3" />
    </Select>
  )
}

storiesOf('Select Component', module)
  .add('Select', SimpleSelect)
  .add('支持多选的 Select', MultipleSelect)
  .add('被禁用的 Select', DisabledSelect)