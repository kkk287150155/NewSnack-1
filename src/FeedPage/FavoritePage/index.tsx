import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import NewsItem from "../HomePage/NewsItem";
import Title from "../HomePage/Title";
import Divider from "@mui/material/Divider";
import { useLikedFeed } from "../../apiHook";

const FavoritePage = () => {
  const { publicNews, privateNews } = useLikedFeed();

  return (
    <>
      <Container>
        <Title text="Favorite" />
        <Divider />
        {publicNews?.map((item, index) => {
          return (
            <NewsItem
              key={index}
              thumbnailSrc={item.imgURL}
              originalURL={item.originalURL}
              title={item.title}
              summary={item.content}
              author={item.date}
              isLiked={true}
              comment={item.comment}
            />
          );
        })}
        {privateNews?.map((item, index) => {
          return (
            <NewsItem
              key={index}
              thumbnailSrc={item.imgURL}
              originalURL={item.originalURL}
              title={item.title}
              summary={item.content}
              author={item.date}
              isLiked={true}
              comment={item.comment}
            />
          );
        })}
      </Container>
    </>
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

export default FavoritePage;
