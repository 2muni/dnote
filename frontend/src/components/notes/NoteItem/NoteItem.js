import React from 'react'
import styles from './NoteItem.module.scss'

const NoteItem = ({
    note,
    editing,
    onToggle,
    onChange,
    onUpdate,
    onDelete
}) => {
    const handleToggle = () => {
        onToggle({ id: note.id, text: note.text })
    }

    const handleChange = e => {
        const { value } = e.target
        onChange({ value }, true)
    }

    const handleKeyPress = e => {
        e.key === 'Enter' && onUpdate()
    }

    const handleDelete = e => {
        e.stopPropagation()
        onDelete({ id: note.id })
    }

    return (
        <div
            className={`
                ${styles.note_item}
                ${editing.id === note.id && styles.editing}
            `}
            onClick={handleToggle}
        >
            {editing.id === note.id ? (
                <input 
                    type="text"
                    name="note"
                    value={editing.text}
                    autoFocus
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
            ) : (
                <div className={styles.note}>{note.text}</div>  
            )}
            <div className={styles.delete} onClick={handleDelete}>
                &times;
            </div>
        </div>
    )
}

export default NoteItem