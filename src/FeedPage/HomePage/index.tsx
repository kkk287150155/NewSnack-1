import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import NewsItem from "./NewsItem";
import Title from "./Title";
import SubTitle from "./SubTitle";
import Divider from "@mui/material/Divider";
import {
  PrivateNewsResponse,
  usePrivateFeed,
  useUserInfo,
} from "../../apiHook";
import store from "../../localStorage";
import { useState } from "react";

const HomePage = () => {
  const [render, setRender] = useState(false);
  const news = usePrivateFeed();
  const userInfo = useUserInfo();
  store.set("user", userInfo);

  const toggleLike = (item: PrivateNewsResponse) => {
    news.find((newsItem) => newsItem.id === item.id)!.likeOrDislike =
      item.likeOrDislike === 1 ? 0 : 1;
    setRender(!render);
    fetch(`http://localhost:8000/api/feed/private/${item.id}/like-or-dislike`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${store.get("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likeOrDislike: 1,
      }),
    });
  };

  return (
    <Container>
      <Title text="Feed" />
      <Divider />
      <NewsItemContainer>
        <SubTitle label="News" />

        {news.map((item) => {
          return (
            <NewsItem
              key={item.id}
              thumbnailSrc={item.imgURL}
              title={item.title}
              summary={item.content}
              author={item.date}
              originalURL={item.originalURL}
              isLiked={item.likeOrDislike === 1}
              toggleLike={() => toggleLike(item)}
              comment={item.comment}
            />
          );
        })}
      </NewsItemContainer>

      {/* <NewsItemContainer>
        <SubTitle label="Youtube" />

      {YoutubeMockData.map((news) => {
        return (
          <NewsItem
            key={news.newsTitle}
            thumbnailSrc={news.imgSrc}
            title={news.newsTitle}
            summary={news.newsSummary}
            author={news.author}
          />
        );
      })}
      </NewsItemContainer> */}
    </Container>
  );
};

const Container = styled(Box)`
  display: flex;
  max-width: 60%;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: 4rem auto 5rem auto;
  gap: 30px;
`;

const NewsItemContainer = styled(Box)`
  gap: 15px;
`;

export default HomePage;
