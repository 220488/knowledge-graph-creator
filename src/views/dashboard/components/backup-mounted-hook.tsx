// 本文件是使用useIsMounted的示范

import React, { useEffect, useState } from "react"
import { IFileDisplayProps } from "../types/dashboard"
import '../styles/filedisplay.scoped.scss'
import useIsMounted from "../../../utils/hooks/is-mounted.ts"

const FileDisplay: React.FC<IFileDisplayProps> = (props: IFileDisplayProps) => {
    const [isVisible, setIsVisible] = useState(true)

    const toggleVisibility = () => {
        setIsVisible(state => !state)
    }

    const delay = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const Child = () => {
        const [data, setData] = useState('loading')
        const isMounted = useIsMounted()

        useEffect(() => {
            delay(3000).then(() => {
                if (isMounted()) setData('OK')
            })
        })
        return <div>{data}</div>
    }

    return (
        <div className="file-display-container">
            <div className="image-area">image</div>
            <div className="text">
                <div className="title">title</div>
                <div className="time">time</div>
            </div>
            <button onClick={toggleVisibility}>{isVisible ? 'hide' : 'Show'}</button>
            { isVisible && <Child/>}
        </div>
    )
}

export default FileDisplay