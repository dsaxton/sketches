import * as React from "react";

function Lines(props: { width: number; height: number }): JSX.Element {
    const delayTime = 250;
    const segmentCount = 750;
    const white = "rgb(255, 255, 255)";
    const radius = Math.min(props.width, props.height) / 100;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")!;
            context.fillRect(0, 0, props.width, props.height);
            context.strokeStyle = white;

            const id = setInterval(() => {
                let x = props.width / 2;
                let y = props.height / 2;
                let theta;
                for (let i = 0; i < segmentCount; i++) {
                    context.moveTo(x, y);
                    theta = Math.random() * 2 * Math.PI;
                    x += radius * Math.cos(theta);
                    y += radius * Math.sin(theta);
                    context.lineTo(x, y);
                }
                context.stroke();
            }, delayTime);
            return () => clearInterval(id);
        }
    }, [props]);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Lines;
