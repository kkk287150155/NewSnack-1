import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import Header from "./Header";
import TopSection from "./TopSection";
import MiddleSection from "./MiddleSection";
import BottomSection from "./BottomSection";
import { usePublicFeed } from "../apiHook";

const SplashPage = () => {
  const news = usePublicFeed("sports");

  return news ? (
    <Container>
      <Header />
      <TopSection img={news[0].imgURL} />
      <MiddleSection news={news} />
      <BottomSection news={news} />
      <Footer />
    </Container>
  ) : (
    <></>
  );
};

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 30px;
`;

export default SplashPage;
