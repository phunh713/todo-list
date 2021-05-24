import { FC } from "react";

const Section: FC<{ style: any }> = ({ children, style }) => {
	return <section style={{...style}}>{children}</section>;
};

export default Section;
