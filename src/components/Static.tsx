import * as React from "react";

function Static(props: { width: number; height: number }): JSX.Element {
    const cellCount = 100;
    const delayTime = 50;
    const black = "rgb(0, 0, 0)";
    const white = "rgb(255, 255, 255)";
    const cellDimension = Math.min(props.width, props.height) / cellCount / 2;
    const xOffset = props.width / 2 - (cellCount * cellDimension) / 2;
    const yOffset = props.height / 2 - (cellCount * cellDimension) / 2;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")!;
            context.fillRect(0, 0, props.width, props.height);

            const id = setInterval(() => {
                let cellColor;
                for (let i = 0; i < cellCount; i++) {
                    for (let j = 0; j < cellCount; j++) {
                        cellColor = Math.random() < 0.5 ? black : white;
                        context.fillStyle = cellColor;
                        context.fillRect(
                            xOffset + i * cellDimension,
                            yOffset + j * cellDimension,
                            cellDimension,
                            cellDimension,
                        );
                    }
                }
            }, delayTime);
            return () => clearInterval(id);
        }
    }, [props]);

    return <canvas ref={canvasRef} {...props} />;
}

export default Static;
