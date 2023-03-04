import React, { useEffect, useState } from "react"
import { IFileDisplayProps } from "../types/dashboard"
import '../styles/filedisplay.scoped.scss'
import useBoolean from "../../../utils/hooks/use-boolean.ts"

const FileDisplay: React.FC<IFileDisplayProps> = (props: IFileDisplayProps) => {
    const {value, setValue, setTrue, setFalse, toggle} = useBoolean(false)
    return (
        <div className="file-display-container">
            <div className="image-area">image</div>
            <div className="text">
                <div className="title">title</div>
                <div className="time">time</div>
            </div>
            {value && <p>value is 
            {value}</p>}
            <button onClick={setTrue}>setTrue</button>
            <button onClick={setFalse}>setFalse</button>
            <button onClick={toggle}>toggle</button>
            <button onClick={() => setValue(true)}>setValue</button>
        </div>
    )
}

export default FileDisplay

/**
 * 使用useBoolean的案例
 */