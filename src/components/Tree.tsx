import * as React from "react";
import { Point } from "../types";

function Tree(props: { width: number; height: number }): JSX.Element {
    const delayTime = 10;
    const radius = Math.min(props.width, props.height) / 200;
    const epochSize = 50;
    // TODO: add bias
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    let currentGeneration: Point[] = [{ x: props.width / 2, y: props.height }];
    let nextGeneration: Point[];
    let generationCount = 1;
    let doublingGeneration = generationCount % epochSize === 0;

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")!;
            context.fillRect(0, 0, props.width, props.height);
            context.strokeStyle = "rgb(255, 255, 255)";

            const id = setInterval(() => {
                for (const point of currentGeneration) {
                    if (
                        point.x < 0 ||
                        point.x > props.width ||
                        point.y < 0 ||
                        point.y > props.height
                    ) {
                        return;
                    }
                }

                generationCount++;
                doublingGeneration = generationCount % epochSize === 0;
                nextGeneration = currentGeneration.flatMap((point) => {
                    const theta1 = Math.random() * Math.PI;
                    const x1 = point.x + radius * Math.cos(theta1);
                    const y1 = point.y - radius * Math.sin(theta1);
                    const theta2 = Math.random() * Math.PI;
                    const x2 = point.x + radius * Math.cos(theta2);
                    const y2 = point.y - radius * Math.sin(theta2);
                    if (doublingGeneration) {
                        return [
                            { x: x1, y: y1 },
                            { x: x2, y: y2 },
                        ];
                    }
                    return [{ x: x1, y: y1 }];
                });
                currentGeneration.forEach((point, idx) => {
                    context.beginPath();
                    context.moveTo(point.x, point.y);
                    if (doublingGeneration) {
                        context.lineTo(
                            nextGeneration[2 * idx].x,
                            nextGeneration[2 * idx].y,
                        );
                        context.moveTo(point.x, point.y);
                        context.lineTo(
                            nextGeneration[2 * idx + 1].x,
                            nextGeneration[2 * idx + 1].y,
                        );
                    } else {
                        context.moveTo(point.x, point.y);
                        context.lineTo(
                            nextGeneration[idx].x,
                            nextGeneration[idx].y,
                        );
                    }
                    context.closePath();
                    context.stroke();
                });
                currentGeneration = nextGeneration;
            }, delayTime);
            return () => clearInterval(id);
        }
    }, [props]);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Tree;
