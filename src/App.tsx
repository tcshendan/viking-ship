import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'
library.add(fas)

const App: React.FC = () => {
  const [ show, setShow ] = useState(false)
  const onClose = () => {
    console.log('I was closed !')
  }

  return (
    <div className="App">
      <header className="App-header" style={{paddingLeft: 20}}>
        <Icon icon="coffee" theme="danger" size="10x" />
        <div style={{marginTop: 20}}>
          <Tabs
            defaultIndex={0}
            onSelect={(index) => { console.log('selected: ', index) }}
            type="line"
          >
            <TabItem label="选项卡一">
              this is content one
            </TabItem>
            <TabItem label="选项卡二">
              this is content two
            </TabItem>
            <TabItem label="选项卡三">
              this is content three
            </TabItem>
          </Tabs>
        </div>
        <div style={{marginTop: 20}}>
          <Tabs
            defaultIndex={0}
            onSelect={(index) => { console.log('selected: ', index) }}
            type="card"
          >
            <TabItem label="card1">
              this is card one
            </TabItem>
            <TabItem label="card2">
              this is content two
            </TabItem>
            <TabItem
              disabled
              label="disabled"
            >
              this is content three
            </TabItem>
          </Tabs>
        </div>
        <div style={{marginTop: 20}}>
          <Menu
            defaultIndex={'0'}
            onSelect={(index) => {console.log(index)}}
            mode="horizontal"
            defaultOpenSubMenus={['2']}
          >
            <MenuItem>
              cool link
            </MenuItem>
            <MenuItem>
              cool link 2
            </MenuItem>
            <SubMenu title="dropdown">
              <MenuItem>
                dropdown 1
              </MenuItem>
              <MenuItem>
                dropdown 2
              </MenuItem>
            </SubMenu>
            <MenuItem>
              cool link 3
            </MenuItem>
          </Menu>
        </div>
        <div style={{marginTop: 20}}>
          <Button className="custom"> Hello </Button>
          <Button disabled> Disabled Button </Button>
          <Button btnType='primary' size="lg"> Large Primary </Button>
          <Button btnType="danger" size="sm"> Small Danger </Button>
          <Button btnType="link" href="http://www.baidu.com" target="_blank"> Baidu Link </Button>
          <Button btnType="link" href="http://www.baidu.com" disabled> Disabled Link </Button>
        </div>
        <div style={{marginTop: 20, width: 450}}>
          <Alert title="Success" type="success" description="Detailed description and advice about successful copywriting." closable={false} />
          <Alert title="default" description="Additional description and information about copywriting." closable onClose={onClose} />
          <Alert title="Danger" type="danger" />
          <Alert title="Warning" type="warning" closable={false} />
        </div>
        <Button size="lg" onClick={() => { setShow(!show) }}> Toggle </Button>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
        >
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-top"
          wrapper
        >
          <Button btnType="primary" size="lg"> A Large Button </Button>
        </Transition>
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
