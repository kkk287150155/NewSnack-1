import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PersonIcon from "@mui/icons-material/Person";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

// Emotion을 사용하여 추가적인 스타일링을 위한 스타일 컴포넌트를 정의합니다.
const CustomCard = styled(Card)`
  overflow: hidden;
  transition: transform 200ms;
  div {
    margin: 0;
    padding: 0;
  }
  .css-uxjvco-MuiPaper-root-MuiAccordion-root.Mui-expanded {
    margin: 0;
  }
  box-shadow: none;
  background-color: transparent;
  padding: 10px;
  padding-bottom: 10px;
`;

const CustomImage = styled("img")`
  object-cover;
  transition: transform 200ms;
  border-radius: 8px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
`;

const LikedButton = styled(IconButton)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 8px;
  right: 40px;
`;

const MoreButton = styled(IconButton)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 8px;
  right: 8px;
`;

const Title = styled(Typography)`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 140% */
`;

const Author = styled(Typography)`
  color: rgba(0, 0, 0, 0.4);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 80% */
`;

const Summary = styled(Typography)`
  color: rgba(0, 0, 0, 0.5);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px; /* 113.333% */
`;

interface ComponentProps {
  title: string;
  author: string;
  summary: string;
  thumbnailSrc: string;
  isLiked?: boolean;
  originalURL: string;
  comment: string;
  toggleLike?: () => void;
}

export default function Component({
  title,
  author,
  summary,
  thumbnailSrc,
  isLiked,
  originalURL,
  comment,
  toggleLike = () => {
    console.log("test");
  },
}: ComponentProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const toggleMore = () => {
    setIsMore(!isMore);
  };
  const comments = comment.split(",");

  return (
    <CustomCard
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Wrapper>
        <CardContent
          sx={{ display: "flex", flexDirection: "row", gap: 2, p: 2 }}
        >
          <div style={{ flexShrink: 0 }}>
            <CustomImage
              alt="Thumbnail"
              height="90"
              src={thumbnailSrc}
              width="135"
              style={{
                aspectRatio: "1 / 1",
              }}
              onClick={() => {
                const openNewWindow = window.open("about:blank");
                if (openNewWindow) openNewWindow.location.href = originalURL;
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Title>{title}</Title>
            <Author>By {author}</Author>
            <Summary>{summary}</Summary>
          </div>

          {isHovered && (
            <div>
              <LikedButton aria-label="like" onClick={toggleLike}>
                {isLiked && <FavoriteIcon />}
                {!isLiked && <FavoriteBorderIcon />}
              </LikedButton>
              <MoreButton aria-label="more" onClick={toggleMore}>
                <CommentIcon />
              </MoreButton>
            </div>
          )}
        </CardContent>
        <Accordion
          expanded={isMore}
          sx={{
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            ":before": { content: "none" },
            margin: 0,
          }}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: "transparent",
              border: "none",
              display: "none",
            }}
          ></AccordionSummary>
          <AccordionDetails
            sx={{ backgroundColor: "transparent", border: "none" }}
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "transparent" }}
              aria-label="contacts"
              subheader={
                <ListSubheader sx={{ bgcolor: "transparent", padding: 0 }}>
                  댓글 요약
                </ListSubheader>
              }
            >
              {comments.map((comment) => (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={comment} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Wrapper>
    </CustomCard>
  );
}
