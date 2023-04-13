import { createSlice } from '@reduxjs/toolkit'
import { getUUID } from '../utils/uuid-generator'

export const graphNodeSlice = createSlice({
    name: 'node',
    initialState: [],
    reducers: {
        addNode: (state, action) => {
            const node = {
                id: getUUID(),
                x: 200,
                y: 225,
                text: 'test1',
                relationList: [],
            }
            state.push(node)
        },
        deleteNode: {
            reducer (state, action) {
                return state.filter((item) => action.payload.id !== item.id)
            },
            prepare (id) {
                return {
                    payload: {
                        id
                    }
                }
            }
        },
        addNodeRelationLink: (state, action) => {
            console.log('payload', action.payload.nodeId)
            // const index = state.findIndex((node) => node.id === action.payload.id)
            // state[index].relationList.push(action.payload.nodeId)
            // action.payload.nodeId.map((item) => state[index].relationList.push(item))
            action.payload.nodeId.map((nodeId) => {
                console.log('item', nodeId)
                const index = state.findIndex((node) => node.id === nodeId)
                state[index].relationList.push(action.payload.linkId)
            })
        },
        setNodeNewLocation: (state, action) => {
            const index = state.findIndex((node) => node.id === action.payload.id)
            state[index].x = action.payload.x
            state[index].y = action.payload.y
        },
        updateNodeText: (state, action) => {
            const index = state.findIndex((node) => node.id === action.payload.id)
            state[index].text = action.payload.text
        }
    }
})

export const { addNode, deleteNode, setNodeNewLocation, updateNodeText, addNodeRelationLink } = graphNodeSlice.actions

export default graphNodeSlice.reducer