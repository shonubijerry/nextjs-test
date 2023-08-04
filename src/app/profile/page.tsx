"use client";
import { useState, useEffect, MouseEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  CardContent,
  Card,
  IconButton,
} from "@material-ui/core";

import { apiGet, isAuthenticated, stringAvatar, stringToColor } from "../util";
import { User, defaultUser } from "../types";
import { Facebook, LinkedIn, Twitter } from "@material-ui/icons";
import { profileStyles } from "../styles";
import Preloader from "../componenets/preloader";

export default function Page() {
  const classes = profileStyles();
  let [user, setUser] = useState<User>(defaultUser);
  let [isLoading, setAPIFetching] = useState(true);
  const tokenRef = useRef<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    // get token from local storage on page load
    let localToken = null;
    if (typeof window !== "undefined" && window.localStorage) {
      localToken = localStorage.getItem("token") as string;
      tokenRef.current = localToken;
    }

    // check if token exists and equals '123' i.e user is authenticated
    if (!isAuthenticated(tokenRef.current)) {
      router.push("/");
    } else {
      // fetch the user profile if authenticated
      const fetchData = async () => {
        try {
          const userData = await apiGet<User>({
            url: "/api/profile",
            config: {
              headers: {
                Authorization: JSON.stringify({ token: tokenRef.current }),
              },
            },
            errorMsg: "Fetch error",
          });
          setUser(userData as User);
          setAPIFetching(false)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }

  }, [router]);

  const handleLogout = async () => {
    // e.preventDefault();

    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.clear();
      tokenRef.current = null;
    }
    router.push("/");
  };

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              {isLoading ? 
              ( <Preloader /> ) : 
              (
                <div>
                  <Avatar
                    className={classes.avatar}
                    style={{ backgroundColor: stringToColor(user.firstname) }}
                  >
                    {stringAvatar(user.firstname, user.lastname)}
                  </Avatar>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {user.firstname} {user.lastname}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {user.email}
                  </Typography>
                  <Typography
                    className={classes.occupation}
                    color="textSecondary"
                    gutterBottom
                  >
                    {user.occupation}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu ultricies nisi. Nullam euismod arcu eu risus pharetra, et
                    pellentesque elit accumsan. Nulla facilisi. Sed et lectus
                    sit amet neque pharetra euismod.
                  </Typography>
                  <div className={classes.socialIcons}>
                    {/* Social Buttons */}
                    <IconButton aria-label="Twitter" color="primary">
                      <Twitter />
                    </IconButton>
                    <IconButton aria-label="Facebook" color="primary">
                      <Facebook />
                    </IconButton>
                    <IconButton aria-label="LinkedIn" color="primary">
                      <LinkedIn />
                    </IconButton>
                  </div>
                  <div className={classes.logoutButton}>
                    {/* Logout Button */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
