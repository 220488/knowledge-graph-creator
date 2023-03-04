import React, { useEffect, useState } from "react"
import { IFileDisplayProps } from "../types/dashboard"
import '../styles/filedisplay.scoped.scss'
import useCopyToClipboard from "../../../utils/hooks/copy-to-clipboard.ts"

const FileDisplay: React.FC<IFileDisplayProps> = (props: IFileDisplayProps) => {
    const [copyValue, copyFunc] = useCopyToClipboard()
    return (
        <div className="file-display-container">
            <div className="image-area">image</div>
            <div className="text">
                <div className="title">title</div>
                <div className="time">time</div>
            </div>
            <button onClick={() => copyFunc("A")}>A</button>
            <div>clip content is {copyValue}</div>
        </div>
    )
}

export default FileDisplay