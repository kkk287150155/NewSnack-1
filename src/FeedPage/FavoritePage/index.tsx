import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import NewsItem from "../HomePage/NewsItem";
import Title from "../HomePage/Title";
import Divider from "@mui/material/Divider";
import { usePublicFeed } from "../../apiHook";
import store from "../../localStorage";

const FavoritePage = () => {
  const news = usePublicFeed("sports");
  const likedUser = news?.filter((item) => {
    return item.liked_user.includes(store.get("user").id);
  });

  return (
    <>
      <Container>
        <Title text="Favorite" />
        <Divider />
        {likedUser?.map((news, index) => {
          return (
            <NewsItem
              key={index}
              thumbnailSrc={news.imgURL}
              originalURL={news.originalURL}
              title={news.title}
              summary={news.content}
              author={news.date}
              isLiked={true}
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

const mockData = [
  {
    imgSrc: "https://picsum.photos/200/300",
    newsTitle: "뉴스 제목 1",
    newsSummary:
      "뉴스 기사 1 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe vero repudiandae deleniti vitae nam nihil officia omnis porro modi nulla laboriosam, dolorem, vel commodi nostrum, ea asperiores consequatur optio at.",
    author: "author 1",
  },
  {
    imgSrc: "https://picsum.photos/200/300",
    newsTitle: "뉴스 제목 2",
    newsSummary:
      "뉴스 기사 2 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe vero repudiandae deleniti vitae nam nihil officia omnis porro modi nulla laboriosam, dolorem, vel commodi nostrum, ea asperiores consequatur optio at.",
    author: "author 2",
  },
  {
    imgSrc: "https://picsum.photos/200/300",
    newsTitle: "뉴스 제목 3",
    newsSummary:
      "뉴스 기사 3 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe vero repudiandae deleniti vitae nam nihil officia omnis porro modi nulla laboriosam, dolorem, vel commodi nostrum, ea asperiores consequatur optio at.",
    author: "author 3",
  },
  {
    imgSrc: "https://picsum.photos/200/300",
    newsTitle: "뉴스 제목 1",
    newsSummary:
      "뉴스 기사 1 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe vero repudiandae deleniti vitae nam nihil officia omnis porro modi nulla laboriosam, dolorem, vel commodi nostrum, ea asperiores consequatur optio at.",
    author: "author 1",
  },
  {
    imgSrc: "https://picsum.photos/200/300",
    newsTitle: "뉴스 제목 2",
    newsSummary:
      "뉴스 기사 2 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe vero repudiandae deleniti vitae nam nihil officia omnis porro modi nulla laboriosam, dolorem, vel commodi nostrum, ea asperiores consequatur optio at.",
    author: "author 2",
  },
  {
    imgSrc: "https://picsum.photos/200/300",
    newsTitle: "뉴스 제목 3",
    newsSummary:
      "뉴스 기사 3 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe vero repudiandae deleniti vitae nam nihil officia omnis porro modi nulla laboriosam, dolorem, vel commodi nostrum, ea asperiores consequatur optio at.",
    author: "author 3",
  },
  {
    imgSrc: "https://picsum.photos/200/300",
    newsTitle: "뉴스 제목 1",
    newsSummary:
      "뉴스 기사 1 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe vero repudiandae deleniti vitae nam nihil officia omnis porro modi nulla laboriosam, dolorem, vel commodi nostrum, ea asperiores consequatur optio at.",
    author: "author 1",
  },
  {
    imgSrc: "https://picsum.photos/200/300",
    newsTitle: "뉴스 제목 2",
    newsSummary:
      "뉴스 기사 2 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe vero repudiandae deleniti vitae nam nihil officia omnis porro modi nulla laboriosam, dolorem, vel commodi nostrum, ea asperiores consequatur optio at.",
    author: "author 2",
  },
  {
    imgSrc: "https://picsum.photos/200/300",
    newsTitle: "뉴스 제목 3",
    newsSummary:
      "뉴스 기사 3 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe vero repudiandae deleniti vitae nam nihil officia omnis porro modi nulla laboriosam, dolorem, vel commodi nostrum, ea asperiores consequatur optio at.",
    author: "author 3",
  },
  {
    imgSrc: "https://picsum.photos/200/300",
    newsTitle: "뉴스 제목 1",
    newsSummary:
      "뉴스 기사 1 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe vero repudiandae deleniti vitae nam nihil officia omnis porro modi nulla laboriosam, dolorem, vel commodi nostrum, ea asperiores consequatur optio at.",
    author: "author 1",
  },
  {
    imgSrc: "https://picsum.photos/200/300",
    newsTitle: "뉴스 제목 2",
    newsSummary:
      "뉴스 기사 2 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe vero repudiandae deleniti vitae nam nihil officia omnis porro modi nulla laboriosam, dolorem, vel commodi nostrum, ea asperiores consequatur optio at.",
    author: "author 2",
  },
  {
    imgSrc: "https://picsum.photos/200/300",
    newsTitle: "뉴스 제목 3",
    newsSummary:
      "뉴스 기사 3 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe vero repudiandae deleniti vitae nam nihil officia omnis porro modi nulla laboriosam, dolorem, vel commodi nostrum, ea asperiores consequatur optio at.",
    author: "author 3",
  },
];
