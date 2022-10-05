import React, { useEffect, useState, createRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import css from "../index.module.scss";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
// import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { counterState } from "../atoms";



const Page2 = () => {
  const [ count , setCount ]= useRecoilState(counterState)

  const countUp = () => {
    setCount((current) => {
      const future = JSON.parse(JSON.stringify(current));
      future["count"] = current["count"] + 1;
      return future;
    });
  };

  const countDown = () => {
    setCount((current) => {
      const future = JSON.parse(JSON.stringify(current));
      future["count"] = current["count"] - 1;
      return future;
    });
  };

  const [img, setImg] = useState("")
  const handleChange =(event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <p>ほーむぺーじ2</p>
      <div>カウンター</div>
      <div onClick={countUp}>+</div>
      <div onClick={countDown}>-</div>
      <div>{count.count}</div>
      <Link to={"/Home"}>もどる</Link>
      <input type='file' onChange={(e)=>handleChange(e)}></input>
      <img src={img} alt=""/>
    </div>
  );
};

export default Page2;
