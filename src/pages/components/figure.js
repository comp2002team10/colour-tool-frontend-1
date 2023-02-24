import Magnifier from "react-magnifier"

export default function Figure({imgUrl}) {
	return (
		<Magnifier src={imgUrl} alt={"Figure"}/>
	);
}