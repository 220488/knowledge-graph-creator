import { configureStore } from '@reduxjs/toolkit'
import graphNodeReducer from './graphNodeData'
import graphLinkReducer from './graphLinkData'
import graphStateReducer from './graphState'
import editElementReducer from './editElementData'

export default configureStore({
    reducer: {
        node: graphNodeReducer,
        link: graphLinkReducer,
        graphState: graphStateReducer,
        editElement: editElementReducer,
    }
})