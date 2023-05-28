import { createSlice } from '@reduxjs/toolkit'
import { getUUID } from '../utils/uuid-generator'

export const graphLinkSlice = createSlice({
    name: 'link',
    initialState: [],
    reducers: {
        addLine: (state, action) => {
            const link = {
                id: action.payload.id,
                source: action.payload.source,
                des: action.payload.des,
                x1: action.payload.x1,
                x2: action.payload.x2,
                y1: action.payload.y1,
                y2: action.payload.y2,
                text: "新建"
            }
            state.push(link)
        },
        deleteLine: (state, action) => {
            console.log('delete', action);
            return state.filter((link) => link.id !== action.payload.id)
        },
        setLineNewLocation: (state, action) => {
            // 1.根据给的index，找出source和des含该点的线
            // 2.将相应的(x, y)修改为新数据
            // 3.返回新state
            if (state.length > 0) {
                state.map(function(link) {
                    if (link.source === action.payload.id) {
                        link.x1 = action.payload.x
                        link.y1 = action.payload.y
                    } else if (link.des === action.payload.id) {
                        link.x2 = action.payload.x
                        link.y2 = action.payload.y
                    }
                    return link
                })
            }
        },
        updateLinkText: (state, action) => {
            const index = state.findIndex((link) => link.id === action.payload.id)
            state[index].text = action.payload.text
            console.log('update link text');
        }
    }
})

export const { addLine, deleteLine, setLineNewLocation, updateLinkText } = graphLinkSlice.actions

export default graphLinkSlice.reducer