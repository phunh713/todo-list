import { FC } from "react";
import TodoListItem from "../../model/TodoListItem";
import TodoItem from "../TodoItem/TodoItem";

const TodoList: FC<{ items: TodoListItem[] }> = ({ items }) => {
	return items.length ? (
		<>
			{items.map((item) => (
				<TodoItem item={item} key={item.id} />
			))}
		</>
	) : null;
};

export default TodoList;
