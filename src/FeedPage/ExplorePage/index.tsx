import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import NewsItem from "../HomePage/NewsItem";
import Title from "../HomePage/Title";
import Divider from "@mui/material/Divider";
import { usePublicFeed } from "../../apiHook";
import store from "../../localStorage";

const ExplorePage = () => {
  const news = usePublicFeed("sports");

  return news ? (
    <Container>
      <Title text="Today" />
      <Divider />
      {news.map((item) => {
        return (
          <NewsItem
            key={item.id}
            thumbnailSrc={item.imgURL}
            title={item.title}
            summary={item.content}
            author={item.date}
            originalURL={item.originalURL}
            isLiked={item.liked_user.includes(store.get("user").id)}
            comment={item.comment}
          />
        );
      })}
    </Container>
  ) : (
    <></>
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

export default ExplorePage;
