import React, { useState } from 'react'
import classNames from 'classnames'

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning'
}

interface AlertProps {
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

  return closed ? null : (
    <div className={classes}>
      <span className='alert-title'>{title}</span>
      <span className='alert-description'>{description}</span>
      {closable ? <span className='alert-close' onClick={handleClose}>关闭</span> : null}
    </div>
  )
}

Alert.defaultProps = {
  type: AlertType.Default,
  closable: true
}

export default Alert
