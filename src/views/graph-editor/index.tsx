import React from "react"
import { MenuOutlined } from "@ant-design/icons"
import './styles/graph-editor.scoped.scss'
import { Button } from "antd"
import GraphEditor from "./components/graph-canvas.tsx"
import ToolSelector from "./components/tool-selector.tsx"
import PropertyConfig from "./components/property-config.tsx"
import useNodeData from "../../utils/hooks/node-data/index.ts"

const GraphEditorPage = () => {
    const {
        nodeData,
        setNodeData
    } = useNodeData()
    
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
                <div className="graph-canvas">
                    <GraphEditor node={nodeData}/>
                </div>
                <div className="property-config">
                    <div className="config-title">设置</div>
                    <PropertyConfig elementType={0}/>
                </div>
            </div>
        </div>
    )
}

export default GraphEditorPage