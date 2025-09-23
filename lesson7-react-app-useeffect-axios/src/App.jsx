import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
/*
	마운트 시점 useEffect 실행 ( 의존성 빈 배열은 마운트 시에 한번 수행 )
	-> useEffect 첫번째 인자( loadProducts() 실행 )의 함수가 실행되면서
	   API Server의 상품 리스트를 조회해서 가져옴
*/

// API Server 기본 설정
const API_BASE_URL = "http://localhost:8080/api/products";

const App = () => {
	// useState hook 으로 ajax 요청중인지를 저장
	// loading : 상태 변수, setLoading : 상태함수
	const [loading, setLoading] = useState(false); // API 서버 요청중일때는 요청중이라는 메세지 또는 이미지를 제공해야 함
	// useState hook으로 상품 리스트를 저장
	const [products, setProducts] = useState([]); // 상품 리스트 변경시 리렌더링되어야 함

	// useEffect hook을 이용해 lifecycle의 mount 단계에서 API Server의 상품 리스트를 가져온
	// 의존성 배열은 비내열을 할당해서 마운트 시점에 상품리스트 데이터 로딩이 한번만 수행되도록 한다
	useEffect(() => {
		loadProducts(); // 초기 데이터 즉 API Server에서 상품 리스트를 가져오도록 한다
	}, []);

	// 상품릿트를 ajax로 API 서버에서 조회하는 기능을 가진 함수
	const loadProducts = async () => {
		setLoading(true);
		try {
			const response = await axios.get(API_BASE_URL);
			setProducts(response.data); //useState hook 에서 제공한 (위에 정의) setProducts 상태 함수를 실행해 리렌더링 -> API Server 에서 받아온 상품 리스트를 화면에 보여지게 한다
			console.log("상품 로딩 완료");
		} catch (error) {
			console.log("로딩 실패:", error);
		} finally {
			setLoading(false);
		}
	};
	// 상품 추가시 실행될 함수 (API Server에 등록할 상품 정보 전달)
	// productData : 상품등록폼에 저장된 상품 정보 객체
	const addProduct = async (productData) => {
		try {
			const response = await axios.post(API_BASE_URL, productData);
			console.log("상품등록 OK", response.data);
			// 상품 등록이 성공되면 상품리스트에 추가 상품을 새배열 마지막에 추가해 state에 할당 -> 리렌더링 -> ProductList component에 새로운 props(상품리스트) 전달 -> 리스트 갱신
			// state Hook : 기존 배열 이용, 새 항목 추가 후 새 배열 할당
			// setProducts([...products, response.data]);
			// 위의 setProducts로 리스트 업데이트 하는 방식은 다른 사용자들이 등록한 상품리스트를 볼 수는 없는 구조
			// 아래와 같이 새롭게 API Server에 접속해서 상품리스트를 가지고 와 업데이트하는 것이 맞음
		} catch (error) {
			console.error("상품 등록 실패:", error);
		}
	};

	return (
		<div className="app">
			<h1>useEffect + Axios 학습</h1>
			{loading ? (
				<div className="loading">로딩 중...</div>
			) : (
				// axios로 api server에서 받아온 상품리스트를 props로 전달한다
				<ProductList products={products}></ProductList>
			)}
			<ProductForm onSubmit={addProduct} />
		</div>
	);
};

export default App;
