import classes from "./Welcome.module.css";
import { FC, useContext, useState } from "react";
import Button from "../../UI/Button/Button";
import InitTodoList from "../InitTodoList/InitTodoList";
import UiContext from "../../context/ui-context";
import Card from "../../UI/Card/Card";
import _TodoList from "../../model/TodoList";
import TodoListItem from "../../model/TodoListItem";

interface getAllListsResponse {
	[listId: string]: {
		listName: string;
		todoList: TodoListItem[];
	};
}

const Welcome: FC = () => {
	const [isCreateNew, setIsCreateNew] = useState<boolean>(false);
	const uiCtx = useContext(UiContext);

	const handleCreateNew: () => void = () => {
		uiCtx.setInitModalShown(true);
		setIsCreateNew(true);
	};

	const handleGetOld = () => {
		uiCtx.setInitModalShown(true);
		setIsCreateNew(false);
	};

	return (
		<Card className={classes.welcome}>
			<h1 style={{ marginTop: 0 }}>Welcome to To Do List App</h1>
			<div className={classes["buttons-wrapper"]}>
				<Button onClick={handleCreateNew}>Create New List</Button>
				<Button onClick={handleGetOld} color="yellow">
					Get Old List
				</Button>
			</div>
			<InitTodoList isCreateNew={isCreateNew} />
		</Card>
	);
};

export default Welcome;
