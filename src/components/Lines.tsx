import * as React from "react";

function Lines(props: { height: number; width: number }): JSX.Element {
    const delayTime = 250;
    const segmentCount = 750;
    const radius = Math.min(props.width, props.height) / 100;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const canvasContextRef = React.useRef<CanvasRenderingContext2D | null>(
        null,
    );

    React.useEffect(() => {
        if (canvasRef.current) {
            canvasContextRef.current = canvasRef.current.getContext("2d");
            const context = canvasContextRef.current;
            context!.fillRect(0, 0, props.width, props.height);
            context!.strokeStyle = "rgb(255, 255, 255)";

            setInterval(() => {
                let x = props.width / 2;
                let y = props.height / 2;
                let theta;
                for (let i = 0; i < segmentCount; i++) {
                    context!.moveTo(x, y);
                    theta = Math.random() * 2 * Math.PI;
                    x += radius * Math.cos(theta);
                    y += radius * Math.sin(theta);
                    context!.lineTo(x, y);
                }
                context!.stroke();
            }, delayTime);
        }
    }, []);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Lines;
