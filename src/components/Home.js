import React, { useEffect, useState, createRef } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import classNames from "classnames";
import css from "../index.module.scss";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

// import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { counterState } from "../atoms";

const Home = () => {
  const search = useLocation().search;
  const query2 = new URLSearchParams(search);
  const [user, setUser] = useState([{
    name: 'ゲストユーザー',
    picture: `${process.env.PUBLIC_URL}/img/made_in.jpg`,
    // : '',
  }]);
  const [logedIn, setLogedIn] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);

  // // POST送信
  const url = 'https://api.line.me/oauth2/v2.1/token'
  const option = {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': `${query2.get('code')}`,
        'redirect_uri' : `${encodeURI("https://gojigoji.web.app")}`,
        'client_id': '1657533055',
        'client_secret': 'a05e08108d51be250977f137a61ef88d'
    })
  }
  const getToken = async()=>{
    await fetch(url, option)
    .then(response => { 
        return response.json()
    }).then(result => {
        console.log(result);
        if (result.id_token !== undefined)
        validateToken(result.id_token);
      })
    .catch(error => {
      console.log(error)
    })
  }

  const url2 = "https://api.line.me/oauth2/v2.1/verify"
  const validateToken =async(idToken)=>{
    await fetch(url2, {
      method: 'POST',
      body: new URLSearchParams({
          'id_token': `${idToken}`,
          'client_id': '1657533055'
      })
    })
    .then(response => { 
      return response.json()
    }).then(result => {
        console.log(result);
        setUser([result]);
      })
    .catch(error => {
      console.log(error)
    })
  }
  
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if(user[0].name !== 'ゲストユーザー')
    setLogedIn(true)
  }, [user[0].name]);

  return (
  <div>
    <div className={classNames(css.body)}>
      <img className={classNames(css.title)} src={`${process.env.PUBLIC_URL}/img/title.png`} alt=''/>
      <div className={classNames(css.sentence_con)}>
        <img className={classNames(css.sentence)} src={`${process.env.PUBLIC_URL}/img/sentence.png`} alt=''/>
      </div>
      <div >
        <img 
        className={classNames(css.login_icon)} 
        src={user[0].picture} alt=''
        onClick={() => {setOpenPanel(true)}}
        />
      </div>
      <div className={classNames(openPanel? css.login_panel: css.display_none)}>
        <div 
        className={classNames(css.close_button)}
        onClick={()=>{setOpenPanel(false)}}>×</div>
        <img className={classNames(css.icon)} src={user[0].picture} alt=''/>
        <div className={classNames(css.name)}> {user[0].name} </div>
        <a className={classNames(logedIn? css.display_none: css.button)} alt=""
          href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657533055&redirect_uri=https://gojigoji.web.app&state=1234abcd&bot_prompt=aggressive&scope=profile%20openid%20email&`}
          >
          <img src={`${process.env.PUBLIC_URL}/img/btn_login_base.png`} alt="LINEでログイン" height="36" border="0"/>
        </a>
        <div className={classNames(logedIn? css.button_logout: css.display_none)}
          onClick={()=>{window.location.reload()}}>Log out</div>
      </div>
      <div className={classNames(css.flex)}>
        <div className={classNames(css.stamp_shop)}>
          <img className={classNames(css.img1)} src={`${process.env.PUBLIC_URL}/img/stamp_shop.png`} alt=''/>
          <a className={classNames(css.button)} href="https://store.line.me/stickershop/product/4220344/ja?utm_source=gnsh_stickerDetail">
            スタンプショップへいく
          </a>
          <img className={classNames(css.img2)} src={`${process.env.PUBLIC_URL}/img/normal_right.png`} alt=''/>
        </div>
        <div className={classNames(css.official_line)}>
          <img className={classNames(css.img1)} src={`${process.env.PUBLIC_URL}/img/official_line.png`} alt=''/>
          <a href="https://lin.ee/1Xj2SQF">
            <img className={classNames(css.button)} src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="36" border="0"/>
          </a>
          <img className={classNames(css.img2)} src={`${process.env.PUBLIC_URL}/img/normal_right.png`} alt=''/>
        </div>
      </div>
    </div>

    <div className={classNames(css.footer)}>
      <div className={classNames(css.link)}>公式twitter : <a className={classNames(css.link)} href="https://twitter.com/gojix2_official?s=21&t=hGKEcj6AOIz1qX66mmST_g">https://twitter.com/gojix2_official?s=21&t=hGKEcj6AOIz1qX66mmST_g</a></div>
      <div className={classNames(css.link)}>公式instagram : <a className={classNames(css.link)} href="https://instagram.com/gojigoj_kun?igshid=YmMyMTA2M2Y=">https://instagram.com/gojigoj_kun?igshid=YmMyMTA2M2Y=</a></div>
    </div>
  </div>
  );
};

export default Home;
