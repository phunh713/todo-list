import classes from "./TodoItem.module.css";
import { FC, FormEvent, useContext, useRef, useState } from "react";
import Item from "../../model/Item";
import Card from "../../UI/Card/Card";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import todoListApi from "../../api/todoListApi";
import TodoListContext from "../../context/todo-list-context";
import { AxiosResponse } from "axios";
import { FiCheck, FiCornerDownLeft, FiEdit3, FiTrash2, FiX } from "react-icons/fi";
import { IoArrowUndoOutline } from "react-icons/io5";

const TodoItem: FC<{ item: Item }> = ({ item }) => {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>(item.task);
	const editValueRef = useRef(inputValue);

	const [isFinishing, setIsFinishing] = useState<boolean>(false);
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [isUndoing, setIsUndoing] = useState<boolean>(false);

	const isLoading = isFinishing || isUpdating || isDeleting || isUndoing;

	const todoListCtx = useContext(TodoListContext);
	const handleOnChange = (value: string) => {
		setInputValue(value);
	};
	const handleClickDone = () => {
		setIsFinishing(true);
		const finishTodoItem = async () => {
			const response = await todoListApi.updateTodoItem(todoListCtx.listId, item.id, item.task, true);
			if (response) {
				todoListCtx.updateTodoItem(item.id, item.task, true);
			}
			setIsFinishing(false);
		};
		finishTodoItem();
	};

	const handleClickEdit = () => {
		setIsEdit(true);
	};

	const handleOnUpdate = (e: FormEvent) => {
		e.preventDefault();
		setIsUpdating(true);
		const updateItem = async () => {
			const response: AxiosResponse<{ task: string }> = await todoListApi.updateTodoItem(
				todoListCtx.listId,
				item.id,
				inputValue,
				item.done
			);

			if (response) {
				todoListCtx.updateTodoItem(item.id, inputValue, item.done);
			}
			editValueRef.current = inputValue;
			setIsUpdating(false);
			setIsEdit(false);
		};

		updateItem();
	};

	const handleOnRemove = () => {
		setIsDeleting(true);
		const removeItem = async () => {
			const response = await todoListApi.deleteTodoItem(todoListCtx.listId, item.id);
			if (response) {
				todoListCtx.deleteTodoItem(item.id);
			}
			setIsDeleting(false);
		};
		removeItem();
	};

	const handleClickUndo = () => {
		setIsUndoing(true);
		const finishTodoItem = async () => {
			const response = await todoListApi.updateTodoItem(todoListCtx.listId, item.id, item.task, false);
			if (response) {
				todoListCtx.updateTodoItem(item.id, item.task, false);
			}
			setIsUndoing(false);
		};
		finishTodoItem();
	};
	return (
		<Card>
			{!isEdit ? (
				<div className={classes["item-wrapper"]}>
					<div className={classes["task-text"]}>
						<span style={{textDecoration: item.done ? "line-through" : "none"}}>{item.task}</span>
					</div>
					<div className={classes["task-action"]}>
						{!item.done ? (
							<>
								<Button onClick={handleClickDone} isLoading={isFinishing} disable={isLoading}>
									<FiCheck size={20} />
								</Button>
								<Button onClick={handleClickEdit} color="blue" disable={isLoading}>
									<FiEdit3 size={19} />
								</Button>
								<Button onClick={handleOnRemove} color="red" isLoading={isDeleting} disable={isLoading}>
									<FiTrash2 size={18} />
								</Button>
							</>
						) : (
							<Button onClick={handleClickUndo} isLoading={isUndoing} disable={isLoading} color="yellow">
								<IoArrowUndoOutline size={20} />
							</Button>
						)}
					</div>
				</div>
			) : (
				<form className={classes["edit-form"]} onSubmit={handleOnUpdate}>
					<Input
						onChange={handleOnChange}
						id={`${item.id}-edit`}
						type="text"
						value={inputValue}
						style={{ flex: "1" }}
					/>
					<Button
						disable={!inputValue.trim() || isUpdating || inputValue === editValueRef.current}
						isLoading={isUpdating}
						type="submit"
					>
						<FiCornerDownLeft size={17} />
					</Button>
					<Button onClick={() => setIsEdit(false)} disable={isUpdating} color="red">
						<FiX size={17} />
					</Button>
				</form>
			)}
		</Card>
	);
};

export default TodoItem;
