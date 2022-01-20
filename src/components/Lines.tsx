import * as React from "react";

function Lines(): JSX.Element {
    const delayTime = 250;
    const segmentCount = 750;
    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const radius = Math.min(dimensions.width, dimensions.height) / 100;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            context!.fillRect(0, 0, dimensions.width, dimensions.height);
            context!.strokeStyle = "rgb(255, 255, 255)";

            const id = setInterval(() => {
                let x = dimensions.width / 2;
                let y = dimensions.height / 2;
                let theta;
                for (let i = 0; i < segmentCount; i++) {
                    context!.moveTo(x, y);
                    theta = Math.random() * 2 * Math.PI;
                    x += radius * Math.cos(theta);
                    y += radius * Math.sin(theta);
                    context!.lineTo(x, y);
                }
                context!.stroke();
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

    return <canvas ref={canvasRef} {...dimensions}></canvas>;
}

export default Lines;
