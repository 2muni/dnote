import React, { Component } from 'react'
import { connect } from 'react-redux'
import InsertForm from 'components/notes/InsertForm'
import NoteList from 'components/notes/NoteList'
import NoteWrapper from 'components/notes/NoteWrapper'


import * as noteActions from 'store/modules/notes'

class NoteContainer extends Component {
    componentDidMount() {
        this.getNotes()
    }

    getNotes = () => {
        const { getNotes } = this.props
        getNotes()
    }

    addNote = () => {
        const { addNote } = this.props
        addNote()
    }

    deleteNote = ({ id }) => {
        const { deleteNote } = this.props
        deleteNote({ id })
    }

    handleChange = ({ value }, isEditing) => {
        const { changeNoteInput } = this.props
        changeNoteInput({ value }, isEditing)
    }

    handleToggle = ({ id, text }) => {
        const { toggleNote, editing } = this.props
        if (editing.id === id) {
            toggleNote({ id: null, text: "" })
        }else {
            toggleNote({ id, text })
        }
    }

    updateNote = () => {
        const { updateNote } = this.props
        updateNote();
    }

    render() {
        const { noteInput, error, notes, editing } = this.props
        const {
            handleChange,
            addNote,
            handleToggle,
            updateNote,
            deleteNote
        } = this

        return(
            <NoteWrapper>
                <InsertForm
                    noteInput={noteInput}
                    onChangeInput={handleChange}
                    onAdd={addNote}
                    error={error}
                />
                <NoteList
                    notes={notes}
                    editing={editing}
                    onToggle={handleToggle}
                    onChange={handleChange}
                    onUpdate={updateNote}
                    onDelete={deleteNote}
                />
            </NoteWrapper>
        )
    }
}

const mapStateToProps = state => ({
    noteInput: state.notes.noteInput,
    notes: state.notes.notes,
    error: state.notes.error,
    editing: state.notes.editing
})

const mapDispatchToProps = dispatch => ({
    changeNoteInput: ({ value }, isEditing) => {
        dispatch(noteActions.changeNoteInput({ value }, isEditing))
    },
    addNote: () => {
        dispatch(noteActions.addNote())
    },
    getNotes: () => {
        dispatch(noteActions.getNotes())
    },
    toggleNote: ({ id, text }) => {
        dispatch(noteActions.toggleNote({ id, text }))
    },
    updateNote: () => {
        dispatch(noteActions.updateNote())
    },
    deleteNote: ({ id }) => {
        dispatch(noteActions.deleteNote({ id }))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteContainer)