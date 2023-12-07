import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import store from "../localStorage";
import Kakaologin from "./KakaoLogin";
import { Divider, Input } from "@mui/material";
import { FormHelperText } from "@mui/material";
// import backgroundImage from '/background.jpg';
import { useEffect } from "react";

interface signUpResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        NewSnack
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function InputField(props: any) {
  return (
    <TextField
      required
      fullWidth
      type={props.name === "password" ? "password" : "text"}
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
      variant="outlined"
      margin="dense"
    />
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const [nameError, setNameError] = React.useState(null);
  const [emailError, setEmailError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);
  const [nonFieldError, setNonFieldError] = React.useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await fetch(
      "http://localhost:8000/api/user/dj-rest-auth/registration/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.get("name"),
          password1: data.get("password1"),
          password2: data.get("password2"),
        }),
      }
    );
    if (response.status == 201) {
      const jsonData: signUpResponse = await response.json();
      store.set("user", jsonData.user);
      store.set("email", data.get("email"));
      store.set("access_token", jsonData.access_token);
      store.set("refresh_token", jsonData.refresh_token);
      console.log(jsonData);
      navigate("/initialsetup");
    } else {
      const errorData = await response.json();
      setNameError(errorData.username);
      setEmailError(errorData.email);
      setPasswordError(errorData.password);
      setNonFieldError(errorData.non_field_errors);
    }
    useEffect(() => {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";

      return () => {
        document.body.style.background = "none";
      };
    }, []); // 빈 의존성 배열로 마운트될 때만 실행
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
          borderRadius: 4,
          boxShadow: 10,
          padding: 4,
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          style={{ fontWeight: "bold", marginBottom: "1rem" }}
        >
          회원가입
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                id="name"
                label="아이디"
                name="name"
                autoComplete="name"
                error={nameError}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                error={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                id="password"
                label="비밀번호"
                name="password"
                autoComplete="password"
                error={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                id="nickname"
                label="닉네임"
                name="nickname"
                autoComplete="nickname"
              />
            </Grid>
          </Grid>
          <FormHelperText error={nonFieldError ? true : false}>
            {nonFieldError ? nonFieldError : null}
          </FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            회원가입
          </Button>
          <Divider sx={{ mt: 0, mb: 2 }}> OR </Divider>
          <Kakaologin type="signup" />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                이미 계정이 있으신가요? 로그인
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Container>
  );
}
