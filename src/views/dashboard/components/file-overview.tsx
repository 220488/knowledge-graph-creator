import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Input, Modal, Select } from "antd"
import { PlusCircleFilled } from "@ant-design/icons"
import '../styles/fileview.scoped.scss'
import { AddNewToolName } from "../types/dashboard.ts"
import AddNewTool from "./add-new-tool.tsx"
import FileDisplay from "./file-display.tsx"
import { useDispatch, useSelector } from "react-redux"
import { addFolder } from "../../../redux/folderData"
import { addFile } from "../../../redux/fileData"

const FileView = () => {
    const dispatch = useDispatch()
    const folderData = useSelector((state) => state.folder)
    const fileData = useSelector((state) => state.file)
    const [folderVisible, setFolderVisible] = useState<boolean>(false)
    const [fileVisible, setFileVisible] = useState<boolean>(false)
    const [folderName, setFolderName] = useState<string>('')
    const [fileName, setFileName] = useState<string>('')
    const [keyValue, setKeyValue] = useState<number>(0)
    const [selectOption, setSelectOption] = useState<string>('')

    interface IFolderOption {
        label: string,
        value: string
    }

    const folderOptions = useMemo(() => {
        const options: IFolderOption[] = []
        folderData.forEach(element => {
            options.push({
                label: element.label,
                value: element.key
            })
        });
        return options
    }, [folderData])

    /**
     * 创建文件夹
     */
    const addNewFolder = useCallback(() => {
        setFolderVisible(true)
    }, [])

    /**
     * 创建文件
     */
    const addNewFile = useCallback(() => {
        setFileVisible(true)
    }, [])
    
    /**
     * 导入文件
     */
    const importFile = useCallback(() => {}, [])
    
    /**
     * 创建工具
     */
    const AddNewToolList = [
        {
            toolName: '创建文件夹',
            toolIndex: AddNewToolName.NEW_FOLDER,
            toolComment: '文件归类',
            toolIcon: '',
            onClickTarget: addNewFolder,
        },
        {
            toolName: '创建文件',
            toolIndex: AddNewToolName.NEW_FILE,
            toolComment: '新建模式层',
            toolIcon: '',
            onClickTarget: addNewFile,
        },
        {
            toolName: '导入文件',
            toolIndex: AddNewToolName.IMPORT_FILE,
            toolComment: '导入模式层',
            toolIcon: '',
            onClickTarget: importFile,
        }
    ]

    const onChangeHandler = useCallback((e) => {
        setFolderName(e.target.value)
    }, [])

    /**
     * 点击ok按钮
     */
    const onOkFolderHandler = useCallback(() => {
        setKeyValue(prev => prev + 1)
        dispatch(
            addFolder({
                label: folderName,
                key: keyValue,
                children: null,
                type: 'group'
            })
        )
        setFolderVisible(false)
    }, [folderName, keyValue])

    /**
     * 点击cancel按钮
     */
    const onCancelFolderHandler = useCallback(() => {
        setFolderVisible(false)
    }, [])

    /**
     * 点击ok按钮
     */
    const onOkFileHandler = useCallback(() => {
        dispatch(
            addFile({
                title: fileName,
                folder: selectOption
            })
        )
        setFileVisible(false)
    }, [fileName, selectOption])

    /**
     * 点击cancel按钮
     */
    const onCancelFileHandler = useCallback(() => {
        setFileVisible(false)
    }, [])

    /**
     * 选择器选择
     */
    const selectChangeHandler = useCallback((value, options) => {
        setSelectOption(value)
    }, [])

    /**
     * 
     */
    const onChangeFileHandler = useCallback((e) => {
        setFileName(e.target.value)
    }, [])

    return (
        <>
        <div className="file-view">
            <div className="top-tool-container">
                <div className="add-new-area">
                    <PlusCircleFilled style={{ fontSize: '32px' }} />
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
                                onClick={item.onClickTarget} />
                        )
                    })}
                </div>
                <div className="file-display">
                    {
                        fileData.map((item) => {
                            return (
                                <FileDisplay title={item.title} createTime={item.createTime} folder={item.folder} imageUrl="default"/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        <Modal
            title="新建文件夹"
            open={folderVisible}
            onOk={onOkFolderHandler}
            onCancel={onCancelFolderHandler}
        >
            <Input placeholder="请输入文件夹名称" onChange={onChangeHandler}/>
        </Modal>
        <Modal
            title="新建文件"
            open={fileVisible}
            onOk={onOkFileHandler}
            onCancel={onCancelFileHandler}
        >
            <Select
                options={folderOptions}
                onChange={selectChangeHandler}
                style={{ width: '120px'}}
            />
            <Input
                placeholder="请输入文件名称"
                onChange={onChangeFileHandler}
                style={{ marginTop: '15px' }}
            />
        </Modal>
        </>
    )
}

export default FileView