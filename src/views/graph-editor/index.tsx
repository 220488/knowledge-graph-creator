import React from "react"
import { MenuOutlined } from "@ant-design/icons"
import './styles/graph-editor.scoped.scss'
import { Button } from "antd"
import GraphEditor from "./components/graph-canvas.tsx"
import ToolSelector from "./components/tool-selector.tsx"
import PropertyConfig from "./components/property-config.tsx"
import useNodeData from "../../utils/hooks/node-data/index.ts"
import { useSelector } from "react-redux"
import { GRAPH_STATE_ENUM } from "../../redux/types/index.ts"

const GraphEditorPage = () => {
    const {
        nodeData,
        setNodeData
    } = useNodeData()

    const currentState = useSelector((state) => state.graphState)
    
    return (
        <div className="graph-editor-page">
            <div className="top-row">
                <div className="info">
                    <MenuOutlined className="icon" />
                    <div className="path">个人中心 / graph</div>
                    <div className="zoom">70%</div>
                    <div className="blank"></div>
                </div>
                <Button type="primary" className="button">保存</Button>
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