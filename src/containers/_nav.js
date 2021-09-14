import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Control Panel']
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Review old Data',
    to: '/theme/Colors',
    icon: 'cil-drop',
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Line Two',
  //   to: '/theme/typography',
  //   icon: 'cil-drop',
  // },
]

export default _nav
