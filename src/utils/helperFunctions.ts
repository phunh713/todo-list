import TodoListItem from "../model/TodoListItem";

export const transformFBList: (arg: any) => any = (response) => {
	let result: TodoListItem[] = [];
	for (let key in response) {
		// result.push(new Item())
	}
};
