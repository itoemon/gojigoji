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
    picture: '',
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

  return (
  <div>
    <div className={classNames(css.body)}>
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
        <a className={classNames(css.button)} alt=""
          href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657533055&redirect_uri=https://gojigoji.web.app&state=1234abcd&bot_prompt=aggressive&scope=profile%20openid%20email&`}
          >
          <img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="LINEでログイン" height="36" border="0"/>
        </a>
      </div>
      <div className={classNames(css.official_line)}>
        <a href="https://lin.ee/1Xj2SQF">
          <img className={classNames(css.button)} src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="36" border="0"/>
        </a>
      </div>
    </div>

    <div className={classNames(css.footer)}>

    </div>

  </div>
  );
};

export default Home;
