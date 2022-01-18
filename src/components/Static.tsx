import * as React from "react";

function Static(props: { height: number; width: number }): JSX.Element {
    const cellCount = 100;
    const delayTime = 50;
    const cellDimension = Math.min(props.width, props.height) / cellCount / 2;
    const xOffset = props.width / 2 - (cellCount * cellDimension) / 2;
    const yOffset = props.height / 2 - (cellCount * cellDimension) / 2;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const canvasContextRef = React.useRef<CanvasRenderingContext2D | null>(
        null,
    );

    React.useEffect(() => {
        if (canvasRef.current) {
            canvasContextRef.current = canvasRef.current.getContext("2d");
            const context = canvasContextRef.current;
            context!.fillRect(0, 0, props.width, props.height);

            setInterval(() => {
                let cellColor;
                for (let i = 0; i < cellCount; i++) {
                    for (let j = 0; j < cellCount; j++) {
                        cellColor =
                            Math.random() < 0.5
                                ? "rgb(0, 0, 0)"
                                : "rgb(255, 255, 255)";
                        context!.fillStyle = cellColor;
                        context!.fillRect(
                            xOffset + i * cellDimension,
                            yOffset + j * cellDimension,
                            cellDimension,
                            cellDimension,
                        );
                    }
                }
            }, delayTime);
        }
    }, []);

    return <canvas ref={canvasRef} {...props} />;
}

export default Static;
