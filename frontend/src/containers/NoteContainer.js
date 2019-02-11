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

    handleChange = e => {
        const { changeNoteInput } = this.props
        const { value } = e.target
        changeNoteInput({ value })
    }

    handleKeyPress = e => {
        const { addNote } = this.props
        e.key === 'Enter' && addNote()
    }

    render() {
        const { noteInput, error, notes } = this.props
        const { handleChange, handleKeyPress } = this

        return(
            <NoteWrapper>
                <InsertForm
                    noteInput={noteInput}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    error={error}
                />
                <NoteList notes={notes} />
            </NoteWrapper>
        )
    }
}

const mapStateToProps = state => ({
    noteInput: state.notes.noteInput,
    notes: state.notes.notes,
    error: state.notes.error
})

const mapDispatchToProps = dispatch => ({
    changeNoteInput: ({ value }) => {
        dispatch(noteActions.changeNoteInput({ value }))
    },
    addNote: () => {
        dispatch(noteActions.addNote())
    },
    getNotes: () => {
        dispatch(noteActions.getNotes())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteContainer)