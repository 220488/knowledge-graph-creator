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
import { useDispatch, useSelector } from "react-redux"
import { setNodeNewLocation } from "../../../redux/graphNodeData"

const GrayCircle = styled(Circle)`color: #333`
const GrayArrow = styled(ArrowRight)`color: #333`
const GrayText = styled(Text)`color: #333`

const GraphEditor = () => {
    const svgRef = useRef<SVGSVGElement>(null)

    const dispatch = useDispatch()
    const node = useSelector((state) => state.node)
    const link = useSelector((state) => state.link)
    console.log('nodedata', node);
    console.log('link', link);
    

    const svgSelection = select('#svg')

    useEffect(() => {
        RenderNode(node)
        RenderLink(link)
    }, [node, link])

    const RenderNode = (node) => {
        svgSelection.selectAll('circle')
                    .data(node)
                    .enter()
                    .insert("circle")
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
                    .attr("r", 36)
                    .attr("fill", "orange")
                    .attr('id', getRandomID())
                    .call(dragEvent())
    }

    const RenderLink = (link) => {
        svgSelection.selectAll('circle')
                    .data(link)
                    .enter()
                    .insert("line")
                    .attr("x1", d => d.x1)
                    .attr("x2", d => d.x2)
                    .attr("y1", d => d.y1)
                    .attr("y1", d => d.y1)
                    .attr('stroke', '#333')
                    .attr('stroke-width', 2)
                    .attr('id', getRandomID())
    }

    function dragStart (event, d) {
        select(this).attr('stroke', 'black')
        event.on('drag', dragProcess).on('end', dragEnd)

        function dragProcess (event, d) {
            d = {
                id: d.id,
                x: event.x,
                y: event.y
            }
            select(this).attr('cx', d.x = event.x).attr('cy', d.y= event.y)
        }

        // 拖拽结束，把新的位置dispatch回去
        function dragEnd (event, d) {
            select(this).attr('stroke', 'none')
            d = {
                id: d.id,
                x: event.x,
                y: event.y
            }
            dispatch(
                setNodeNewLocation(d)
            )
        }
    }




    function dragEvent () {
        console.log('drag');
        
        return drag()
            .on("start", dragStart)
    }

    /**
     * 随机生成元素id
     */
    const getRandomID = () => {
        return Math.random().toString(36).slice(-6)
    }

    const RenderGraph = useCallback(() => {
        svgSelection.selectAll('circle')
                    .data(node)
                    .enter()
                    .insert("circle")
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
                    .attr("r", 36)
                    .attr("fill", "orange")
                    .attr('id', getRandomID())
                    .call(dragEvent())
    }, [node])
                          
    /**
     * 选择元素
     */

    return (
        <div id="svg-area" className="graph-canvas">
            
            <svg
            id="svg"
            ref={svgRef}
            width={1000}
            height={1000}
            >
            </svg>
        </div>
    )
}

export default GraphEditor
