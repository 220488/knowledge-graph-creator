import { Dispatch, SetStateAction, useCallback, useState } from "react"

interface UseBooleanOutput {
    value: boolean
    setValue: Dispatch<SetStateAction<boolean>>
    setTrue: () => void
    setFalse: () => void
    toggle: () => void
}

const useBoolean = (defaultValue?: boolean): UseBooleanOutput => {
    const [value, setValue] = useState<boolean>(!!defaultValue)

    const setTrue = useCallback(() => setValue(true), [])

    const setFalse = useCallback(() => setValue(false), [])

    const toggle = useCallback(() => setValue(prev => !prev), [])

    return {
        value,
        setValue,
        setTrue,
        setFalse,
        toggle,
    }
}

export default useBoolean