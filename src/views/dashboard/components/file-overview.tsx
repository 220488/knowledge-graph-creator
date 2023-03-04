import React from "react"
import { Input } from "antd"
import { PlusCircleFilled } from "@ant-design/icons"
import '../styles/fileview.scoped.scss'
import { AddNewToolName } from "../types/dashboard.ts"
import AddNewTool from "./add-new-tool.tsx"
import FileDisplay from "./file-display.tsx"

const FileView = () => {
    /**
     * 创建工具
     */
    const AddNewToolList = [
        {
            toolName: '创建文件夹',
            toolIndex: AddNewToolName.NEW_FOLDER,
            toolComment: '文件归类',
            toolIcon: '',
            onClickTarget: '',
        },
        {
            toolName: '创建文件',
            toolIndex: AddNewToolName.NEW_FILE,
            toolComment: '新建模式层',
            toolIcon: '',
            onClickTarget: '',
        },
        {
            toolName: '导入文件',
            toolIndex: AddNewToolName.IMPORT_FILE,
            toolComment: '导入模式层',
            toolIcon: '',
            onClickTarget: '',
        }
    ]


    return (
        <div className="file-view">
            <div className="top-tool-container">
                <div className="add-new-area">
                    <PlusCircleFilled style={{ fontSize: '32px' }}/>
                </div>
                <div className="filter-area">
                    <Input.Group compact>
                        <Input.Search allowClear style={{ width: '100%' }} placeholder="搜索文件" />
                    </Input.Group>
                </div>
            </div>
            <div className="file-overview">
                <div className="tool-area">
                {AddNewToolList.map((item) => {
                    return (
                        <AddNewTool
                            name={item.toolName}
                            index={item.toolIndex}
                            comment={item.toolComment}
                            icon={item.toolIcon}
                            target={item.onClickTarget}
                        />
                    )
                })}
                </div>
                <div className="file-display">
                    <FileDisplay />
                </div>
            </div>
        </div>
    )
}

export default FileView