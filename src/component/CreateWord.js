import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CreateWord() {
    const days = useFetch("http://localhost:3001/days");
    const navigate = useNavigate();
    // isLoading 상태 생성
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(e) {
        e.preventDefault(); // 기본 새로고침 막아줌

        // isLoading이 false일 때(로딩중 아닐 때) 단어 출력
        if (!isLoading) {
            // 단어 출력 전에는 로딩중이므로 true
            setIsLoading(true);
            fetch(`http://localhost:3001/words/`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    day : dayRef.current.value,
                    eng : engRef.current.value,
                    kor : korRef.current.value,
                    isDone : false
                }),
            })
            .then(res => {
                if (res.ok) {
                    alert("생성이 완료되었습니다");
                    navigate(`/day/${dayRef.current.value}`);
                    // 단어 출력 후에는 로딩완료이므로 false
                    setIsLoading(false);
                }
            });
        }
    }

    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);

    return (
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>Eng</label>
                <input type="text" placeholder="computer" ref={engRef} />
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type="text" placeholder="컴퓨터" ref={korRef} />
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>
                    {days && days.map(day => (
                        <option key={day.id} value={day.day}>
                            {day.day}
                        </option>
                    ))}
                </select>
            </div>
            <button
                style={{
                    // 로딩중일 때 버튼 투명도를 0.3 아닐 때는 1
                    opacity : isLoading ? 0.3 : 1,
                }}
            >
                {/* 로딩중일 때는 Saving... 아닐 때는 저장 */}
                {isLoading ? "Saving..." : "저장"}
            </button>
        </form>
    );
}