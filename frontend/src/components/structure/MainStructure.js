import React from 'react'
import Header from './Header'

const MainStructure = ({ children }) => (
    <div>
        <Header />
        <main>{ children }</main>
    </div>
)

export default MainStructure