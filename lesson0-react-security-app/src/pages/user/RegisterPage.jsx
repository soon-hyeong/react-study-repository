// pages/RegisterPage.jsx
import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../config/apiConfig"; // 인터셉터가 설정된 axios 사용

const RegisterPage = () => {
	const navigate = useNavigate();

	// 폼 상태 관리
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		name: "",
	});
	// 회원가입 결과 메세지 상태 관리
	const [message, setMessage] = useState({ text: "", type: "" });
	// ajax axios 로 API 서버에 회원가입 절차 진행중인지 여부를 상태 저장
	const [loading, setLoading] = useState(false);

	// 입력 변경 처리
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// 회원가입 처리 - apiConfig 사용
	const handleSubmit = async (e) => {
		e.preventDefault(); // 기본 속성을 막는다. ajax axios 로 회원가입을 진행하기 때문
		setMessage({ text: "", type: "" }); // 가입 결과 보여주는 영역을 초기화
		setLoading(true);
		try {
			// api (axios interceptor 객체) 를 이용해 회원 가입 요청을 한다
			const response = await api.post("/api/members", formData);
			// 성공 메세지 표시
			if (response.data) {
				setMessage({
					text: "회원가입이 완료되었습니다. 로그인 페이지로 이동됩니다",
					type: "success",
				});
				// 3초 후에 로그인 페이지로 이동
				setTimeout(() => {
					navigate("/login");
				}, 3000);
			}
		} catch (error) {
			console.error("회원 가입 실패", error);
			// ApiResponseDto 의 에러 메세지 활용
			const errorMessage = error.response?.data?.message || "회원가입에 실패했습니다";
			setMessage({
				text: errorMessage,
				type: "danger",
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="row justify-content-center">
			<div className="col-md-6">
				<Card>
					<Card.Body>
						<h3 className="text-center mb-4">회원가입</h3>

						{/* 메시지 표시 (성공/실패) */}
						{message.text && <Alert variant={message.type}>{message.text}</Alert>}

						<Form onSubmit={handleSubmit}>
							{/* 아이디 입력 */}
							<Form.Group className="mb-3">
								<Form.Label>아이디</Form.Label>
								<Form.Control
									type="text"
									name="username"
									value={formData.username}
									onChange={handleChange}
									required
								/>
							</Form.Group>

							{/* 비밀번호 입력 */}
							<Form.Group className="mb-3">
								<Form.Label>비밀번호</Form.Label>
								<Form.Control
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									required
								/>
							</Form.Group>

							{/* 이름 입력 */}
							<Form.Group className="mb-3">
								<Form.Label>이름</Form.Label>
								<Form.Control
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</Form.Group>

							{/* 회원가입 버튼 */}
							<Button variant="primary" type="submit" className="w-100" disabled={loading}>
								{loading ? "가입 중..." : "회원가입"}
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default RegisterPage;
