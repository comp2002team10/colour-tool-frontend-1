import Magnifier from "react-magnifier"

function Figure({imgUrl}) {
	return (
		<Magnifier src={imgUrl} alt={"Figure"}/>
	);
}

export default Figure;