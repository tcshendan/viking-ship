import React from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

const App: React.FC = () => {
  const onClose = () => {
    console.log('I was closed !')
  }

  return (
    <div className="App">
      <header className="App-header">
        <Menu
          defaultIndex={0}
        >
          <MenuItem index={0}>
            cool link
          </MenuItem>
          <MenuItem index={1}>
            cool link 2
          </MenuItem>
          <MenuItem index={2}>
            cool link 3
          </MenuItem>
        </Menu>
        <Menu
          mode="vertical"
          defaultIndex={0}
          onSelect={(index) => {console.log(index)}}
        >
          <MenuItem index={0}>
            cool link
          </MenuItem>
          <MenuItem index={1}>
            cool link 2
          </MenuItem>
          <MenuItem index={2}>
            cool link 3
          </MenuItem>
        </Menu>
        <Button className="custom"> Hello </Button>
        <Button disabled> Disabled Button </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Large Primary </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> Small Danger </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank"> Baidu Link </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled> Disabled Link </Button>
        <div style={{width: 420, marginTop: 20}}>
          <Alert title="Success Tips" description="Detailed description and advice about successful copywriting." type={AlertType.Success} closable={false} />
          <Alert title="Informational Notes" description="Additional description and information about copywriting." closable onClose={onClose} />
          <Alert title="Danger" type={AlertType.Danger} />
          <Alert title="Warning" type={AlertType.Warning} closable={false} />
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> 
    </div>
  )
}

export default App
