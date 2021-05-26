import TodoListItem from "./TodoListItem";

class TodoList {
	listId: string;
	listName: string;
	todoList: TodoListItem[];

	constructor(listId: string, listName: string, todoList: TodoListItem[]) {
		this.listId = listId;
		this.listName = listName;
		this.todoList = todoList;
	}
}

export default TodoList;
