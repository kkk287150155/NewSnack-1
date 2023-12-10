import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import store from "../localStorage";
import Kakaologin from "./KakaoLogin";
import { Divider, Input } from "@mui/material";
import { FormHelperText } from "@mui/material";

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
      type={props.type ? props.type : "text"}
      variant="outlined"
      margin="dense"
    />
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const [nameError, setNameError] = React.useState(null);
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
      store.set("access_token", jsonData.access_token);
      store.set("refresh_token", jsonData.refresh_token);
      console.log(jsonData);
      navigate("/initialsetup");
    } else {
      const errorData = await response.json();
      setNameError(errorData.username);
      setPasswordError(errorData.password);
      setNonFieldError(errorData.non_field_errors);
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
          borderRadius: 4,
          boxShadow: 10,
          padding: 4,
        }}
      >
        <Box
          sx={{ display: "flex-column", width: "100%", marginBottom: "1rem" }}
        >
          <Typography
            component="h1"
            variant="h4"
            style={{ fontWeight: "bold", width: "100%" }}
          >
            회원가입
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "0.8rem",
              color: "gray",
              lineHeight: "1.5",
            }}
          >
            뉴스낵의 회원이 되시면, 더 많은 기능을 이용하실 수 있습니다.
          </Typography>
        </Box>

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
                id="password1"
                label="비밀번호"
                name="password1"
                autoComplete="password1"
                error={passwordError}
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                id="password2"
                label="비밀번호 확인"
                name="password2"
                autoComplete="password2"
                error={passwordError}
                type="password"
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
