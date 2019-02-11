import { notes, notesEpics } from './notes'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

export const rootReducers = combineReducers({
    notes,
})

export const rootEpics = combineEpics(
    notesEpics.addNoteEpic,
    notesEpics.getNotesEpic
)