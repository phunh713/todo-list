import axiosClient from "./axiosClient";

class TodoListApi {
	getListById(id: string) {
		const url = `todoLists/${id}.json`;
		return axiosClient.get(url);
	}

	getListByName(name: string) {
		const url = `todoLists.json`;
		const params = {
			orderBy: `"listName"`,
			equalTo: `"${name}"`,
		};
		return axiosClient.get(url, { params });
	}

	createList(listName: string) {
		const url = `todoLists.json`;
		return axiosClient.post(url, JSON.stringify({ listName }));
	}

	addTodoItem(listId: string, task: string, done: boolean) {
		const url = `todoLists/${listId}/todoList.json`;
		return axiosClient.post(url, JSON.stringify({ task, done }));
	}

	updateTodoItem(listId: string, itemId: string, task: string, done: boolean) {
		const url = `todoLists/${listId}/todoList/${itemId}.json`;
		return axiosClient.patch(url, JSON.stringify({ task, done }));
	}

	deleteTodoItem(listId: string, itemId: string) {
		const url = `todoLists/${listId}/todoList/${itemId}.json`;
		return axiosClient.delete(url);
	}
}

const todoListApi = new TodoListApi();
export default todoListApi;
