import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";
import store from "../../localStorage";
import SettingModal from "./SettingModal";

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
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
        },
      }}
      type={props.type ? props.type : "text"}
      variant="outlined"
      margin="dense"
      value={props.defaultValue}
    />
  );
}

export default function InitialSetup() {
  const [freq, setFreq] = React.useState(1);
  const user = store.get("user");
  const [open, setOpen] = React.useState(false);

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
        interest: user.interest,
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

  const handleOpen = (e) => {
    setOpen(true);
    handleSubmit(e);
  };
  const handleClose = () => setOpen(false);

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
        <Box
          sx={{ display: "flex-column", width: "100%", marginBottom: "1rem" }}
        >
          <Typography
            component="h1"
            variant="h4"
            style={{ fontWeight: "bold" }}
          >
            설정
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <InputField
            id="nickname"
            label="닉네임"
            defaultValue={user.nickname}
            name="nickname"
            autoComplete="nickname"
          />
          <InputField
            id="birthYear"
            label="태어난 년도"
            defaultValue={user.birthYear}
            name="birthYear"
            autoComplete="birthYear"
          />
          <InputField
            id="kakaoAddress"
            label="카카오톡 메일"
            defaultValue={user.kakaoAddress}
            name="kakaoAddress"
            autoComplete="kakaoAddress"
          />
          <Box sx={{ mt: "1rem", mb: "1rem" }}>
            <Typography
              gutterBottom
              sx={{
                fontSize: "0.8rem",
                color: "gray",
              }}
            >
              하루 수신 횟수
            </Typography>
            <Slider
              aria-label="sendFrequency"
              defaultValue={user.frequency}
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

          <SettingModal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </Box>
      </Box>
    </Container>
  );
}
