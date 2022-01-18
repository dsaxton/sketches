import React from "react";
import ReactDOM from "react-dom";
import Canvas from "./components/Canvas";
import "./main.css";

function App(): JSX.Element {
    return <Canvas />;
}

ReactDOM.render(<App />, document.getElementById("root"));
