import { FC } from "react";
import Item from "../../model/Item";
import TodoItem from "../TodoItem/TodoItem";

const TodoList: FC<{ items: Item[] }> = ({ items }) => {
	return items.length ? (
		<>
			{items.map((item) => (
				<TodoItem item={item} key={item.id}/>
			))}
		</>
	) : <span>NO TODO ITEM</span>;
};

export default TodoList;
