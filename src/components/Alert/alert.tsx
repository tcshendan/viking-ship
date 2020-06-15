import React, { useState, FC } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
  /** 标题 */
  title: string,
  /** 描述 */
  description?: string,
  /** 类型 四种可选 针对四种不同的场景 */
  type?: AlertType,
  /** 关闭alert时触发的事件 */
  onClose?: () => void,
  /** 是否显示关闭图标 */
  closable?: boolean,
  className?: string
}
/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 * 
 * ~~~js
 * import { Alert } from 'vikingship'
 * ~~~
 */
export const Alert: FC<AlertProps> = (props) => {
  const [closed, setClosed] = useState<boolean>(false)
  const {
    title,
    description,
    type,
    className,
    closable,
    onClose
  } = props

  const classes = classNames('alert', className, {
    [`alert-${type}`]: type,
    'alert-with-description': description
  })

  const handleClose = () => {
    setClosed(true)
    onClose && onClose()
  }

  return (
    <Transition
      in={!closed}
      timeout={300}
      animation="zoom-in-top"
      wrapper
    >
      <div className={classes}>
        <span className='alert-title'>{title}</span>
        <span className='alert-description'>{description}</span>
        {
          closable
            ? <span className='alert-close' onClick={handleClose}>
                <Icon icon="times" size="1x" />
              </span> 
            : null
        }
      </div>
    </Transition>
  )
}

Alert.defaultProps = {
  type: 'default',
  closable: true
}

export default Alert;
