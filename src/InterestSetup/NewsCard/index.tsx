import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface NewsCardProps {
  imgSrc: string;
  newsTitle: string;
  newsSummary: string;
  like: number;
  onClick: () => void;
}

export default function NewsCard({
  imgSrc,
  newsTitle,
  newsSummary,
  like,
  onClick,
}: NewsCardProps) {
  return (
    <Card sx={{ minWidth: 345, maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={imgSrc} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {newsTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {newsSummary}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites" onClick={onClick}>
            {like === 1 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
