import * as React from "react";

function Lines(props: { width: number; height: number }): JSX.Element {
    const delayTime = 100;
    const squareSize = Math.min(props.width, props.height) / 100;
    const floorLevel = (9 * props.height) / 10;
    const black = "rgb(0, 0, 0)";
    const white = "rgb(255, 255, 255)";
    const lightGrey = "rgb(100, 100, 100)";
    const darkGrey = "rgb(50, 50, 50)";
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")!;
            context.fillRect(0, 0, props.width, props.height);

            let xPosition = props.width / 2;
            let yPosition = props.height / 2;
            const id = setInterval(() => {
                context.fillStyle = black;
                context.fillRect(0, 0, props.width, props.height);

                context.fillStyle = white;
                context.fillRect(xPosition, yPosition, squareSize, squareSize);
                context.fillStyle = lightGrey;
                context.fillRect(
                    xPosition,
                    yPosition - 2 * squareSize,
                    squareSize,
                    squareSize,
                );
                context.fillStyle = darkGrey;
                context.fillRect(
                    xPosition,
                    yPosition - 4 * squareSize,
                    squareSize,
                    squareSize,
                );
                yPosition += 2 * squareSize;
                if (yPosition > floorLevel) {
                    yPosition = yPosition % floorLevel;
                    xPosition = Math.floor(Math.random() * props.width);
                }
            }, delayTime);
            return () => clearInterval(id);
        }
    }, [props]);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Lines;
