export type GraphCanvas = {
    
}

export type NodeDataList =  Array<NodeDataItem>

export type NodeDataItem = {
    index: number,
    x: number,
    y: number,
    vy: number,
    vx: number,
}

export type LineDataList =  Array<LineDataItem>

export type LineDataItem = {
    index: number,
    x: number,
    y: number,
    vy: number,
    vx: number,
}

export type IGraphData = {
    node: NodeDataList,
    line: LineDataList,
}