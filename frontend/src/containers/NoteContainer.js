import React, { Component } from 'react'
import { connect } from 'react-redux'
import InsertForm from 'components/notes/InsertForm'
import NoteWrapper from 'components/notes/NoteWrapper'

import * as noteActions from 'store/modules/notes'

class NoteContainer extends Component {
    handleChange = e => {
        const { changeNoteInput } = this.props
        const { value } = e.target
        changeNoteInput({ value })
    }

    addNote = e => {
        const { addNote } = this.props
        e.key === 'Enter' && addNote()
    }

    render() {
        const { noteInput } = this.props
        const { handleChange, addNote } = this

        return(
            <NoteWrapper>
                <InsertForm
                    noteInput={noteInput}
                    onChangeInput={handleChange}
                    onAdd={addNote}
                />
            </NoteWrapper>
        )
    }
}

const mapStateToProps = state => ({
    noteInput: state.notes.noteInput,
    notes: state.notes.notes
})

const mapDispatchToProps = dispatch => ({
    changeNoteInput: ({ value }) => {
        dispatch(noteActions.changeNoteInput({ value }))
    },
    addNote: () => {
        dispatch(noteActions.addNote())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteContainer)