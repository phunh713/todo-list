import { createContext, FC, useState } from "react";

const UiContext = createContext<{ initModalShown: boolean; setInitModalShown: (arg: boolean) => void }>({
	initModalShown: false,
	setInitModalShown: (arg: boolean) => {},
});

export const UiContextProvider: FC = ({ children }) => {
	const [initModalShown, setInitModalShown] = useState<boolean>(false);
	const value = {
		initModalShown: initModalShown,
		setInitModalShown: (arg: boolean) => {
			setInitModalShown(arg);
		},
	};
	return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export default UiContext