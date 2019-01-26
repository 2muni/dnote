import React from 'react'
import styles from './InsertForm.module.scss'

const InsertForm = ({ noteInput, onChangeInput, onAdd }) => (
    <div className={styles.form}>
        <div className={styles.title}>Insert Your Note Here...</div>
        <input
            type="text"
            name="note"
            value={noteInput}
            onChange={onChangeInput}
            onKeyPress={onAdd}
        />
    </div>
)

export default InsertForm