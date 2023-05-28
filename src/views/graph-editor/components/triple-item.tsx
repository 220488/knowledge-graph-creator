import { Button, Input } from "antd"
import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateNodeText } from "../../../redux/graphNodeData"
import { ITripleItemProps } from "../types/triple-item.ts"
import '../styles/property-config.scoped.scss'
import { deleteLine, updateLinkText } from "../../../redux/graphLinkData"

const TripleItem: React.FC<ITripleItemProps> = (props) => {
    const {
        headLabelText,
        headNodeId,
        relationLabelText,
        relationLinkId,
        tailLabelText,
        tailNodeId,
    } = props
    const [editStatus, setEditStatus] = useState<boolean>(false)
    const dispatch = useDispatch()
    const node = useSelector((state) => state.node)
    const link = useSelector((state) => state.link)

    // 通过node的uuid找到index
    const findNodeIndex = useCallback((id) => {
        return node.findIndex(item => id === item.id)
    }, [node])

    // 通过link的uuid找到index
    const findLinkIndex = useCallback((id) => {
        return link.findIndex(item => id === item.id)
    }, [link])

    // 访问所需index
    const headNodeIndex = findNodeIndex(headNodeId)
    const tailNodeIndex = findNodeIndex(tailNodeId)
    const relationLinkIndex = findLinkIndex(relationLinkId)

    const EditButtonHandler = useCallback(() => {
        setEditStatus(prev => !prev)
    }, [editStatus])

    // 或许这个要从组件外传进来
    const headNodeChangeHandle = useCallback((e) => {
        dispatch(
            updateNodeText({
                id: headNodeId,
                text: e.target.value,
            })
        )
    }, [headNodeId, dispatch])

    const linkChangeHandle = useCallback((e) => {
        dispatch(
            updateLinkText({
                id: relationLinkId,
                text: e.target.value,
            })
        )
    }, [relationLinkId, dispatch])

    const tailNodeChangeHandle = useCallback((e) => {
        dispatch(
            updateNodeText({
                id: tailNodeId,
                text: e.target.value,
            })
        )
    }, [tailNodeId, dispatch])
    
    const deleteHandler = useCallback(() => {
        dispatch(
            deleteLine({
                id: relationLinkId
            })
        )
    }, [dispatch, relationLinkId])

    return (
        <div className="triple-item-row">
            <div className="column">
            {
                editStatus ? <Input placeholder="..." value={node[headNodeIndex].text} onChange={headNodeChangeHandle}></Input> : <div className="text">{node[headNodeIndex].text}</div>
            }
            </div>
            <div className="column">
            {
                editStatus ? <Input placeholder="..." value={link[relationLinkIndex].text} onChange={linkChangeHandle}></Input> : <div className="text">{link[relationLinkIndex].text}</div>
            }
            </div>
            <div className="column">
            {
                editStatus ? <Input placeholder="..." value={node[tailNodeIndex].text} onChange={tailNodeChangeHandle}></Input> : <div className="text">{node[tailNodeIndex].text}</div>
            }
            </div>
            <Button type="primary" onClick={EditButtonHandler}>{editStatus ? 'save' : 'edit'}</Button>
            <Button type="primary" danger onClick={deleteHandler}>delete</Button>
        </div>
    )
}

export default TripleItem