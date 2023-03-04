import { useState } from "react"

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>

const useCopyToClipboard = (): [CopiedValue, CopyFn] => {
    const [copyText, setCopyText] = useState<CopiedValue>(null)

    const copy = async (text: string) => {
        if(!navigator?.clipboard) {
            console.log(navigator?.clipboard, 'clip')
            console.warn('Clipboard not supported!')
            return false
        }

        try {
            await navigator.clipboard.writeText(text)
            setCopyText(text)
            return true
        } catch (error) {
            console.warn('Copy Failed', error)
            setCopyText(null)
            return false
        }
    }
    return [copyText, copy]
}

export default useCopyToClipboard