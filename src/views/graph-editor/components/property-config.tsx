import { Button, Input } from "antd"
import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateLinkText } from "../../../redux/graphLinkData"
import { updateNodeText } from "../../../redux/graphNodeData"
import { ELEMENT_TYPE, IPropertyConfigProps } from "../types/property-config.ts"

const PropertyConfig: React.FC<IPropertyConfigProps> = (props) => {
    const {
        elementType = ELEMENT_TYPE.NODE,
    } = props

    const dispatch = useDispatch()

    const element = useSelector((state) => state.editElement)
    console.log('element', element);
    

    // 更新元素信息函数
    const updateProperty = () => {
        // dispatch()
    }

    // 删除元素操作
    const deleteElement = (type) => {
        if (type === 'node') {
            // 删除节点
            // dispatch()
        } else if (type === 'link') {
            // 删除link
            // dispatch()
        }
    }

    const onChangeHandle = useCallback((e, type) => {
        console.log('e', e);
        console.log('id', element);
        
        if (element.type === 'node') {           
            dispatch(
                updateNodeText({
                    id: element.id,
                    text: e.target.value
                })
            )
        } else if (element.type === 'link') {
            dispatch(
                updateLinkText({
                    id: element.id,
                    text: e.target.value
                })
            )
        }
        // e.target.value
        // 给text
    }, [element, dispatch])

    return (
        <div className="config-container">
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
            <div>颜色</div>
            <div>边框</div>
            <div>尺寸</div>
            <div>
                <div>文字</div>
                <Input placeholder="..." onChange={onChangeHandle}/>
            </div>
            <Button type="primary" danger>删除元素</Button>
        </div>
    )
}

export default PropertyConfig