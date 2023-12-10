import { usePublicFeed } from "../apiHook";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import NewsCard from "../InitialSetup/NewsCard";
import store from "../localStorage";

const InterestSetup = () => {
  const news = usePublicFeed("sports");
  const navigate = useNavigate();
  const [like, setLike] = React.useState(Array(8).fill(0));
  const onClick = () => {
    navigate("/feed");
  };

  const newsList = news?.slice(0, 20)?.map((newsItem, index) => {
    return (
      <NewsCard
        imgSrc={newsItem.imgURL}
        newsTitle={newsItem.title}
        newsSummary={newsItem.content}
        like={like[index]}
        onClick={() => {
          const newLike = [...like];
          newLike[index] = newLike[index] === 1 ? 0 : 1;
          setLike(newLike);
          fetch(
            `http://localhost:8000/api/feed/public/${newsItem.id}/like-or-dislike`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${store.get("access_token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                likeOrDislike: 1,
              }),
            }
          );
        }}
      ></NewsCard>
    );
  });

  const toggleLike = (item) => {};

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex-column",
            width: 1440,
            marginBottom: "1rem",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            style={{ fontWeight: "bold" }}
          >
            관심사 설정
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              marginTop: 1,
              fontSize: "1rem",
              color: "gray",
              lineHeight: "1.5",
            }}
          >
            관심가는 뉴스에 좋아요를 클릭하세요.
          </Typography>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
              width: 1440,
            }}
          >
            {newsList}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: 1440 }}
            onClick={onClick}
          >
            완료
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default InterestSetup;
