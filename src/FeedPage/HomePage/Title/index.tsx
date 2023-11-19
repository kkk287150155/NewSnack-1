import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";


const DateTitle = styled(Typography)`
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: 28px; /* 140% */
`;

const Title = ({ date }: { date: string }) => {
  
  return (<DateTitle>{date}</DateTitle>)
};

export default Title;
