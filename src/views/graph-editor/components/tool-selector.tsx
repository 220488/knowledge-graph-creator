import React from "react"
import { Circle } from '@styled-icons/boxicons-regular/Circle'
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight'
import { Text } from '@styled-icons/evaicons-solid/Text'
import styled from 'styled-components'
import '../styles/tool-selector.scoped.scss'
import useNodeData from "../../../utils/hooks/node-data/index.ts"
import { useDispatch } from "react-redux"
import { addNode } from "../../../redux/graphNodeData"
import { addLine } from "../../../redux/graphLinkData"

const GrayCircle = styled(Circle)`color: #333`
const GrayArrow = styled(ArrowRight)`color: #333`
const GrayText = styled(Text)`color: #333`

const ToolSelector: React.FC = () => {
    const {
        nodeData,
        setNodeData
    } = useNodeData()

    const dispatch = useDispatch()

    /**
     * 点击icon触发的事件，这里为添加元素到画布上
     */
    const CLICK_EVENT = {
        addNode: () => {
            dispatch(
                addNode({})
            )
        },
        addLine: () => {
            dispatch(
                addLine({})
            )
        },
        addText: () => {

        }
    }

    /**
     * 工具栏的工具列表
     */
    const toolList = [
        {
            toolName: 'node',
            toolIcon: <GrayCircle size="30"/>,
            clickEvent: CLICK_EVENT.addNode,
        },
        {
            toolName: 'line',
            toolIcon: <GrayArrow size="30"/>,
            clickEvent: CLICK_EVENT.addLine,
        },
        {
            toolName: 'text',
            toolIcon: <GrayText size="30"/>,
            clickEvent: CLICK_EVENT.addText,
        },
    ]
    return (
        <div className="tool-selector-content">
           {
            toolList.map(item => {
                return (
                    <div className="tool-item" onClick={item.clickEvent}>
                        {item.toolIcon}
                    </div>
                )
            })
           }
        </div>
    )
}

export default ToolSelector