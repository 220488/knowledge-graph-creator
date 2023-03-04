import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Circle } from '@styled-icons/boxicons-regular/Circle'
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight'
import { Text } from '@styled-icons/evaicons-solid/Text'
import styled from 'styled-components'
import d3 from 'd3'
// import drag from 'd3-drag'
// import { drag } from "d3-drag"
// import { selection } from "d3-selection"
import { drag, select } from "d3"
import { IGraphData, NodeDataList } from "../types/graph-editor"
import '../styles/svg-element.scoped.scss'
import { nodeMockData } from "../../../utils/hooks/node-data/mockData.ts"
import ToolSelector from './tool-selector.tsx'
import PropertyConfig from './property-config.tsx'
import useNodeData from "../../../utils/hooks/node-data/index.ts"

const GrayCircle = styled(Circle)`color: #333`
const GrayArrow = styled(ArrowRight)`color: #333`
const GrayText = styled(Text)`color: #333`

const GraphEditor = () => {
    const svgRef = useRef<SVGSVGElement>(null)
    // const [nodeData, setNodeData] = useState<NodeDataList>([])
    const {
        nodeData,
        setNodeData
    } = useNodeData()
    // const node = svgRef.current

    useEffect(() => {
        // if(svgRef.current) {
        //     const svg = svgRef.current
        //     setNodeData(nodeMockData)
        // }
        // const svg = select("#svg")
        // svg.selectAll("circle")
        //    .data(nodeData)
        //    .enter()
        //    .insert("circle")
        //    .attr("cx", d => d.x)
        //    .attr("cy", d => d.y)
        //    .attr("r", 36)
        //    .attr("fill", "orange")
        //    .call(dragEvent())
        renderNode()
    }, [nodeData])

    const graphNode = useMemo(() => {
        return nodeData
    }, [nodeData])

    const renderNode = useCallback(() => {
        const svgSelection = select('#svg')
        svgSelection.selectAll('circle')
                    .data(nodeData)
                    .enter()
                    .insert("circle")
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
                    .attr("r", 36)
                    .attr("fill", "orange")
                    .attr('id', getRandomID())
                    .call(dragEvent())
    }, [nodeData])

    function dragProcess (event, d) {        
        d.x = event.x
        d.y = event.y
        select(this).attr('cx', event.x).attr('cy', event.y)
    }

    function dragEvent () {
        return drag()
            .on("start", () => {})
            .on("drag", dragProcess)
            .on("end", () => {})
    }

    /**
     * 随机生成元素id
     */
    const getRandomID = () => {
        return Math.random().toString(36).slice(-6)
    }

    /**
     * 点击工具栏按钮时添加相应元素，
     * 1. 为该元素设置unique id
     * 2. 绑定drag
     * 3. todo： 绑定设置事件
     */
    const CLICK_EVENT = {
        addNode: () => {       
            const temp = nodeData
            nodeData.push(
                {
                    index: 2,
                    x: 200,
                    y: 225,
                    vy: 0.0005811239352359316,
                    vx: 0.0005105059544353252,
                }
            )
            setNodeData(temp)
            renderNode()
        },
        addLine: () => {
            const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            newLine.setAttribute('x1', '100')
            newLine.setAttribute('x2', '200')
            newLine.setAttribute('y1', '100')
            newLine.setAttribute('y2', '100')
            newLine.style.stroke = "#aaa"
            svgRef.current?.append(newLine)
        },
        addText: () => {

        }
    }

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

    const RenderGraph = useMemo(() => {
        const svgSelection = select('#svg')
        svgSelection.selectAll('circle')
                    .data(nodeData)
                    .enter()
                    .insert("circle")
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
                    .attr("r", 36)
                    .attr("fill", "orange")
                    .attr('id', getRandomID())
                    .call(dragEvent())
        return (
            <svg
            id="svg"
            ref={svgRef}
            width={1000}
            height={1000}
            >
            </svg>
        )
    }, [nodeData])
    
                          
    /**
     * 选择元素
     */

    return (
        <div id="svg-area" className="graph-canvas">
            { RenderGraph }
        </div>
            // <div id="svg-area" className="graph-canvas">
            //     <div className="tool-selector-content">
            //         {
            //             toolList.map(item => {
            //                 return (
            //                     <div className="tool-item" onClick={item.clickEvent}>
            //                         {item.toolIcon}
            //                     </div>
            //                 )
            //             })
            //         }
            //     </div>
            //     <svg
            //         id="svg"
            //         ref={svgRef}
            //         width={1000}
            //         height={1000}
            //     >
            //     </svg>
            // </div>
    )
}

export default GraphEditor
