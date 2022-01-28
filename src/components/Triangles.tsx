import * as React from "react";

function Triangles(props: { width: number; height: number }): JSX.Element {
    const delayTime = 200;
    const black = "rgb(0, 0, 0)";
    const white = "rgb(255, 255, 255)";
    const magnitude = Math.min(props.width, props.height) / 3;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")!;
            context.fillRect(0, 0, props.width, props.height);
            context.strokeStyle = white;

            const id = setInterval(() => {
                context.fillStyle = black;
                context.fillRect(0, 0, props.width, props.height);
                context.fillStyle = white;
                for (const [xSign, ySign] of [
                    [1, 1],
                    [-1, 1],
                    [1, -1],
                    [-1, -1],
                ]) {
                    context.beginPath();
                    context.moveTo(props.width / 2, props.height / 2);
                    context.lineTo(
                        props.width / 2 + xSign * Math.random() * magnitude,
                        props.height / 2 + ySign * Math.random() * magnitude,
                    );
                    context.lineTo(
                        props.width / 2 + xSign * Math.random() * magnitude,
                        props.height / 2 + ySign * Math.random() * magnitude,
                    );
                    context.closePath();
                    context.fill();
                }
            }, delayTime);
            return () => clearInterval(id);
        }
    }, [props]);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Triangles;
