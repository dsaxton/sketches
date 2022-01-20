import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import Lines from "./components/Lines";
import Static from "./components/Static";

function App(): JSX.Element {
    return Math.random() < 0.5 ? <Lines /> : <Static />;
}

ReactDOM.render(<App />, document.getElementById("root"));
