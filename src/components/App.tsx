import * as React from "react";
import Rain from "./Rain";
import Lines from "./Lines";
import Static from "./Static";
import Circles from "./Circles";

function App(): JSX.Element {
    const holdTime = 5000;
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
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const id = setInterval(() => {
            setIndex((index + 1) % components.length);
        }, holdTime);
        return () => clearInterval(id);
    }, [index]);

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

    return components[index];
}

export default App;
