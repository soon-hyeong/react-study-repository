import React from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

const App = () => {
	return (
		<BrowserRouter>
			<div className="app">
				<Navbar>
					{/* Navbar에서 아래와 같이 Link 가 정의되어 있음
				<Link to="/" className="nav-link">홈</Link>
				<Link to="/contact" className="nav-link">연락처</Link>
				<Link to="/about" className="nav-link">소개</Link>
				*/}
				</Navbar>
				<main className="app-content">
					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route path="/about" element={<About />}></Route>
						<Route path="/contact" element={<Contact />}></Route>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
};

export default App;
