import { useEffect, useRef } from "react"

const useTimeout = (callback: () => void, delay: number) => {
    const callbackRef = useRef(callback)
    callbackRef.current = callback

    useEffect(() => {
        const id = setTimeout(() => {
            callbackRef.current()
        }, delay)

        return () => clearTimeout(id)
    }, [delay])
}

export default useTimeout

/**
 * 用法：
 * useTimeout(toggleVisibility, 3000)
 */