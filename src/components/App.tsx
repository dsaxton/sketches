import * as React from "react";
import Lines from "./Lines";
import Static from "./Static";

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

export default App;
