import React, { Component } from 'react'
import { connect } from 'react-redux'
import InsertForm from 'components/notes/InsertForm'
import NoteList from 'components/notes/NoteList'
import NoteWrapper from 'components/notes/NoteWrapper'
import LoadingView from "components/notes/LoadingView"
import * as noteActions from 'store/modules/notes'

class NoteContainer extends Component {
    componentDidMount() {
        this.getNotes()
        window.addEventListener("scroll", this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
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
        if (!this.props.isLoading) {
            deleteNote({ id });
        }
        
        const scrollHeight =
            (document.documentElement && document.documentElement.scrollHeight) ||
            document.body.scrollHeight
        const clientHeight =
            (document.documentElement && document.documentElement.clientHeight) ||
            document.body.clientHeight
        const offsetFlag = scrollHeight - clientHeight < 100

        if (offsetFlag) {
            const lastId = this.props.notes[this.props.notes.length - 1].id
            
            if (!this.props.isLast) {
                this.props.getMoreNotes({ lastId })
            }
        }
    }

    updateNote = () => {
        const { updateNote } = this.props
        updateNote();
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

    handleScroll = () => {
        const { innerHeight } = window
        const { scrollHeight } = document.body

        const scrollTop = 
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop
        
        if (scrollHeight - innerHeight - scrollTop < 100) {
            if (!this.props.isLoading && !this.props.isLast) {
                const lastId = this.props.notes[this.props.notes.length - 1].id
                this.props.getMoreNotes({ lastId })
            }
        }
    }

    render() {
        const { noteInput, error, notes, editing, isLoading } = this.props
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
                <LoadingView isLoading={isLoading} />
            </NoteWrapper>
        )
    }
}

const mapStateToProps = state => ({
    noteInput: state.notes.noteInput,
    notes: state.notes.notes,
    error: state.notes.error,
    editing: state.notes.editing,
    isLast: state.notes.isLast,
    isLoading: state.notes.isLoading,
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
    },
    getMoreNotes: ({lastId}) => {
        dispatch(noteActions.getMoreNotes({lastId}))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteContainer)