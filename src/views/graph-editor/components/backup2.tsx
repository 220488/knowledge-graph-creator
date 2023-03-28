import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { drag, select, forceSimulation, forceLink } from "d3"
import '../styles/svg-element.scoped.scss'
import { useDispatch, useSelector } from "react-redux"
import { setNodeNewLocation } from "../../../redux/graphNodeData"
import { addLine, setLineNewLocation } from "../../../redux/graphLinkData"
import { GRAPH_STATE_ENUM } from "../../../redux/types/index.ts"

const GraphEditor = () => {
    const svgRef = useRef<SVGSVGElement>(null)

    const dispatch = useDispatch()
    const node = useSelector((state) => state.node)
    const link = useSelector((state) => state.link)
    const currentState = useSelector((state) => state.graphState)
    // console.log('currentStateeee', currentState);
    
    console.log('nodedata', node);
    // console.log('link', link);
    const [ linkSource, setLinkSource] = useState({})

    const svgSelection = select('#svg')

    useEffect(() => {
        RenderNode(node)
        RenderLink(link)
    }, [node, link])

    useEffect(() => {
        // 等待下一次点击并且获得值
        svgSelection.selectAll('use').on('click', setLinkDesInfo)
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
        // trouble maker, 拖动一下后currentState才改变
        console.log("currentState", currentState);
        if (currentState === GRAPH_STATE_ENUM.ADD_LINE) {
            // adding-line模式添加线            
            select(this).attr('stroke', '#777').attr('stroke-width', 3)        
            setLinkSource({
                source: d.id,
                x1: d.x,
                y1: d.y,
            })
        } else if (currentState === GRAPH_STATE_ENUM.EDIT) {
            // 编辑模式打开属性设置框
        }
    }

    const RenderNode = (node) => {
        console.log('update=node', node);
        
        svgSelection.select('#node')
                    .selectAll("g")
                    .data(node)
                    .join(
                        enter => enter.insert("g")
                                      .attr("id", d => d.id)
                                      .insert("circle")
                                      .attr("r", 36)
                                      .attr("fill", "orange"),
                        update => update.selectAll("g")
                                        .selectAll("circle"),
                        exit => exit.remove()
                    )
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
                    .call(dragEvent())
                    .on('dblclick', setLinkSourceInfo)
                    // .insert("text")
                    // .text("d => d.text")
    }

    const RenderLink = (link) => {
        console.log('update-link', link);
        svgSelection.select('#link')
                    .selectAll('line')
                    .data(link)
                    .join(
                        enter => enter.insert("line"),
                        update => update,
                        exit => exit.remove()
                    )
                    .attr("x1", function (d) {
                        return d.x1 
                    })
                    .attr("x2", function (d) {
                        return d.x2
                    })
                    .attr("y1", function (d) {
                        return d.y1
                    })
                    .attr("y2", function (d) {
                        return d.y2
                    })
                    .attr('stroke', '#333')
                    .attr('stroke-width', 2)
    }

    function dragStart (event, d) {
        console.log("this", this);
        console.log("start-d", d);
        
        
        select(this).attr('stroke', 'black')
        event.on('drag', dragProcess).on('end', dragEnd)

        function dragProcess (event, d) {            
            d = {
                id: d.id,
                x: event.x,
                y: event.y,
                text: d.text,
            }
            select(this).attr('cx', d.x = event.x).attr('cy', d.y= event.y)
            console.log("d-ing", d);
        }

        // 拖拽结束，把新的位置状态传递回去
        function dragEnd (event, d) {
            console.log("d-end", d);
            select(this).attr('stroke', 'none')
            d = {
                id: d.id,
                x: event.x,
                y: event.y,
                text: d.text,
            }
            dispatch(
                setNodeNewLocation(d)
            )

            dispatch(
                setLineNewLocation(d)
            )
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
                {/* <circle cx="50" cy="50" r="36" fill="orange"></circle> */}
                <g id="link"></g>
                <g id="node">
                    {/* <g id="0" x="200" y="225">
                        <circle r="36" fill="orange"></circle>
                    </g> */}
                </g>
            </svg>
        </div>
    )
}

export default GraphEditor
