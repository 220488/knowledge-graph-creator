import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ELEMENT_TYPE, IPropertyConfigProps } from "../types/property-config.ts"
import NodeItem from "./node-item.tsx"
import TripleItem from "./triple-item.tsx"

const PropertyConfig: React.FC<IPropertyConfigProps> = (props) => {
    // const element = useSelector((state) => state.editElement)
    const node = useSelector((state) => state.node)
    const link = useSelector((state) => state.link)
    console.log('link', link);
    

    return (
        <div className="config-container">
            <div className="triple-table">
                {
                    link.map((item) => {
                        return (
                            <TripleItem headNodeId={item.source} relationLinkId={item.id} tailNodeId={item.des} />
                        )
                    })
                }
            </div>
            <div className="divider"></div>
            <div className="node-pool">
                {/* node池 */}
                {
                    node.map((item) => {
                        return (
                            <NodeItem nodeInfo={item} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PropertyConfig