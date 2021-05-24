import { FC } from "react";
import classes from "./Backdrop.module.css";

const Backdrop: FC<{ onClick: () => void }> = ({ onClick }) => {
	return <div className={classes.backdrop} onClick={onClick}></div>;
};

export default Backdrop;
