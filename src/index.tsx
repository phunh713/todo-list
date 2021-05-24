import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TodoListContextProvider } from "./context/todo-list-context";
import { UiContextProvider } from "./context/ui-context";

ReactDOM.render(
	<React.StrictMode>
		<TodoListContextProvider>
			<UiContextProvider>
				<App />
			</UiContextProvider>
		</TodoListContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
