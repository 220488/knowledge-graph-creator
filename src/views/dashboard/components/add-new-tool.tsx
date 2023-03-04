import React from "react"
import { IAddNewToolProps } from "../types/dashboard"
import { PlusOutlined, FolderAddTwoTone } from "@ant-design/icons"
import '../styles/addtool.scoped.scss'


const AddNewTool: React.FC<IAddNewToolProps> = (props: IAddNewToolProps) => {
    const {
        name,
        index,
        comment,
        icon,
        target,
    } = props
    
    return (
        <div className="add-tool-container">
            <FolderAddTwoTone className="icon-left"/>
            <div className="text">
                <div style={{ fontWeight: 900, marginBottom: '3px' }}>{name}</div>
                <div style={{ fontWeight: 400, marginTop: '3px' }}>{comment}</div>
            </div>
            <PlusOutlined className="icon-right"/>
        </div>
    )
}

export default AddNewTool