import { useParams } from "react-router-dom";
import Word from "./Word";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export default function Day() {
    const { day } = useParams();
    // const words = useFetch(`http://localhost:3001/words?day=${day}`);
    const words = useFetch(process.env.PUBLIC_URL + '/db/data.json');

    return (
        <>
            <h2>Day {day}</h2>
            {words.length === 0 && <span>Loading...</span>}
            <table>
                <tbody>
                    {words.map(word => (
                        <Word word={word} key={word.id} />
                    ))}
                </tbody>
            </table>
        </>
    );
}