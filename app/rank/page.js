"use client";
import { useSelector, useDispatch } from "react-redux";

export default function Rank() {
    let a = useSelector((state) => {
        return state.user;
    });
    console.log(a);

    return <div>{a}</div>;
}
