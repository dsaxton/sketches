import * as React from "react";

function Triangles(props: { width: number; height: number }): JSX.Element {
    const delayTime = 250;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")!;
            context.fillRect(0, 0, props.width, props.height);
            context.strokeStyle = "rgb(255, 255, 255)";

            const id = setInterval(() => {
                return;
            }, delayTime);
            return () => clearInterval(id);
        }
    }, [props]);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Triangles;
