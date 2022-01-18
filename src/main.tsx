import React from "react";
import ReactDOM from "react-dom";
import Static from "./components/Static";
import "./main.css";

function App(): JSX.Element {
    return <Static height={window.innerHeight} width={window.innerWidth} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
