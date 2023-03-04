import React, { useEffect, useRef } from "react"
import { Circle } from '@styled-icons/boxicons-regular/Circle'
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight'
import { Text } from '@styled-icons/evaicons-solid/Text'
import styled from 'styled-components'
// import d3 from 'd3'
// import drag from 'd3-drag'
// import { drag } from "d3-drag"
// import { selection } from "d3-selection"
import { drag, select, range, schemeCategory10, D3DragEvent } from "d3"

const GraphCanvas: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null)
    const GrayCircle = styled(Circle)`color: #333`
    const GrayArrow = styled(ArrowRight)`color: #333`
    const GrayText = styled(Text)`color: #333`

    /**
     * d3
     */
    const svgSelection = select('#svg')


    useEffect(() => {
        if(svgRef.current) {
            const svg = svgRef.current
        }
        // svgSelection.attr('viewBox', [0, 0, 1000, 1000]).attr('stroke-width', 2)

        // const clicked = (event, d) => {
        //     if (event.defaultPrevented) return
        //     select(`circle`).transition().attr('fill', 'black')
        //                                     .attr('r', '60')
        //                                     .transition()
        //                                     .attr('r', '30')
        //                                     .attr('fill', schemeCategory10[d.index % 10])
        // }
        svgSelection
        .data(circles)
        // .join('circle')
        .append('circle')
        .attr('id', 'test')
        .attr('cx', 50)
        .attr('cy', 50)
        .attr('r', 30)
        .attr('fill', 'orange')
        // .attr('fill', d => schemeCategory10[d.index % 10])
        .call(dragEvent)
    }, [])

    console.log(select('#test'), 'select');
    

    const circles = range(20).map(i => ({
        x: Math.random() * (1000 - 30 * 2) + 30,
        y: Math.random() * (1000 - 30 * 2) + 30,
        index: i
    }))

    const dragEvent = () => {
    console.log('drag event');
        

    /**
     * 拖拽事件
     */
    function startProcess () {
        console.log('开始拖拽');

        // select('#test').raise().attr('fill', 'black')
    }

    function dragProcess (this, event, d) {
        console.log(this);
        const {
            x, y
        } = event
        select(this).attr('cx', x).attr('cy', y)
        // console.log("ing");
        // select('#test').attr('cx', d.x = event.x).attr('cy', d.y = event.y)
    }

    function endProcess () {
        console.log("结束")
    }

    return drag()
        .on("start", startProcess)
        .on("drag", dragProcess)
        .on("end", endProcess)
    }

                // const circleNode = svgSelection
                //             .append('circle')
                //             .attr('r', 40)
                //             .attr('cx', '100')
                //             .attr('cy', '100')
                //             .attr('fill', 'orange')


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

            // const circleNode = svgSelection
            //                 .append('circle')
            //                 .attr('r', 40)
            //                 .attr('cx', '100')
            //                 .attr('cy', '100')
            //                 .attr('fill', 'orange')
            //                 .attr('id', getRandomID())
            // const dragEvent = drag().on("mousedown", () => {console.log('mousedown')})
            // circleNode.call(dragEvent)
            // svgSelection.call()
            // return circleNode

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
            ref={svgRef}
            width={500}
            height={500}
        >
        </svg>
        </div>
    )
}

export default GraphCanvas
