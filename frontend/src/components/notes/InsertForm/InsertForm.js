import React from 'react'
import styles from './InsertForm.module.scss'

const InsertForm = ({ noteInput, onChangeInput, onAdd, error }) => {
    const handleChange = e => {
        const { value } = e.target
        onChangeInput({ value })
    }

    const handleKeyPress = e => {
        e.key === 'Enter' && onAdd()
    }

    return (
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
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
        </div>
    )
}

export default InsertForm