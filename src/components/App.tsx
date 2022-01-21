import * as React from "react";
import Rain from "./Rain";
import Lines from "./Lines";
import Static from "./Static";
import Circles from "./Circles";

function App(): JSX.Element {
    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const components = [
        <Rain {...dimensions} />,
        <Lines {...dimensions} />,
        <Static {...dimensions} />,
        <Circles {...dimensions} />,
    ];

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

    const idx = Math.floor(Math.random() * components.length);
    return components[idx];
}

export default App;
