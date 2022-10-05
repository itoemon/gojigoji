import React, { useEffect, useState, createRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import css from "../index.module.scss";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
// import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";


const Home = () => {

  return (
  <div>
    <a href="https://lin.ee/1Xj2SQF">
      <img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="36" border="0"/>
    </a>
    {/* <div class="line-it-button" data-lang="ja" data-type="friend" data-env="REAL" data-count="true" data-home="true" data-lineId="@443jtuss" style="display: none;"></div>
      <script src="https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js" async="async" defer="defer"></script> */}
  </div>
  );
};

export default Home;
