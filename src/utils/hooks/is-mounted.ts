import { useCallback, useEffect, useRef } from "react"

const useIsMounted = () => {
    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])
    return useCallback(() => isMounted.current, [])
}

export default useIsMounted

/**
 * 判断一个组件是否被渲染，没有则false
 */