import { createSlice } from "@reduxjs/toolkit";

export const fileSlice = createSlice({
    name: 'file',
    initialState: [
        {
            title: '文件1',
            createTime: '2023',
            imageUrl: '',
            folder: 1,
        },
    ],
    reducers: {
        addFile: (state, action) => {
            const createTime = new Date()
            const newFile = {
                title: action.payload.title,
                createTime: createTime,
                imageUrl: '',
                folder: action.payload.folder,
            }
            state.push(newFile)
        }
    }
})

export const { addFile } = fileSlice.actions

export default fileSlice.reducer