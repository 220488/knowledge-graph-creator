import React from "react"
import { ELEMENT_TYPE, IPropertyConfigProps } from "../types/property-config.ts"

const PropertyConfig: React.FC<IPropertyConfigProps> = (props) => {
    const {
        elementType = ELEMENT_TYPE.NODE,
    } = props

    return (
        <div>
            {
                elementType === ELEMENT_TYPE.NODE && (
                    <div>node</div>
                )
            }
            {
                elementType === ELEMENT_TYPE.LINE && (
                    <div>line</div>
                )
            }
            {
                elementType === ELEMENT_TYPE.TEXT && (
                    <div>text</div>
                )
            }
            <div>颜色</div>
            <div>边框</div>
            <div>尺寸</div>
            <div>文字</div>
        </div>
    )
}

export default PropertyConfig