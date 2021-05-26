import { createContext, FC, useState } from "react";
import TodoListItem from "../model/TodoListItem";

const TodoListContext = createContext<{
	listId: string;
	listName: string;
	todoList: TodoListItem[] | null;
	setTodoList: (listId: string, listName: string, todoList: TodoListItem[]) => void;
	addTodoItem: (item: TodoListItem) => void;
	updateTodoItem: (itemid: string, task: string, done: boolean) => void;
	deleteTodoItem: (itemId: string) => void;
}>({
	listId: "",
	listName: "",
	todoList: null,
	setTodoList: () => {},
	addTodoItem: () => {},
	updateTodoItem: () => {},
	deleteTodoItem: () => {},
});

export const TodoListContextProvider: FC = ({ children }) => {
	const [list, setList] = useState<{ listId: string; listName: string; todoList: TodoListItem[] | null }>({
		listId: "",
		listName: "",
		todoList: null,
	});

	const value = {
		listId: list.listId,
		listName: list.listName,
		todoList: list.todoList,
		setTodoList: (listId: string, listName: string, todoList: TodoListItem[]) =>
			setList({ listId, listName, todoList }),
		addTodoItem: (item: TodoListItem) => {
			setList((prevState) => {
				return { ...prevState, todoList: prevState.todoList ? [...prevState.todoList, item] : [item] };
			});
		},
		updateTodoItem: (itemId: string, task: string, done: boolean) => {
			const updatedTodoList = list.todoList && [...list.todoList];
			const updatedItem = updatedTodoList?.find((item) => item.id === itemId);
			if (updatedItem) {
				updatedItem.task = task;
				updatedItem.done = done;
			}

			setList({ ...list, todoList: updatedTodoList });
		},
		deleteTodoItem: (itemId: string) => {
			setList((prevState) => {
				return {
					...prevState,
					todoList: prevState.todoList && prevState.todoList.filter((item) => item.id !== itemId),
				};
			});
		},
	};

	return <TodoListContext.Provider value={value}>{children}</TodoListContext.Provider>;
};

export default TodoListContext;
