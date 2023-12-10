import styled from "@emotion/styled";
import FooterLabel from "./FooterLabel";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import store from "../../localStorage";

const Footer = () => {
  return (
    <Container>
      <FooterLabel label="About Us" />
      <FooterLabel label="Contact Us" />
      <FooterLabel label="Terms of Service" />
      <div
        onClick={() => {
          fetch("http://127.0.0.1:8000/api/kuser/kakao/send-to-me/", {
            headers: {
              Authorization: `Bearer ${store.get("access_token")}`,
            },
          });
        }}
      >
        <FooterLabel label="Privacy Policy" />
      </div>
    </Container>
  );
};

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  gap: 40px;
  padding: 20px;
  background: #fff;
  box-shadow: 0px -6px 4px -6px rgba(0, 0, 0, 0.12);
`;

export default Footer;
