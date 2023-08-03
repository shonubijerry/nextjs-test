"use client";
import { useState, FormEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import secureLocalStorage from "react-secure-storage";

import { apiPost, isAuthenticated } from "./util";
import { homeStyles } from "./styles";

export default function Home() {
  const classes = homeStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const tokenRef = useRef<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let localToken = secureLocalStorage.getItem("token") as string
      
      tokenRef.current = localToken;
      if (isAuthenticated(tokenRef.current)) {
        router.push("/profile");
      }
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    const res = await apiPost<{ token: string }>({
      url: "/api/login",
      body: { username, password },
      config: {},
      successMsg: "Login successful",
      errorMsg: "Invalid username or password",
    });

    // save the token to local storage if no errors
    if (res) {
      if (typeof window !== "undefined" && window.localStorage)
        secureLocalStorage.setItem("token", res.token);
      tokenRef.current = res.token;
      router.push("/profile");
    }
  };

  if (isAuthenticated(tokenRef.current)) {return <div></div>}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
