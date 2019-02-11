import React from 'react'
import styles from './NoteList.module.scss'
import NoteItem from 'components/notes/NoteItem'

const NoteList = ({
    notes,
    editing,
    onToggle,
    onChange,
    onUpdate,
    onDelete
}) => {
    const noteList = notes.map(note => (
        <NoteItem
            note={note}
            key={note.id}
            editing={editing}
            onToggle={onToggle}
            onChange={onChange}
            onUpdate={onUpdate}
            onDelete={onDelete}
        />
    ))

    return (
        <div className={styles.note_list}>
            <div className={styles.title}>Your Notes...</div>
            {noteList}
        </div>
    )
}

export default NoteList