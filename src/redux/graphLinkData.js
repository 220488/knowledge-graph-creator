import { createSlice } from '@reduxjs/toolkit'

export const graphLinkSlice = createSlice({
    name: 'link',
    initialState: [],
    reducers: {
        addLine: (state, action) => {
            const link = {
                id: state.length,
                x1: 200,
                x2: 300,
                y1: 225,
                y2: 325,
            }
            state.push(link)
        },
    },
})

export const { addLine } = graphLinkSlice.actions

export default graphLinkSlice.reducer