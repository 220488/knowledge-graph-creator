/**
 * 获取节点数据的全局状态
 */

import { useState } from "react"
import { NodeDataList } from "./type"
import { nodeMockData } from "./mockData.ts"

 const useNodeData = () => {
    // todo: 初始化调借口，文件里拿初始数据
     const [nodeData, setNodeData] = useState<NodeDataList>([])

     return {
        nodeData,
        setNodeData,
     }
 }
 
 export default useNodeData