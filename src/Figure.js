function Figure({imgUrl}) {
	return (
		<img src={imgUrl} alt={"Figure"} data-zoom={imgUrl}/>
	);
}

export default Figure;