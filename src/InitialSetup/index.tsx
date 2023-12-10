import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";
import store from "../localStorage";

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];

function InputField(props: any) {
  return (
    <TextField
      fullWidth
      id={props.id}
      label={props.label}
      name={props.name}
      autoComplete={props.autoComplete}
      error={props.error ? true : false}
      helperText={props.error ? props.error : null}
      InputProps={{
        style: {
          borderRadius: "10px",
        }
      }}
      type={props.type ? props.type : "text"}
      variant="outlined"
      margin="dense"
    />
  )
}

export default function InitialSetup() {
  const [freq, setFreq] = React.useState(1);
  const [interest, setInterest] = React.useState<string[]>([]);
  const interestList = [
    { ko: "정치", en: "politics" },
    { ko: "사회", en: "society" },
    { ko: "국제", en: "international" },
    { ko: "과학", en: "science" },
    { ko: "경제", en: "economy" },
    { ko: "스포츠", en: "sports" },
    { ko: "트렌드", en: "trend" },
  ];
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await fetch("http://localhost:8000/api/user/initialize/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${store.get("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: data.get("nickname"),
        birthYear: data.get("birthYear"),
        interest: interest,
        kakaoIsLinked: true,
        emailIsLinked: true,
        kakaoAddress: data.get("kakaoAddress"),
        emailAddress: store.get("email"),
        frequency: freq,
        receptTime: ["09:00"],
      }),
    });
    if (response.ok) {
      navigate("/feed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: 'flex-column', width: "100%", marginBottom: "1rem" }}>
          <Typography component="h1" variant="h4" style={{ fontWeight: 'bold' }}>
            설정
          </Typography>
          <Typography variant="subtitle1"
            sx={{
              fontSize: '0.8rem',
              color: 'gray',
              lineHeight: '1.5'
            }}>
            뉴스낵 이용을 위해 몇 가지 정보를 입력해주세요.
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <InputField id="nickname" label="닉네임" name="nickname" autoComplete="nickname" />
          <InputField id="birthYear" label="태어난 년도" name="birthYear" autoComplete="birthYear" />
          <InputField id="kakaoAddress" label="카카오톡 메일" name="kakaoAddress" autoComplete="kakaoAddress" />
          <Box sx={{ mt: "1rem", mb: "1rem" }} >
            <Typography gutterBottom
              sx={{
                fontSize: '0.8rem',
                color: 'gray'
              }}>
              하루 수신 횟수
            </Typography>
            <Slider
              aria-label="sendFrequency"
              defaultValue={1}
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={5}
              value={freq}
              onChange={(e) => {
                if (e && e.target) {
                  const target = e.target as HTMLInputElement;
                  setFreq(Number(target.value));
                }
              }}
            />

          </Box>

          <Box sx={{ mt: "1rem", mb: "1rem" }} >
            <Typography gutterBottom
              sx={{
                fontSize: '0.8rem',
                color: 'gray'
              }}>
              관심사
            </Typography>
            <FormGroup row>
              {interestList.map((item) => {
                return (
                  <FormControlLabel
                    key={item.ko}
                    onChange={(e) => {
                      if ((e.target as HTMLInputElement).checked === true) {
                        setInterest([...interest, item.en]);
                      } else {
                        setInterest(
                          interest.filter((inter) => inter !== item.en)
                        );
                      }
                    }}
                    control={<Checkbox />}
                    label={item.ko}
                  />
                );
              })}
            </FormGroup>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            제출
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
