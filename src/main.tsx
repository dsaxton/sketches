import React from "react";
import ReactDOM from "react-dom";
import Static from "./components/Static";
import Lines from "./components/Lines";
import "./main.css";

function App(): JSX.Element {
    return Math.random() < 0.5 ? (
        <Static height={window.innerHeight} width={window.innerWidth} />
    ) : (
        <Lines height={window.innerHeight} width={window.innerWidth} />
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
