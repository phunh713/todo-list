import { FC } from "react";
import classes from "./Card.module.css";

const Card: FC<{ style?: {}; className?: string }> = ({ children, style, className }) => {
	return (
		<div className={`${classes.card} ${className}`} style={style}>
			{children}
		</div>
	);
};

export default Card;
