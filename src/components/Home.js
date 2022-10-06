import React, { useEffect, useState, createRef } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";
import css from "../index.module.scss";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
// import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";


const Home = () => {
  const params = useParams();  
  return (
  <div>
    <a href="https://lin.ee/1Xj2SQF">
      <img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="36" border="0"/>
    </a>
    <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657533055&redirect_uri=https://gojigoji.web.app&state=1234asdg&bot_prompt=aggressive&scope=profile%20openid%20email&"
      alt="">
        ログイン
    </a>
    {/* <div class="line-it-button" data-lang="ja" data-type="friend" data-env="REAL" data-count="true" data-home="true" data-lineId="@443jtuss" style="display: none;"></div>
      <script src="https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js" async="async" defer="defer"></script> */}
    <div>{params}</div>
  </div>
  );
};

export default Home;
