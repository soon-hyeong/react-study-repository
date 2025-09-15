import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// index.html의 root div 를 찾아서 렌더링(화면이 보여지게 합니다)
createRoot(document.getElementById("root")).render(
	// StrictMode : 개발 모드에만 작동, 오류에 대한 사전 테스트
	<StrictMode>
		<App />
	</StrictMode>
);
