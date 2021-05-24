import { FC } from "react";
import classes from "./Card.module.css";

const Card: FC<{ style?: {} }> = ({ children, style }) => {
	return (
		<div className={classes.card} style={style}>
			{children}
		</div>
	);
};

export default Card;
