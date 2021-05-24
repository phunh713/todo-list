import { FC, FormEvent, useContext, useEffect, useState } from "react";
import UiContext from "../../context/ui-context";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Modal from "../../UI/Modal/Modal";
import TodoListContext from "../../context/todo-list-context";
import todoListApi from "../../api/todoListApi";
import { AxiosResponse } from "axios";
import Item from "../../model/Item";
import classes from "./InitTodoList.module.css";
import { FiCornerDownLeft } from "react-icons/fi";

interface GetListResponse {
	[listId: string]: {
		listName: string;
		todoList?: {
			[todoId: string]: {
				task: string;
				done: boolean;
			};
		};
	};
}

interface createListResponse {
	name: string;
}

const InitTodoList: FC<{ isCreateNew: boolean }> = ({ isCreateNew }) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [helperText, setHelperText] = useState<string>("");
	const uiCtx = useContext(UiContext);
	const todoListCtx = useContext(TodoListContext);

	const handleInputChange = (value: string) => {
		setInputValue(value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setHelperText("");

		if (inputValue.trim() && isCreateNew) {
			setIsLoading(true);

			const createList = async () => {
				const response: AxiosResponse<createListResponse> = await todoListApi.createList(inputValue.trim());
				todoListCtx.setTodoList(response.data.name, inputValue, []);
				setIsLoading(false);
			};

			const getList = async () => {
				const response = await todoListApi.getListByName(inputValue);

				if (response && Object.keys(response.data).length) {
					setIsLoading(false);
					return setHelperText("NAME ALREADY EXISTS");
				}

				if (response && !Object.keys(response.data).length) {
					setHelperText("");
					createList();
				}
			};

			getList();
		}

		if (inputValue.trim() && !isCreateNew) {
			setIsLoading(true);
			const getList = async () => {
				const response: AxiosResponse<GetListResponse> = await todoListApi.getListByName(inputValue.trim());
				console.log(response);
				setIsLoading(false);

				if (response && Object.keys(response.data).length) {
					const listId = Object.keys(response.data)[0];
					const listData = response.data[listId];

					const todoList = listData.todoList;
					const listName = listData.listName;

					let transformedTodoList: Item[] = [];
					if (todoList) {
						for (let item in todoList) {
							transformedTodoList.push(new Item(todoList[item].task, item, todoList[item].done));
						}
					}

					todoListCtx.setTodoList(listId, listName, transformedTodoList);
				} else if (response && !Object.keys(response.data).length) {
					setHelperText("NO LIST FOUND");
				}
			};
			getList();
		}
	};

	useEffect(() => {
		return () => {
			setInputValue("");
			setIsLoading(false);
			setHelperText("");
		};
	}, []);
	return uiCtx.initModalShown ? (
		<Modal
			header={`${isCreateNew ? "Create New List" : "Get Old List"}`}
			onClose={() => uiCtx.setInitModalShown(false)}
		>
			<form onSubmit={handleSubmit} className={classes["init-form"]}>
				<Input
					id="create-new-list"
					type="text"
					label={`${isCreateNew ? "Enter a Unique Name for your List" : "Enter your Old List Name"}`}
					onChange={handleInputChange}
					value={inputValue}
					style={{ flex: 1 }}
				/>
				<Button color="green" type="submit" isLoading={isLoading} style={{ height: 38 }}>
					<FiCornerDownLeft size={19} />
				</Button>
				<span>{helperText}</span>
			</form>
		</Modal>
	) : null;
};

export default InitTodoList;
