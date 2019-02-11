import React from 'react'
import styles from './InsertForm.module.scss'

const InsertForm = ({ noteInput, onChange, onKeyPress, error }) => (
    <div className={styles.form}>
        <div className={styles.title}>Insert Your Note Here...</div>
        <div className={styles.error}>
            {error.triggered && (
                <div className={styles.message}>{error.message}</div>
            )}
        </div>
        <input
            type="text"
            name="note"
            value={noteInput}
            onChange={onChange}
            onKeyPress={onKeyPress}
        />
    </div>
)

export default InsertForm