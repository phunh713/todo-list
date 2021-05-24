import {  FiRotateCw } from "react-icons/fi";
import classes from "./Loading.module.css";

const Loading = () => {
	return (
		<div className={classes['loading-wrapper']}>
			<FiRotateCw size={19}/>
		</div>
	);
};

export default Loading;
