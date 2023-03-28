import React, { useCallback, useState } from "react"
import { Circle } from '@styled-icons/boxicons-regular/Circle'
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight'
import { Text } from '@styled-icons/evaicons-solid/Text'
import styled from 'styled-components'
import '../styles/tool-selector.scoped.scss'
import { useDispatch } from "react-redux"
import { addNode } from "../../../redux/graphNodeData"
import { drag, select } from "d3"
import { setGraphState } from "../../../redux/graphState"
import { GRAPH_STATE_ENUM } from "../../../redux/types/index.ts"
import { setEditElement } from "../../../redux/editElementData"

const GrayCircle = styled(Circle)`color: #333`
const GrayArrow = styled(ArrowRight)`color: #333`
const GrayText = styled(Text)`color: #333`

const ToolSelector: React.FC = () => {
    const dispatch = useDispatch()
    const svgSelection = select('#svg')
    const [ selected, setSelected ] = useState(GRAPH_STATE_ENUM.ADD_NODE)

    function setNodeConfigListener (event, d) {
        console.log('listen node');
          
        dispatch(
            setEditElement({
                id: d.id,
                type: 'node'
            })
        )    
    }

    function setLinkConfigListener (event, d) {
        console.log('listen link');
        dispatch(
            setEditElement({
                id: d.id,
                type: 'link'
            })
        )    
    }

    /**
     * 点击icon触发的事件，这里为添加元素到画布上
     */
    const CLICK_EVENT = {
        addNode: () => {
            setSelected(GRAPH_STATE_ENUM.ADD_NODE)
            dispatch(
                setGraphState({
                    current: GRAPH_STATE_ENUM.ADD_NODE
                }),
            )
            dispatch(
                addNode({})
            )
        },
        addLine: () => {
            setSelected(GRAPH_STATE_ENUM.ADD_LINE)
            // 设置状态为adding-line
            dispatch(
                setGraphState({
                    current: GRAPH_STATE_ENUM.ADD_LINE
                }),
            )
        },
        addEdit: () => {
            setSelected(GRAPH_STATE_ENUM.EDIT)
            // 设置状态为edit
            dispatch(
                setGraphState({
                    current: GRAPH_STATE_ENUM.EDIT
                }),
            )
            svgSelection.select("#node").selectAll("g").on('dblclick', null).on('click', setNodeConfigListener)
            svgSelection.select("#link").selectAll("g").on('click', setLinkConfigListener)
        }
    }

    /**
     * 工具栏的工具列表
     */
    const toolList = [
        {
            index: GRAPH_STATE_ENUM.ADD_NODE,
            toolName: 'node',
            toolIcon: <GrayCircle size="30"/>,
            clickEvent: CLICK_EVENT.addNode,
        },
        {
            index: GRAPH_STATE_ENUM.ADD_LINE,
            toolName: 'line',
            toolIcon: <GrayArrow size="30"/>,
            clickEvent: CLICK_EVENT.addLine,
        },
        {
            index: GRAPH_STATE_ENUM.EDIT,
            toolName: 'text',
            toolIcon: <GrayText size="30"/>,
            clickEvent: CLICK_EVENT.addEdit,
        },
    ]
    return (
        <div className="tool-selector-content">
           {
            toolList.map(item => {
                return (
                    <div className={item.index === selected ? `tool-item-clicked` : `tool-item`} onClick={item.clickEvent}>
                        {item.toolIcon}
                    </div>
                )
            })
           }
        </div>
    )
}

export default ToolSelector