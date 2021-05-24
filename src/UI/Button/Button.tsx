import { FC, MouseEvent } from "react";
import Loading from "../Loading/Loading";
import classes from "./Button.module.css";

const Button: FC<{
	style?: any;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	isLoading?: boolean;
	disable?: boolean;
	color?: "green" | "blue" | "yellow" | "red";
}> = ({ style, children, type = "button", onClick, isLoading = false, disable = false, color }) => {
	const handleClick = (e: MouseEvent) => {
		if (onClick) onClick();
	};

	return (
		<button
			style={{ ...style }}
			className={`${classes.button} ${color ? classes[color] : null}`}
			onClick={handleClick}
			type={type}
			disabled={disable}
		>
			{isLoading ? <Loading /> : <span>{children}</span>}
		</button>
	);
};

export default Button;
