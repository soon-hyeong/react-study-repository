import React, { useState, useEffect, useRef} from 'react';

function InfiniteScroll(){
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // 여기에 다음 단계 코드들이 추가됩니다.

    return(
        // 게시글 목록
        {posts.map((post, index) =>(
            <div key={index} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
        ))}
        </div>
    );
}