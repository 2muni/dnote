import React from 'react'
import styles from './NoteList.module.scss'
import NoteItem from 'components/notes/NoteItem'

const NoteList = ({ notes }) => {
    const noteList = notes.map((note, i) => (
        <NoteItem note={note} key={note.id} />
    ))

    return (
        <div className={styles.note_list}>
            <div className={styles.title}>Your Notes...</div>
            {noteList}
        </div>
    )
}

export default NoteList