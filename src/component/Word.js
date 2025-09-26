import { useState } from "react";

// word : w => props로 넘어온 word를 w라는 변수명으로 사용하겠다는 뜻
export default function Word({ word : w }) {
    // 처음에는 뜻이 안보이도록 false
    const [word, setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone);

    // 뜻 버튼 클릭 시 실행되는 함수
    function toggleShow() {
        setIsShow(!isShow);
    }

    // 체크박스 클릭 시 실행되는 함수
    function toggleDone() {
        // setIsDone(!isDone);
        fetch(`http://localhost:3001/words/${word.id}`, {
            method : "PUT",
            headers : {
                // Content-Type : 보내는 리소스의 타입
                // 문자열, html, 이미지 등 여러가지가 있지만
                // 우리는 json 형태로 보내기 때문에 이렇게 함
                "Content-Type" : "application/json",
            },
            // 단순히 데이터를 가지고 오는 GET과는 다르게
            // PUT은 수정을 위한 정보를 실어서 보내줘야 함
            // 그것들을 body에 입력함
            // json 문자열로 변환하기 위해서 JSON.stringify 사용함
            body : JSON.stringify({
                // 기존 데이터에
                ...word,
                // isDone을 바꿔서 넣어라
                isDone : !isDone
            }),
        })
        .then(res => {
            // 응답이 ok면 상태를 바꿔라
            if (res.ok) {
                setIsDone(!isDone);
            }
        });
    }

    function del() {
        if (window.confirm('삭제하시겠습니까?')) {
            fetch(`http://localhost:3001/words/${word.id}`, {
                method : "DELETE",
                // 여기까지 작성하고 테스트 해보면 변화된게 없음
                // 새로고침 또는 나갔다들어와야 상태가 변경된게 보임
                // 실제로 단어는 삭제됐지만 단어 리스트를 다시 그려주지 않았기 때문
                // 삭제 요청하고 ok응답 받으면 컴포넌트 재렌더링 해줘야 단어 삭제된게 표시됨
            })
            .then(res => {
                // 응답이 ok면(삭제되면) word의 id를 0으로 변경해라
                if (res.ok) {
                    setWord({ id : 0 });
                }
            });
        }
    }

    if (word.id === 0) {
        // 화면에서 컴포넌트 자체를 제거함
        return null;
    }

    return (
        <tr className={isDone ? "off" : ""}>
            <td>
                <input type="checkbox" checked={isDone} onChange={toggleDone} />
            </td>
            <td>{word.eng}</td>
            {/* isShow일 때만 뜻이 보여짐 */}
            <td>{isShow && word.kor}</td>
            <td>
                <button onClick={toggleShow}>
                    뜻 {isShow ? "숨기기" : "보기"}
                </button>
                <button onClick={del} className="btn_del">삭제</button>
            </td>
        </tr>
    );
}