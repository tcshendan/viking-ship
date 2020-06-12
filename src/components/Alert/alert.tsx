import React, { useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
  title: string,
  description?: string,
  type?: AlertType,
  onClose?: () => void,
  closable?: boolean,
  className?: string
}

const Alert: React.FC<AlertProps> = (props) => {
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

export default Alert
