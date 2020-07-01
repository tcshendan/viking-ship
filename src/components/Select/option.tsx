import React, { FC, useContext, MouseEvent } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import { SelectContext } from './select'

export interface OptionProps {
  index?: string,
  /** 默认根据此属性值进行筛选，该值不能相同 */
  value: string,
  /** 选项的标签，若不设置则默认与 value 相同 */
  label?: string,
  /** 是否禁用该选项 */
  disabled?: boolean
}

export const Option: FC<OptionProps> = (props) => {
  const {
    value,
    label,
    disabled
  } = props
  const context = useContext(SelectContext)
  const isSelected = context.selectedTags!.findIndex(item => item === value) > -1
  const classes = classNames('select-item', {
    'is-disabled': disabled,
    'is-active': value === context.value,
    'is-selected': isSelected
  })
  const handleClick = (e: MouseEvent) => {
    if (context.onSelect && !disabled) {
      context.onSelect(value)
    }
  }
  return (
    <li className={classes} onClick={handleClick}>
      { label ? label : value }
      { isSelected && <Icon icon="check" /> }
    </li>
  )
}

Option.displayName = 'Option'

export default Option;