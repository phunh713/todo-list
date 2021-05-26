class TodoListItem {
	id: string;
	task: string;
	done: boolean;

	constructor(task: string, id: string, done: boolean) {
		this.task = task;
		this.id = id;
		this.done = done;
	}
}

export default TodoListItem;
