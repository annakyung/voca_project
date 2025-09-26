import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CreateDay() {
    const days = useFetch("http://localhost:3001/days");
    const navigate = useNavigate();

    function addDay() {
        fetch(`http://localhost:3001/days/`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                day : days && days.length + 1
            }),
        })
        .then(res => {
            if (res.ok) {
                alert("생성이 완료되었습니다");
                // 첫번째 페이지로 이동함
                navigate(`/`);
            }
        });
    }
    return (
        <div>
            <h3>현재 일수 : {days && days.length}일</h3>
            <button onClick={addDay}>Day 추가</button>
        </div>
    );
}