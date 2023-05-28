import { Button, Input } from "antd"
import React, { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { deleteLine } from "../../../redux/graphLinkData"
import { deleteNode, updateNodeText } from "../../../redux/graphNodeData"
import { INodeItemProps } from "../types/node-item"

const NodeItem: React.FC<INodeItemProps> = (props) => {
    const {
        nodeInfo
    } = props

    const dispatch = useDispatch()

    const [editStatus, setEditStatus] = useState<boolean>(false)

    const nodeChangeHandler = useCallback((e) => {
        dispatch(
            updateNodeText({
                id: nodeInfo?.id,
                text: e.target.value,
            })
        )
    }, [nodeInfo, dispatch])

    const nodeDeleteHandler = useCallback(() => {
        nodeInfo?.relationList.map((item) => {
            dispatch(
                deleteLine({
                    id: item
                })
            )
        })
        console.log('nodeInfo', nodeInfo.relationList);
        
        dispatch(
            deleteNode({
                id: nodeInfo?.id
            })
        )
    }, [nodeInfo, dispatch])

    return (
        <div className="node-item-row">
            <div className="column">
                {
                    editStatus ? <Input placeholder="..." value={nodeInfo?.text} onChange={nodeChangeHandler}></Input> : <div className="text">{nodeInfo?.text}</div>
                }
            </div>
            <Button type="primary" onClick={() => setEditStatus(prev => !prev)}>{editStatus ? 'save' : 'edit'}</Button>
            <Button type="primary" danger onClick={nodeDeleteHandler}>delete</Button>
        </div>
    )
}

export default NodeItem