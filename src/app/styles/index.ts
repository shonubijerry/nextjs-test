// styles.js
import { makeStyles } from "@material-ui/core/styles";

const homeStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const profileStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: theme.palette.primary.dark,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'grid'
  },
  card: {
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(3),
    textAlign: "center",
    marginTop: theme.spacing(10)
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(2, "auto"),
    fontSize: "2.3rem",
    // backgroundColor: theme.palette.secondary.main,
  },
  socialIcons: {
    marginTop: theme.spacing(2),
  },
  logoutButton: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center', // Center the logout button horizontally
  },
  occupation: {
    textTransform: 'capitalize'
  },
}));

export { profileStyles, homeStyles };