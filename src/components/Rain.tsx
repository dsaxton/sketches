import * as React from "react";

type Coordinate = {
    x: number;
    y: number;
};

function Lines(props: { width: number; height: number }): JSX.Element {
    const delayTime = 100;
    const squareCount = 25;
    const squareSize = Math.min(props.width, props.height) / 100;
    const ceiling = (1 * props.height) / 10;
    const floor = (9 * props.height) / 10;
    const leftWall = (1 * props.width) / 10;
    const rightWall = (9 * props.width) / 10;
    const black = "rgb(0, 0, 0)";
    const white = "rgb(255, 255, 255)";
    const darkGrey = "rgb(50, 50, 50)";
    const lightGrey = "rgb(100, 100, 100)";
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    function generateCoordinate(): Coordinate {
        return {
            x: leftWall + Math.random() * (rightWall - leftWall),
            y: ceiling + Math.random() * (floor - ceiling),
        };
    }

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")!;
            context.fillRect(0, 0, props.width, props.height);

            let positions = [...Array(squareCount)].map(() => {
                return generateCoordinate();
            });
            const id = setInterval(() => {
                context.fillStyle = black;
                context.fillRect(0, 0, props.width, props.height);

                positions.forEach(({ x, y }) => {
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
                positions = positions.map(({ x, y }) => {
                    let newY = y + 2 * squareSize;
                    let newX = x;
                    if (newY > floor) {
                        newY = newY % floor;
                        newX = Math.floor(Math.random() * props.width);
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