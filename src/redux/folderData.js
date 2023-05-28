import { createSlice } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
    name: 'folder',
    initialState: [
        {
            label: '文件夹',
            key: 'new-folder',
            // children: [
            //     {
            //         label: 'c1',
            //         key: 'c1',
            //     },
            //     {
            //         label: 'c2',
            //         key: 'c2'
            //     }
            // ],
            children: null,
            type: 'group'
        },
    ],
    reducers: {
        addFolder: (state, action) => {
            const newFolder = {
                label: action.payload.label,
                key: action.payload.key,
                children: null,
            }
            state.push(newFolder)
        }
    }
})

export const { addFolder } = folderSlice.actions

export default folderSlice.reducer