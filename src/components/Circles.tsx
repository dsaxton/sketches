import * as React from "react";
import { Point } from "../types";

function Circles(props: { width: number; height: number }): JSX.Element {
    const delayTime = 10;
    const marginFactor = 20;
    const shapeCount = 75;
    const maxRadius = Math.min(props.width, props.height) / 100;
    const ceiling = (1 * props.height) / marginFactor;
    const floor = ((marginFactor - 1) * props.height) / marginFactor;
    const leftWall = (1 * props.width) / marginFactor;
    const rightWall = ((marginFactor - 1) * props.width) / marginFactor;
    const black = "rgb(0, 0, 0)";
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    function generatePoint(): Point {
        return {
            x: leftWall + maxRadius + Math.random() * (rightWall - leftWall),
            y: ceiling + maxRadius + Math.random() * (floor - ceiling),
        };
    }

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")!;
            context.fillRect(0, 0, props.width, props.height);
            context.strokeStyle = black;

            let shades: number[] = [...Array(shapeCount)].map((_, idx) => {
                return (idx * 255) / shapeCount;
            });
            let points: Point[] = shades.map(() => {
                return generatePoint();
            });
            let radii: number[] = shades.map(() => {
                return Math.random() * maxRadius;
            });
            const id = setInterval(() => {
                context.fillStyle = black;
                context.fillRect(0, 0, props.width, props.height);
                points.forEach((point, idx) => {
                    context.beginPath();
                    context.arc(point.x, point.y, radii[idx], 0, 2 * Math.PI);
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
                radii = shades.map((s, idx) => {
                    if (s === 255) {
                        return Math.random() * maxRadius;
                    }
                    return radii[idx];
                });
            }, delayTime);
            return () => clearInterval(id);
        }
    }, [props]);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Circles;
