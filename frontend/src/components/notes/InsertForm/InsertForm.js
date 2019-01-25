import React from 'react'
import styles from './InsertForm.module.scss'

const InsertForm = () => (
    <div className={styles.form}>
        <div className={styles.title}>Insert Your Note Here...</div>
        <input type="text" name="note" />
    </div>
)

export default InsertForm