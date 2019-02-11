import { ajax } from 'rxjs/observable/dom/ajax'
import { of } from 'rxjs'
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators'
import { ofType } from 'redux-observable'

const CHANGE_NOTE_INPUT = 'notes/CHANGE_NOTE_INPUT'
const ADD_NOTE = 'notes/ADD_NOTE'
const ADD_NOTE_SUCCESS = 'notes/ADD_NOTE_SUCCESS'
const ADD_NOTE_FAILURE = 'notes/ADD_NOTE_FAILURE'
const GET_NOTES = "notes/GET_NOTES"
const GET_NOTES_SUCCESS = "notes/GET_NOTES_SUCCESS"
const GET_NOTES_FAILURE = "notes/GET_NOTES_FAILURE"
const TOGGLE_NOTE = "notes/TOGGLE_NOTE"
const UPDATE_NOTE = "notes/UPDATE_NOTE"
const UPDATE_NOTE_SUCCESS = "notes/UPDATE_NOTE_SUCCESS"
const UPDATE_NOTE_FAILURE = "notes/UPDATE_NOTE_FAILURE"
const DELETE_NOTE = "note/DELETE_NOTE"
const DELETE_NOTE_SUCCESS = "note/DELETE_NOTE_SUCCESS"
const DELETE_NOTE_FAILURE = "note/DELETE_NOTE_FAILURE"

export const changeNoteInput = ({ value }, isEditing) => ({
    type: CHANGE_NOTE_INPUT,
    payload: { value, isEditing }
})
export const addNote = () => ({
    type: ADD_NOTE
})
export const addNoteSuccess = note => ({
    type: ADD_NOTE_SUCCESS,
    payload: { note }
})
export const addNoteFailure = error => ({
    type: ADD_NOTE_FAILURE,
    payload: { error }
})
export const getNotes = () => ({
    type: GET_NOTES
})
export const getNotesSuccess = ({ notes }) => ({
    type: GET_NOTES_SUCCESS,
    payload: {
        notes
    }
})
export const getNotesFailure = error => ({
    type: GET_NOTES_FAILURE,
    payload: {
        error
    }
})
export const toggleNote = ({ id, text }) => ({
    type: TOGGLE_NOTE,
    payload: {
        id,
        text
    }
})
export const updateNote = () => ({
    type: UPDATE_NOTE
})
export const updateNoteSuccess = ({ note }) => ({
    type: UPDATE_NOTE_SUCCESS,
    payload: {
        note
    }
})
export const updateNoteFailure = error => ({
    type: UPDATE_NOTE_FAILURE,
    payload: {
        error
    }
})
export const deleteNote = ({ id }) => ({
    type: DELETE_NOTE,
    payload: {
        id
    }
})
export const deleteNoteSuccess = ({ id }) => ({
    type: DELETE_NOTE_SUCCESS,
    payload: {
        id
    }
})
export const deleteNoteFailure = error => ({
    type: DELETE_NOTE_FAILURE,
    payload: {
        error
    }
})

const addNoteEpic = (action$, state$) => {
    return action$.pipe(
        ofType(ADD_NOTE),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            return ajax
            .post(`/api/notes/`, { text: state.notes.noteInput })
            .pipe(
                map(response => {
                    const note = response.response
                    return addNoteSuccess(note)
                }),
                catchError(error =>
                    of({
                        type: ADD_NOTE_FAILURE,
                        payload: error,
                        error: true
                    })
                )
            )
        })
    )
}

const getNotesEpic = (action$, state$) => {
    return action$.pipe(
        ofType(GET_NOTES),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            return ajax
            .get(`/api/notes/`)
            .pipe(
                map(response => {
                    const notes = response.response
                    return getNotesSuccess({ notes })
                }),
                catchError(error =>
                    of({
                        type: GET_NOTES_FAILURE,
                        payload: error,
                        error: true
                    })
                )
            )
        })
    )
}

const updateNoteEpic = (action$, state$) => {
    return action$.pipe(
        ofType(UPDATE_NOTE),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            return ajax
            .patch(`/api/notes/${state.notes.editing.id}/`, {
                text: state.notes.editing.text
            })
            .pipe(
                map(response => {
                    const note = response.response
                    return updateNoteSuccess({ note })
                }),
                catchError(error =>
                    of({
                        type: UPDATE_NOTE_FAILURE,
                        payload: error,
                        error: true
                    })    
                )
            )
        })
    )
}

const deleteNoteEpic = (action$, state$) => {
    return action$.pipe(
        ofType(DELETE_NOTE),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            const token = localStorage.getItem("userInfo")
                ? JSON.parse(localStorage.getItem("userInfo")).token
                : null
            return ajax
            .delete(`/api/notes/${action.payload.id}`, {
                "Content-Type": "application/json",
                Authoriztion: `token ${token}`
            })
            .pipe(
                map(response => deleteNoteSuccess({ id: action.payload.id })),
                catchError(error => 
                    of({
                        type: DELETE_NOTE_FAILURE,
                        payload: error,
                        error: true
                    })    
                )
            )
        })
    )
}
  
const initialState = {
    noteInput: '',
    notes: [],
    error: {
        triggered: false,
        message: ""
    },
    editing: {
        id: null,
        text: ""
    }
}

export const notes = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_NOTE_INPUT:
            if (action.payload.isEditing) {
                return {
                    ...state,
                    editing: {
                        ...state.editing,
                        text: action.payload.value
                    }
                }
            }
            return{
                ...state,
                noteInput: action.payload.value
            }
        case ADD_NOTE_SUCCESS:
            const { note } = action.payload;
            return {
                ...state,
                notes: [note].concat(state.notes),
                noteInput: "",
                error: {
                    triggered: false,
                    message: ""
                }
            }
        case ADD_NOTE_FAILURE:
            return {
                ...state,
                error: {
                    triggered: true,
                    message: "Error! Please Try With Unempty Note"
                }
            }
        case GET_NOTES_SUCCESS: 
            return {
                ...state,
                notes: action.payload.notes
            }
        case GET_NOTES_FAILURE: 
            return {
                ...state,
                error: {
                    triggered: true,
                    message: "Error! Please Try Again!"
                }
            }
        case TOGGLE_NOTE:
            return {
                ...state,
                editing: {
                    id: parseInt(action.payload.id, 10),
                    text: action.payload.text
                }
            }
        case UPDATE_NOTE_SUCCESS:
            const { id, text } = action.payload.note
            let notes = state.notes
            let index = notes.findIndex(note => note.id === id)
            notes[parseInt(index, 10)] = {
                id,
                text
            }
            return {
                ...state,
                editing: {
                    id: null,
                    text: ""
                },
                notes
            }
        case DELETE_NOTE_SUCCESS:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload.id)
            }
        default:
            return state
    }
}

export const notesEpics = {
    addNoteEpic,
    getNotesEpic,
    updateNoteEpic,
    deleteNoteEpic
}