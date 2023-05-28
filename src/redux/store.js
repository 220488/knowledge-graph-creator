import { configureStore } from '@reduxjs/toolkit'
import graphNodeReducer from './graphNodeData'
import graphLinkReducer from './graphLinkData'
import graphStateReducer from './graphState'
import editElementReducer from './editElementData'
import dashboradFolderReducer from './folderData'
import dashboardFileReducer from './fileData'

export default configureStore({
    reducer: {
        node: graphNodeReducer,
        link: graphLinkReducer,
        graphState: graphStateReducer,
        editElement: editElementReducer,
        folder: dashboradFolderReducer,
        file: dashboardFileReducer,
    }
})