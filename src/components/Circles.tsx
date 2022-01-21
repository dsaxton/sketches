import * as React from "react";

type Coordinate = {
    x: number;
    y: number;
};

function Circle(props: { width: number; height: number }): JSX.Element {
    const delayTime = 10;
    const marginFactor = 10;
    const radius = Math.min(props.width, props.height) / 15;
    const ceiling = (1 * props.height) / marginFactor;
    const floor = ((marginFactor - 1) * props.height) / marginFactor;
    const leftWall = (1 * props.width) / marginFactor;
    const rightWall = ((marginFactor - 1) * props.width) / marginFactor;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    function generateCoordinate(): Coordinate {
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

            let lightness = 255;
            let { x, y } = generateCoordinate();
            const id = setInterval(() => {
                context.fillStyle = "rgb(0, 0, 0)";
                context.fillRect(0, 0, props.width, props.height);
                context.beginPath();
                context.arc(x, y, radius, 0, 2 * Math.PI);
                context.stroke();
                context.fillStyle = `rgb(${lightness}, ${lightness}, ${lightness})`;
                context.fill();
                if (lightness < 0) {
                    lightness = 255;
                    ({ x, y } = generateCoordinate());
                } else {
                    lightness--;
                }
            }, delayTime);
            return () => clearInterval(id);
        }
    }, [props]);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Circle;
