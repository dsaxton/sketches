import React from "react";
import ReactDOM from "react-dom";
import Lines from "./components/Lines";
import Static from "./components/Static";
import "./main.css";

function App(): JSX.Element {
    return Math.random() < 0.5 ? <Lines /> : <Static />;
}

ReactDOM.render(<App />, document.getElementById("root"));
