import React from 'react'
import HeaderContainer from 'containers/HeaderContainer'

const MainStructure = ({ children }) => (
    <React.Fragment>
        <HeaderContainer />
        <main>{ children }</main>
    </React.Fragment>
)

export default MainStructure