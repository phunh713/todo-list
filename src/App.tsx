import { useContext } from "react";
import AddTodoItem from "./components/AddTodoItem/AddTodoItem";
import TodoList from "./components/TodoList/TodoList";
import Welcome from "./components/Welcome/Welcome";
import TodoListContext from "./context/todo-list-context";
import Layout from "./Layout/Layout";
import Card from "./UI/Card/Card";
import Section from "./UI/Section/Section";

const App: React.FC = (props) => {
	const todoListCtx = useContext(TodoListContext);
	const notDoneList = todoListCtx.todoList?.filter((item) => item.done === false) || [];
	const doneList = todoListCtx.todoList?.filter((item) => item.done === true) || [];

	return (
		<Layout>
			{!todoListCtx.todoList && (
				<Section style={{ padding: "10px 0" }}>
					<Welcome />
				</Section>
			)}
			{todoListCtx.todoList && (
				<>
					<Section style={{ padding: "10px 0" }}>
						<Card>
                            <h1>List Name: {todoListCtx.listName}</h1>
                        </Card>
					</Section>
					<Section style={{ padding: "10px 0", display: "flex", gap: "2%", flexWrap: "wrap" }}>
						<Card className="todo-card" style={{ minHeight: 300, flex: 3 }}>
							<h2 style={{ marginTop: 0 }}>Need to Do</h2>
							<TodoList items={notDoneList} />
                            <AddTodoItem />
						</Card>
						<Card className="todo-card" style={{ minHeight: 300, flex: 2 }}>
							<h2 style={{ marginTop: 0 }}>Done</h2>
							<TodoList items={doneList} />
						</Card>
					</Section>
				</>
			)}
		</Layout>
	);
};

export default App;
