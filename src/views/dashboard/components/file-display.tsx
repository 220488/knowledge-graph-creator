import React, { useEffect, useState } from "react"
import { IFileDisplayProps } from "../types/dashboard"
import '../styles/filedisplay.scoped.scss'

const FileDisplay: React.FC<IFileDisplayProps> = (props: IFileDisplayProps) => {
    return (
        <div className="file-display-container">
            <div className="image-area">image</div>
            <div className="text">
                <div className="title">title</div>
                <div className="time">time</div>
            </div>
        </div>
    )
}

export default FileDisplay