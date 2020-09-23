import React, {Component} from 'react'
import { NavBar, Icon,Button,} from 'antd-mobile';
class home extends Component {
  
      init =()=>{

      }
   
  render () {
    return (
      <div>
          <NavBar
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={() => console.log('onLeftClick')}
      rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ]}
    >NavBar</NavBar>
     <Button loading>loading button</Button>
      </div>
    )
  }
}

export default home;



// ReactDOM.render(
//   <div>
//     <NavBar
//       mode="light"
//       icon={<Icon type="left" />}
//       onLeftClick={() => console.log('onLeftClick')}
//       rightContent={[
//         <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
//         <Icon key="1" type="ellipsis" />,
//       ]}
//     >NavBar</NavBar>

//     <NavBar
//       mode="dark"
//       leftContent="Back"
//       rightContent={[
//         <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
//         <Icon key="1" type="ellipsis" />,
//       ]}
//     >NavBar</NavBar>
//   </div>
//   , mountNode);