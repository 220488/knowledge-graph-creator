import { createSlice } from "@reduxjs/toolkit";
import { GRAPH_STATE_ENUM } from "./types/index.ts";

export const graphStateSlice = createSlice({
    name: 'graphState',
    initialState: GRAPH_STATE_ENUM.ADD_NODE,
    reducers: {
        setGraphState: (state, action) => {
            state = action.payload.current
            return state
        },
    },
})

export const { setGraphState } = graphStateSlice.actions

export default graphStateSlice.reducer