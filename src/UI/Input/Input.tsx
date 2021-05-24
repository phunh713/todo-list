import classes from "./Input.module.css";
import { ChangeEvent, FC } from "react";

const Input: FC<{
	id: string;
	label?: string;
	type: string;
	onChange: (arg: string) => void;
	value: string;
	style?: {};
}> = ({ id, label, type, onChange, value, style }) => {
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};
	return (
		<div className={classes["form-control"]} style={style}>
			{label && <label htmlFor={id}>{label}</label>}
			<input type={type} id={id} onChange={handleOnChange} value={value} />
		</div>
	);
};

export default Input;
