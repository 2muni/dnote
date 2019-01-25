import React from 'react'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { MdLock } from 'react-icons/md'

const Header = ({ onLogout }) => (
    <div className={styles.header}>
        <Link to={'/'} className={styles.logo}>
            D-Note
        </Link>
        <div className={styles.logout}>
            <MdLock onClick={onLogout} />
        </div>
    </div>
)

export default Header