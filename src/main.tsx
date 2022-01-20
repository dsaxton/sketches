import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import Lines from "./components/Lines";
import Static from "./components/Static";

function App(): JSX.Element {
    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

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

    return Math.random() < 0.5 ? (
        <Lines width={dimensions.width} height={dimensions.height} />
    ) : (
        <Static width={dimensions.width} height={dimensions.height} />
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
