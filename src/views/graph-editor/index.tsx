import React, { useCallback, useMemo } from "react"
import { MenuOutlined } from "@ant-design/icons"
import './styles/graph-editor.scoped.scss'
import { Button } from "antd"
import GraphEditor from "./components/graph-canvas.tsx"
import ToolSelector from "./components/tool-selector.tsx"
import PropertyConfig from "./components/property-config.tsx"
import useNodeData from "../../utils/hooks/node-data/index.ts"
import { useSelector } from "react-redux"
import { GRAPH_STATE_ENUM } from "../../redux/types/index.ts"
import { getUUID } from "../../utils/uuid-generator"
import { ITripleLabelItem } from "./types/triple-item"

const GraphEditorPage = () => {
    const {
        nodeData,
        setNodeData
    } = useNodeData()

    const currentState = useSelector((state) => state.graphState)
    const node = useSelector(state => state.node)
    const link = useSelector(state => state.link)

    const onClickHandler = useCallback(() => {

    }, [])

    const getNodeText = (nodeId) => {
        const index = node.findIndex(nodeItem => nodeItem.id === nodeId)
        return index !== -1 ? node[index].text : ""
    }

    const fileDataObject = useMemo(() => {
        const tripleLabelList: ITripleLabelItem[] = []
        link.map(linkItem => {
            const tripleItem = {
                ThreeHeadLabel: {
                    entityLabelId: linkItem.source,
                    entityLabel: getNodeText(linkItem.source),
                },
                ThreeRelationLabel: {
                    relationLabel: linkItem.text,
                    relationLabelId: linkItem.id,
                },
                ThreeTailLabel: {
                    entityLabelId: linkItem.des,
                    entityLabel: getNodeText(linkItem.des),
                } 
            }
            tripleLabelList.push(tripleItem)
        })

        return {
            TripleLabelItemId: getUUID(),
            TripleLabelList: tripleLabelList,
        }
    }, [link])
    
    return (
        <div className="graph-editor-page">
            <div className="top-row">
                <div className="info">
                    <MenuOutlined className="icon" />
                    <div className="path">个人中心 / 流进中国的河流</div>
                    <div className="zoom">70%</div>
                    <div className="blank"></div>
                </div>
                <Button type="primary" className="button" onClick={onClickHandler}>
                    <a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(fileDataObject))}`}
                        download={`test.json`}
                    >导出</a>
                </Button>
            </div>
            <div className="edit-area">
                <div className="tool-selector">
                    <ToolSelector/>
                </div>
                <div className="graph-canvas" style={currentState === GRAPH_STATE_ENUM.EDIT ? {} : { width: '100%' }}>
                    <GraphEditor node={nodeData}/>
                </div>
                {
                    currentState === GRAPH_STATE_ENUM.EDIT && (
                    <div className="property-config">
                        <div className="config-title">设置</div>
                        <PropertyConfig elementType={0}/>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default GraphEditorPage