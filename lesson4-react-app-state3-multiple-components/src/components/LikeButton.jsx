import { useState } from "react";
import "./LikeButton.css";

function LikeButton({ postTitle }) {
	// 좋아요 state hook : 상태관리
	const [isLiked, setIsLiked] = useState(false); // 좋아요 상태확인
	const [likeCount, setLikeCount] = useState(0); // 좋아요 카운트 상태

	//좋아요 버튼 클릭 이벤트 핸들러(담당자)
	const handleLikeClick = () => {
		setIsLiked(!isLiked); // 좋아요 상태 토글 true->false, false -> true
		if (isLiked) {
			setLikeCount(likeCount - 1); // 좋아요 취소시 -1
		} else {
			setLikeCount(likeCount + 1); // 좋아요 시에 +1
		}
	};

	// 리셋 버튼 클릭 이벤트 핸들러 : 리셋 버튼 클릭되면 실행될 함수를 정의해서 const에 정의
	const handleReset = () => {
		setIsLiked(false);
		setLikeCount(0);
	};

	return (
		<div className="like-button">
			<h2>{postTitle}좋아요 버튼</h2>

			{/* 좋아요 버튼 - 상태에 따라 스타일 변경 */}
			<button onClick={handleLikeClick} className={`like-btn ${isLiked ? "liked" : ""}`}>
				{isLiked ? "🩷" : "🤍"}
			</button>

			{/* 좋아요 개수 표시 */}
			<p className="like-count">좋아요 {likeCount}개</p>
			{/* 리셋 버튼 */}
			<button onClick={handleReset} className="reset-btn">
				리셋
			</button>
		</div>
	);
}

export default LikeButton;
