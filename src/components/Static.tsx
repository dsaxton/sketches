import * as React from "react";

function Static(): JSX.Element {
    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const cellCount = 100;
    const delayTime = 50;
    const cellDimension =
        Math.min(dimensions.width, dimensions.height) / cellCount / 2;
    const xOffset = dimensions.width / 2 - (cellCount * cellDimension) / 2;
    const yOffset = dimensions.height / 2 - (cellCount * cellDimension) / 2;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            context!.fillRect(0, 0, dimensions.width, dimensions.height);

            const id = setInterval(() => {
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
            return () => clearInterval(id);
        }
    }, [dimensions]);

    React.useLayoutEffect(() => {
        function updateDimensions() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", updateDimensions);
        updateDimensions();
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return <canvas ref={canvasRef} {...dimensions} />;
}

export default Static;
