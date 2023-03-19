import { configureStore } from '@reduxjs/toolkit'
import graphNodeReducer from './graphNodeData'
import graphLinkReducer from './graphLinkData'

export default configureStore({
    reducer: {
        node: graphNodeReducer,
        link: graphLinkReducer,
    }
})