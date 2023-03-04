import React, { useEffect, useRef } from "react"

const GraphCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if(canvasRef.current) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            context?.beginPath()
            context?.arc(50,50,50,0,2*Math.PI)
            context?.fill()
        }
    }, [])
    return (
        <canvas
            ref={canvasRef}
            height={1500}
            width={1500}
            onClick={e => {
                alert(e.clientX)
            }}
        ></canvas>
    )
}

export default GraphCanvas
