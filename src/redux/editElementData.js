import { createSlice } from "@reduxjs/toolkit";

export const editElementSlice = createSlice({
    name: 'editElement',
    initialState: {
        type: '',
        id: "",
    },
    reducers: {
        setEditElement: (state, action) => {
            state.id = action.payload.id
            state.type = action.payload.type
            return state
        }
    },
})

export const { setEditElement } = editElementSlice.actions

export default editElementSlice.reducer