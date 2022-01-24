import * as React from "react";
import { Point } from "../types";

type PointWithRadius = Point & { radius: number };

function Sphere(props: { width: number; height: number }): JSX.Element {
    const delayTime = 50;
    const black = "rgb(0, 0, 0)";
    const white = "rgb(255, 255, 255)";
    const tickFactor = 100;
    const outerRadius = Math.min(props.width, props.height) / 5;
    const innerRadius = Math.min(props.width, props.height) / 500;
    const distanceBetweenCenters = 0.7 * outerRadius;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")!;
            const outerCircle: PointWithRadius = {
                x: props.width / 2,
                y: props.height / 2,
                radius: outerRadius,
            };
            context.fillRect(0, 0, props.width, props.height);

            let idx = 0;
            const id = setInterval(() => {
                const theta = idx * ((2 * Math.PI) / tickFactor);
                const innerCircle: PointWithRadius = {
                    x:
                        props.width / 2 +
                        distanceBetweenCenters * Math.cos(theta),
                    y:
                        props.height / 2 +
                        distanceBetweenCenters * Math.sin(theta),
                    radius: innerRadius,
                };
                const gradient = context.createRadialGradient(
                    innerCircle.x,
                    innerCircle.y,
                    innerCircle.radius,
                    outerCircle.x,
                    outerCircle.y,
                    outerCircle.radius,
                );
                gradient.addColorStop(0, white);
                gradient.addColorStop(1, black);
                context.fillStyle = gradient;
                context.fillRect(0, 0, props.width, props.height);

                idx = (idx + 1) % tickFactor;
            }, delayTime);
            return () => clearInterval(id);
        }
    }, [props]);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Sphere;
