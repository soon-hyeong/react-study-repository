import React from "react";

const App = () => {
	const handleClick = () => {
		alert("React처럼 이벤트 처리");
		console.log("화살표 함수로 이벤트 처리");
	};
	return (
		<div>
			<button id="btn">button</button>
			<script>document.getElementById("btn").addEventListener("click", ${handleClick});</script>
		</div>
	);
};

export default App;
