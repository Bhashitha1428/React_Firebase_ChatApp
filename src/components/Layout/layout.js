import React from 'react'
import Header from '../Header/header'

function Layout(props) {
    return (
        <div>
         <Header/>  
         {props.children}
        </div>
    )
}

export default Layout
