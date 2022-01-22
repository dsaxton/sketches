import * as React from "react";
import { Point } from "../types";

function Lines(props: { width: number; height: number }): JSX.Element {
    const delayTime = 100;
    const squareCount = 50;
    const marginFactor = 15;
    const squareSize = Math.min(props.width, props.height) / 100;
    const ceiling = (1 * props.height) / marginFactor;
    const floor = ((marginFactor - 1) * props.height) / marginFactor;
    const leftWall = (1 * props.width) / marginFactor;
    const rightWall = ((marginFactor - 1) * props.width) / marginFactor;
    const black = "rgb(0, 0, 0)";
    const white = "rgb(255, 255, 255)";
    const darkGrey = "rgb(50, 50, 50)";
    const lightGrey = "rgb(100, 100, 100)";
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    function generatePoint(): Point {
        return {
            x: leftWall + Math.random() * (rightWall - leftWall),
            y: ceiling + Math.random() * (floor - ceiling),
        };
    }

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")!;
            context.fillRect(0, 0, props.width, props.height);

            let points = [...Array(squareCount)].map(() => {
                return generatePoint();
            });
            const id = setInterval(() => {
                context.fillStyle = black;
                context.fillRect(0, 0, props.width, props.height);

                points.forEach(({ x, y }) => {
                    console.log(`x: ${x}, y: ${y}`);
                    context.fillStyle = white;
                    context.fillRect(x, y, squareSize, squareSize);
                    context.fillStyle = lightGrey;
                    context.fillRect(
                        x,
                        y - 2 * squareSize,
                        squareSize,
                        squareSize,
                    );
                    context.fillStyle = darkGrey;
                    context.fillRect(
                        x,
                        y - 4 * squareSize,
                        squareSize,
                        squareSize,
                    );
                });
                points = points.map(({ x, y }) => {
                    let newY = y + 2 * squareSize;
                    let newX = x;
                    if (newY > floor) {
                        newY = ceiling;
                        newX =
                            leftWall +
                            Math.floor(Math.random() * (rightWall - leftWall));
                    }
                    return { x: newX, y: newY };
                });
            }, delayTime);
            return () => clearInterval(id);
        }
    }, [props]);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Lines;
