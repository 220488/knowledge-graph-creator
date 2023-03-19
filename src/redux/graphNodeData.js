import { createSlice } from '@reduxjs/toolkit'

export const graphNodeSlice = createSlice({
    name: 'node',
    initialState: [],
    reducers: {
        addNode: (state, action) => {
            const node = {
                id: state.length,
                x: 200,
                y: 225,
            }
            state.push(node)
        },
        setNodeNewLocation: (state, action) => {
            const index = state.findIndex((node) => node.id === action.payload.id)
            state[index].x = action.payload.x
            state[index].y = action.payload.y
        },
    },
})

export const { addNode, setNodeNewLocation } = graphNodeSlice.actions

export default graphNodeSlice.reducer