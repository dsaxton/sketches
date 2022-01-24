import * as React from "react";
import { Point } from "../types";

type DirectedPoint = Point & { direction: number };

function Trees(props: { width: number; height: number }): JSX.Element {
    const delayTime = 20;
    const white = "rgb(255, 255, 255)";
    const radius = Math.min(props.width, props.height) / 100;
    const epochSize = 20;
    const directionalBias = 0.5;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    let currentGeneration: DirectedPoint[] = [
        { x: props.width / 2, y: props.height, direction: Math.PI / 2 },
    ];
    let nextGeneration: DirectedPoint[];
    let generationCount = 1;
    let doublingGeneration: boolean;

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")!;
            context.fillRect(0, 0, props.width, props.height);
            context.strokeStyle = white;

            const id = setInterval(() => {
                if (
                    all(currentGeneration, (p) => {
                        return p.y < 0;
                    })
                ) {
                    currentGeneration = [
                        {
                            x: Math.random() * props.width,
                            y: props.height,
                            direction: Math.PI / 2,
                        },
                    ];
                    generationCount = 1;
                    return;
                }

                generationCount++;
                doublingGeneration = generationCount % epochSize === 0;
                nextGeneration = currentGeneration.flatMap((point) => {
                    const theta1 =
                        directionalBias * point.direction +
                        (1 - directionalBias) * Math.random() * Math.PI;
                    const x1 = point.x + radius * Math.cos(theta1);
                    const y1 = point.y - radius * Math.sin(theta1);
                    const theta2 =
                        directionalBias *
                            (Math.PI / 2 - (Math.PI / 2 - point.direction)) +
                        (1 - directionalBias) * Math.random() * Math.PI;
                    const x2 = point.x + radius * Math.cos(theta2);
                    const y2 = point.y - radius * Math.sin(theta2);
                    if (doublingGeneration) {
                        return [
                            { x: x1, y: y1, direction: theta1 },
                            { x: x2, y: y2, direction: theta2 },
                        ];
                    }
                    return [{ x: x1, y: y1, direction: point.direction }];
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

function all<T>(arr: T[], fn: (x: T) => boolean): boolean {
    for (const element of arr) {
        if (!fn(element)) {
            return false;
        }
    }
    return true;
}

export default Trees;
