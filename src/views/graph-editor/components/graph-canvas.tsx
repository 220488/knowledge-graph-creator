import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { drag, select, forceSimulation, forceLink } from "d3"
import '../styles/svg-element.scoped.scss'
import { useDispatch, useSelector } from "react-redux"
import { addNodeRelationLink, setNodeNewLocation } from "../../../redux/graphNodeData"
import { addLine, setLineNewLocation } from "../../../redux/graphLinkData"
import { GRAPH_STATE_ENUM } from "../../../redux/types/index.ts"
import { Update } from "styled-icons/material"
import { setEditElement } from "../../../redux/editElementData"
import { getUUID } from "../../../utils/uuid-generator"

const GraphEditor = () => {
    const svgRef = useRef<SVGSVGElement>(null)

    const dispatch = useDispatch()
    const node = useSelector((state) => state.node)
    const link = useSelector((state) => state.link)
    const currentState = useSelector((state) => state.graphState)
    console.log('nodedata', node);
    console.log('linkdata', link);
    
    const [ linkSource, setLinkSource] = useState({})
    

    const svgSelection = select('#svg')

    useEffect(() => {
        RenderNode(node)
        RenderLink(link)
    }, [node, link])

    useEffect(() => {
        // 等待下一次点击并且获得值
        // svgSelection.selectAll('circle').on('click', setLinkDesInfo)
        svgSelection.select('#node').selectAll('g').on('click', setLinkDesInfo)
    }, [linkSource])

    useEffect(() => {
        if (currentState === GRAPH_STATE_ENUM.ADD_NODE) {
            svgSelection.select("#node").selectAll("g").on('click', null).on('dblclick', null)
            svgSelection.select("#link").selectAll("g").on('click', null)
        } else if (currentState === GRAPH_STATE_ENUM.ADD_LINE) {
            svgSelection.select("#node").selectAll("g").on('click', null).on('dblclick', setLinkSourceInfo)
            svgSelection.select("#link").selectAll("g").on('click', null)
        } else if (currentState === GRAPH_STATE_ENUM.EDIT) {
            svgSelection.select("#node").selectAll("g").on('click', setNodeConfigListener).on('dblclick', null)
            svgSelection.select("#link").selectAll("g").on('click', setLinkConfigListener)
        }
    }, [currentState])

    function setNodeConfigListener (event, d) {
        dispatch(
            setEditElement({
                id: d.id,
                type: 'node'
            })
        )    
    }

    function setLinkConfigListener (event, d) {
        dispatch(
            setEditElement({
                id: d.id,
                type: 'link'
            })
        )    
    }

    async function setLinkDesInfo (event, d) {
        select(this).selectChild("circle").attr('stroke', '#9e6faf').attr('stroke-width', 3)
        const linkId = getUUID()
        const linkInfo = Object.assign(linkSource, {
            des: d.id,
            x2: d.x,
            y2: d.y,
            id: linkId,
        })
        await dispatch(
            addLine(linkInfo)
        )
        // 关联node里也要记录，还差个参数，link的id
        dispatch(
            addNodeRelationLink({
                linkId: linkId,
                nodeId: [linkInfo.source, linkInfo.des]
            })
        )
        svgSelection.selectAll('g').on('click', null)
    }

    function setLinkSourceInfo (event, d) {        
        select(this).selectChild("circle").attr('stroke', '#777').attr('stroke-width', 3)        
        setLinkSource({
            source: d.id,
            x1: d.x,
            y1: d.y,
        })
        
        // if (currentState === GRAPH_STATE_ENUM.ADD_LINE) {
        //     // adding-line模式添加线
        //     console.log("adding");
            
        //     select(this).selectChild("circle").attr('stroke', '#777').attr('stroke-width', 3)        
        //     setLinkSource({
        //         source: d.id,
        //         x1: d.x,
        //         y1: d.y,
        //     })
        // } else if (currentState === GRAPH_STATE_ENUM.EDIT) {
        //     // 编辑模式打开属性设置框
        // }
    }

    const RenderNode = (node) => {
        svgSelection.select('#node')
                    .selectAll('g')
                    .data(node)
                    .attr('id', d => d.id)
                    .join(
                        function (enter) {
                            const enterSelection = enter.insert("g")
                            enterSelection.insert("circle").attr("cx", d => d.x).attr("cy", d => d.y).attr("r", 36).attr("fill", "orange")
                            enterSelection.insert("text").text(d => d.text).attr('fill', 'black').attr('x', d => d.x).attr('y', d => d.y)
                            // enter.selectAll("g").call(dragEvent()).on('dblclick', setLinkSourceInfo, {}).on('click', setNodeConfigListener)
                            return enter.selectAll("g")
                        },
                        function (update) {
                            update.selectChild("text").text(d => d.text).attr('fill', 'black').attr('x', d => d.x).attr('y', d => d.y)
                            return update.selectAll("g")
                        },
                        function (exit) {
                            return exit.remove()
                        }
                        // enter => enter.insert("g").insert("circle"),
                        // update => update.selectChild("circle"),
                        // exit => exit.remove(),
                    )
                    .call(dragEvent())
                    .on('dblclick', setLinkSourceInfo)
    }

    const RenderLink = (link) => {
        // console.log('update-link', link);
        svgSelection.select('#link')
                    .selectAll('g')
                    .data(link)
                    .join(
                        function (enter) {
                            const enterSelection = enter.insert("g")
                            enterSelection.insert("line")
                                          .attr("x1", function (d) { return d.x1 })
                                          .attr("x2", function (d) { return d.x2 })
                                          .attr("y1", function (d) { return d.y1 })
                                          .attr("y2", function (d) { return d.y2 })
                                          .attr('stroke', '#333')
                                          .attr('stroke-width', 2)
                            enterSelection.insert("text").text(d => d.text).attr('fill', 'black')
                                          .attr("x", function (d) {
                                            return (d.x1 + d.x2) / 2
                                          })
                                          .attr("y", function (d) {
                                            return (d.y1 + d.y2) / 2
                                          })
                            return enter.selectAll("g")
                        },
                        function (update) {
                            // console.log('update', update.selectChild("line"))
                            update.selectChild("line")
                                  .attr("x1", function (d) { return d.x1 })
                                  .attr("x2", function (d) { return d.x2 })
                                  .attr("y1", function (d) { return d.y1 })
                                  .attr("y2", function (d) { return d.y2 })
                                  .attr('stroke', '#333')
                                  .attr('stroke-width', 2)
                            update.selectChild("text").text(d => d.text).attr('fill', 'black')
                                  .attr('x', function (d) {
                                    return (d.x1 + d.x2) / 2
                                  })
                                  .attr('y', function (d) {
                                    return (d.y1 + d.y2) / 2
                                  })
                            return update.selectAll("g")
                        },
                        exit => exit.remove()
                    )
    }

    function dragStart (event, d) {
        select(this).selectChild("circle").attr('stroke', 'black')
        event.on('drag', dragProcess).on('end', dragEnd)

        function dragProcess (event, d) {            
            d = {
                id: d.id,
                x: event.x,
                y: event.y,
            }
            select(this).selectChild("circle").attr('cx', d.x = event.x).attr('cy', d.y= event.y)
            select(this).selectChild("text").attr('x', d.x = event.x).attr('y', d.y= event.y)
        }

        // 拖拽结束，把新的位置状态传递回去
        function dragEnd (event, d) {
            select(this).selectChild("circle").attr('stroke', 'none')
            d = {
                id: d.id,
                x: event.x,
                y: event.y,
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
                <g id="link"></g>
                <g id="node"></g>
            </svg>
        </div>
    )
}

export default GraphEditor
