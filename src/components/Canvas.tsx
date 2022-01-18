import * as React from "react";

function Canvas(props: { height?: number; width?: number }): JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasContextRef = React.useRef<CanvasRenderingContext2D | null>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      canvasContextRef.current = canvasRef.current.getContext("2d");
      const context = canvasContextRef.current;
      context!.beginPath();
      context!.arc(95, 50, 40, 0, 2 * Math.PI);
      context!.stroke();
    }
  }, []);

  return <canvas ref={canvasRef} {...props} />;
}

export default Canvas;
