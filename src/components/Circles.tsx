import * as React from "react";

type Point = {
    x: number;
    y: number;
};

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

    function generateCoordinate(): Point {
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
            let coordinates: Point[] = shades.map(() => {
                return generateCoordinate();
            });
            const id = setInterval(() => {
                context.fillStyle = "rgb(0, 0, 0)";
                context.fillRect(0, 0, props.width, props.height);
                coordinates.forEach((coord, idx) => {
                    context.beginPath();
                    context.arc(coord.x, coord.y, radius, 0, 2 * Math.PI);
                    context.stroke();
                    context.fillStyle = `rgb(${shades[idx]}, ${shades[idx]}, ${shades[idx]})`;
                    context.fill();
                });
                shades = shades.map((s) => {
                    return s > 0 ? s - 1 : 255;
                });
                coordinates = shades.map((s, idx) => {
                    if (s === 255) {
                        return generateCoordinate();
                    }
                    return coordinates[idx];
                });
            }, delayTime);
            return () => clearInterval(id);
        }
    }, [props]);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Circles;
