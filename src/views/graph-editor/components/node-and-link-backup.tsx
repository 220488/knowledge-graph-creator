import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { drag, select, forceSimulation } from "d3"
import '../styles/svg-element.scoped.scss'
import { useDispatch, useSelector } from "react-redux"
import { setNodeNewLocation } from "../../../redux/graphNodeData"
import { addLine } from "../../../redux/graphLinkData"

const GraphEditor = () => {
    const svgRef = useRef<SVGSVGElement>(null)

    const dispatch = useDispatch()
    const node = useSelector((state) => state.node)
    const link = useSelector((state) => state.link)
    // console.log('nodedata', node);
    console.log('link', link);
    const [ linkSource, setLinkSource] = useState({})

    const svgSelection = select('#svg')
    // const simulation = forceSimulation()

    useEffect(() => {        
        RenderLink(link)
        RenderNode(node)
    }, [node, link])

    useEffect(() => {
        // 等待下一次点击并且获得值
        svgSelection.selectAll('circle').on('click', setLinkDesInfo)
    }, [linkSource])

    function setLinkDesInfo (event, d) {
        select(this).attr('stroke', '#9e6faf').attr('stroke-width', 3)
        const linkInfo = Object.assign(linkSource, {
            des: d.id,
            x2: d.x,
            y2: d.y,
        })
        dispatch(
            addLine(linkInfo)
        )
        svgSelection.selectAll('circle').on('click', null)
    }

    function setLinkSourceInfo (event, d) {
        select(this).attr('stroke', '#777').attr('stroke-width', 3)        
        setLinkSource({
            source: d.id,
            x1: d.x,
            y1: d.y,
        })
    }

    const RenderNode = (node) => {
        svgSelection.select('#node')
                    .selectAll('circle')
                    .data(node)
                    .enter()
                    .insert("circle")
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
                    .attr("r", 36)
                    .attr("fill", "orange")
                    .attr('id', d => d.id)
                    .call(dragEvent())
                    .on('dblclick', setLinkSourceInfo)
                    .raise()
    }

    const RenderLink = (link) => {
        svgSelection.select('#link')
                    .selectAll('line')
                    .data(link)
                    .enter()
                    .insert("line")
                    .attr("x1", d => d.x1)
                    .attr("x2", d => d.x2)
                    .attr("y1", d => d.y1)
                    .attr("y2", d => d.y2)
                    .attr('stroke', '#333')
                    .attr('stroke-width', 2)
                    .attr('id', d => d.id)
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
            // drag().on("start", null)
        }
    }

    function dragEvent () {
        return drag()
            .on("start", dragStart)
    }

    /**
     * 随机生成元素id
     */
    const getRandomID = () => {
        return Math.random().toString(36).slice(-6)
    }
                          
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
                <g id="link"></g>
                <g id="node"></g>
            </svg>
        </div>
    )
}

export default GraphEditor
