import { useState, useEffect } from "react";
import store from "../localStorage";

export interface PrivateNewsResponse {
  id: number;
  title: string;
  content: string;
  comment: string;
  originalURL: string;
  date: string;
  user: number;
  imgURL: string;
  likeOrDislike: number;
}

export interface PublicNewsResponse {
  id: number;
  title: string;
  content: string;
  comment: string;
  originalURL: string;
  date: string;
  interest: string;
  imgURL: string;
  liked_user: number[];
  disliked_user: number[];
}

export interface UserInfoRespnose {
  id: number;
  username: string;
  nickname: string;
  birthYear: number;
  kakaoIsLinked: boolean;
  emailIsLinked: boolean;
  kakaoAddress: string;
  emailAddress: string;
  frequency: number;
  receptTime: string;
}

const url = "https://48fb9690-7d5e-4251-81e4-5672eb698679.mock.pstmn.io";

const usePrivateFeed = () => {
  const [news, setNews] = useState<PrivateNewsResponse[]>([]);
  useEffect(() => {
    fetch(url + "/api/feed/private/list", {
      headers: {
        Authorization: `Bearer ${store.get("access_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
      });
  }, []);
  return news;
};

const usePublicFeed = (interests: string) => {
  const [news, setNews] = useState<PublicNewsResponse[]>();
  useEffect(() => {
    fetch(url + `/api/feed/public/list?interest=${interests}`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
      });
  }, []);
  return news;
};

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoRespnose>();
  useEffect(() => {
    fetch("url" + "/api/user/dj-rest-auth/user/", {
      headers: {
        Authorization: `Bearer ${store.get("access_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, []);
  return userInfo;
};

export { usePrivateFeed, useUserInfo, usePublicFeed };
