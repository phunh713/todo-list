import { FC } from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

const Modal: FC<{ onClose: () => void; header: string }> = ({ children, onClose, header }) => {
	const container = document.getElementById("root-modal");

	return (
		container &&
		ReactDOM.createPortal(
			<>
				<div className={classes.modal}>
					<div className={classes["modal-header"]}>
						<div className={classes["header-text"]}>
							<span>{header}</span>
						</div>
						<div className={classes["header-close"]} onClick={onClose}>
							<FiX size={25}/>
						</div>
					</div>
					{children}
				</div>
				<Backdrop onClick={onClose} />
			</>,
			container
		)
	);
};

export default Modal;
