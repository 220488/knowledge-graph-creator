import React, { useEffect, useRef } from "react"
import { Circle } from '@styled-icons/boxicons-regular/Circle'
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight'
import { Text } from '@styled-icons/evaicons-solid/Text'
import styled from 'styled-components'
// import d3 from 'd3'
// import drag from 'd3-drag'
// import { drag } from "d3-drag"
// import { selection } from "d3-selection"
import { drag, select } from "d3"

const GraphCanvas: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null)
    const GrayCircle = styled(Circle)`color: #333`
    const GrayArrow = styled(ArrowRight)`color: #333`
    const GrayText = styled(Text)`color: #333`

    /**
     * d3
     */
    // 选择元素
    // const selector = selection()
    // 拖拽
    // const handler = drag()
    const dragHandler = drag()
                                // .on('start', () => { console.log('start')} )
                                // .on('drag', () => { console.log('drag')} )
                                // .on('end', () => { console.log('end')} )
    const svgSelection = select('#svg')


    useEffect(() => {
        if(svgRef.current) {
            const svg = svgRef.current
        }
    }, [])


    /**
     * 随机生成元素id
     */
    const getRandomID = () => {
        return Math.random().toString(36).slice(-6)
    }

    const nodeListener = () => {
        console.log('listening')
    }

    const CLICK_EVENT = {
        addNode: () => {       
            // const newNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            // newNode.setAttribute('fill', 'orange')
            // newNode.setAttribute('r', '40')
            // newNode.setAttribute('cx', '200')
            // newNode.setAttribute('cy', '200')
            // newNode.id = getRandomID()
            // svgRef.current?.append(newNode)
            // // selector(newNode).call(dragEvent)
            // const newElement = selector.select(`#id${newNode.id}`)

            const circleNode = svgSelection
                            .append('circle')
                            .attr('r', 40)
                            .attr('cx', '100')
                            .attr('cy', '100')
                            .attr('fill', 'orange')
                            .attr('id', getRandomID())
            const dragEvent = drag().on("mousedown", () => {console.log('mousedown')})
            // circleNode.call(dragEvent)
            // svgSelection.call()
            return circleNode
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
    

    /**
     * 拖拽事件
     */
     const startProcess = () => {
        console.log('开始拖拽');
    }

    const dragProcess = () => {
        console.log("ing");
    }

    const endProcess = () => {
        console.log("结束")
    }

    // const dragEvent = handler.on("start", startProcess)
    //                          .on("drag", dragProcess)
    //                          .on("end", endProcess)
                             
    /**
     * 选择元素
     */

    return (
        <div>
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
        <svg
            id="svg"
            width={1100}
            height={1000}
            ref={svgRef}
        >
        </svg>
        </div>
    )
}

export default GraphCanvas
