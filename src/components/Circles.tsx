import * as React from "react";
import { Point } from "../types";

function Circles(props: { width: number; height: number }): JSX.Element {
    const delayTime = 10;
    const marginFactor = 20;
    const shapeCount = 75;
    const radius = Math.min(props.width, props.height) / 150;
    const ceiling = (1 * props.height) / marginFactor;
    const floor = ((marginFactor - 1) * props.height) / marginFactor;
    const leftWall = (1 * props.width) / marginFactor;
    const rightWall = ((marginFactor - 1) * props.width) / marginFactor;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    function generatePoint(): Point {
        return {
            x: leftWall + radius + Math.random() * (rightWall - leftWall),
            y: ceiling + radius + Math.random() * (floor - ceiling),
        };
    }

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")!;
            context.fillRect(0, 0, props.width, props.height);
            context.strokeStyle = "rgb(0, 0, 0)";

            let shades: number[] = [...Array(shapeCount)].map((_, idx) => {
                return (idx * 255) / shapeCount;
            });
            let points: Point[] = shades.map(() => {
                return generatePoint();
            });
            const id = setInterval(() => {
                context.fillStyle = "rgb(0, 0, 0)";
                context.fillRect(0, 0, props.width, props.height);
                points.forEach((point, idx) => {
                    context.beginPath();
                    context.arc(point.x, point.y, radius, 0, 2 * Math.PI);
                    context.stroke();
                    context.fillStyle = `rgb(${shades[idx]}, ${shades[idx]}, ${shades[idx]})`;
                    context.fill();
                });
                shades = shades.map((s) => {
                    return s > 0 ? s - 1 : 255;
                });
                points = shades.map((s, idx) => {
                    if (s === 255) {
                        return generatePoint();
                    }
                    return points[idx];
                });
            }, delayTime);
            return () => clearInterval(id);
        }
    }, [props]);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Circles;
