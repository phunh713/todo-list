import { AxiosResponse } from "axios";
import { FC, FormEvent, useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";
import todoListApi from "../../api/todoListApi";
import TodoListContext from "../../context/todo-list-context";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";
import Input from "../../UI/Input/Input";
import classes from "./AddTodoItem.module.css";

const AddTodoItem: FC = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const todoListCtx = useContext(TodoListContext);

	const handleSubmit = (e: FormEvent) => {
		console.log("submit");
		e.preventDefault();
		if (inputValue.trim()) {
			const addTodoItem = async () => {
				setIsLoading(true);
				const response: AxiosResponse<{ name: string }> = await todoListApi.addTodoItem(
					todoListCtx.listId,
					inputValue,
					false
				);
				if (response.statusText === "OK") {
					todoListCtx.addTodoItem({ id: response.data.name, task: inputValue, done: false });
				}
				setIsLoading(false);
				setInputValue("");
			};
			addTodoItem();
		}
	};
	const handleOnChange = (value: string) => {
		setInputValue(value);
	};
	return (
		<Card>
			<form onSubmit={handleSubmit} className={classes["add-new-form"]}>
				<Input
					id="add-todo-item"
					type="text"
					onChange={handleOnChange}
					value={inputValue}
					style={{ flex: "1" }}
				/>
				<Button type="submit" disable={!inputValue.trim()} isLoading={isLoading}>
					<FiPlus size={17} />
				</Button>
			</form>
		</Card>
	);
};

export default AddTodoItem;
