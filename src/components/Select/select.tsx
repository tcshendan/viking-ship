import React, { FC, useState, useRef, createContext, FunctionComponentElement, MouseEvent } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Transition from '../Transition/transition'
import { OptionProps } from './option'
import useClickOutside from '../../hooks/useClickOutside'

type ValueType = string | string[]
type SelectCallback = (selectedValue: string, selectedValues: string[]) => void
export interface SelectProps extends Omit<InputProps, 'onChange'> {
  /** 指定默认选中的条目 可以是是字符串或者字符串数组 */
  defaultValue?: ValueType,
  /** 选择框默认文字 */
  placeholder?: string,
  /** 是否禁用 */
  disabled?: boolean,
  /** 是否支持多选 */
  multiple?: boolean,
  /** select input 的 name 属性 */
  name?: string,
  /** 选中值发生变化时触发 */
  onChange?: SelectCallback,
  /** 下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void
}
interface ISelectContext {
  value: ValueType,
  onSelect: SelectCallback
}

export const SelectContext = createContext<ISelectContext>({ value: '', onSelect: () => {} })
/**
 * 下拉选择器。 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 * 
 * ~~~js
 * import { Select } from 'vikingship'
   // 然后可以使用 <Select> 和 <Select.Option>
 * ~~~
 */
export const Select: FC<SelectProps> = (props) => {
  const {
    defaultValue,
    name,
    placeholder,
    onChange,
    onVisibleChange,
    children
  } = props
  const [ menuOpen, setMenuOpen ] = useState(false)
  const [ inputValue, setInputValue ] = useState(defaultValue as ValueType)
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef, () => {
    setMenuOpen(false)
    if (onVisibleChange) {
      onVisibleChange(false)
    }
  })
  const classes = classNames('select', {
    'menu-is-open': menuOpen
  })
  const handleClick = (e?: MouseEvent) => {
    e?.preventDefault()
    setMenuOpen(!menuOpen)
    if (onVisibleChange) {
      onVisibleChange(!menuOpen)
    }
  }
  const handleChange = (selectedValue: string, selectedValues: string[]) => {
    setInputValue(selectedValue)
    handleClick()
    if (onChange) {
      onChange(selectedValue, selectedValues)
    }
  }
  const passedContext: ISelectContext = {
    value: inputValue,
    onSelect: handleChange
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<OptionProps>
      const { displayName } = childElement.type
      if (displayName === 'Option') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else{
        console.error('Warning: Select has a child which is not a Option component')
      }
    })
  }
  const generateDropdown = () => {
    return (
      <Transition
        in={menuOpen}
        animation="zoom-in-top"
        timeout={300}
      >
        <ul className="select-dropdown">
          <SelectContext.Provider value={passedContext}>
            {renderChildren()}
          </SelectContext.Provider>
        </ul>
      </Transition>
    )
  }
  return (
    <div className={classes} ref={componentRef}>
      <div className="select-input">
        <Input
          icon="angle-down"
          placeholder={placeholder}
          readOnly
          name={name}
          value={inputValue}
          onClick={handleClick}
        />
      </div>
      {generateDropdown()}
    </div>
  )
}

Select.defaultProps = {
  placeholder: '请选择',
  name: 'viking-select'
}

export default Select;