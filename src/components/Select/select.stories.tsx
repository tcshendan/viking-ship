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

storiesOf('Select Component', module)
  .add('Select', SimpleSelect)