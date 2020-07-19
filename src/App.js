import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layouts/NavBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import axios from "axios";
//redux
import { Provider } from "react-redux";
import store from "./Redux/store";
import { SET_AUTHENTICATED } from "./Redux/Types";
import { logoutUser, getUserData } from "./Redux/actions/userAction";
//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import about from "./pages/about";
import user from "./pages/user";
import JWT from "jwt-decode";
import AuthRoute from "./Utill/Auth";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#ff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrast: "#ff",
    },
  },
  spreadThis: {
    typography: {
      useNextVariant: true,
    },

    invisibleSeperator: {
      border: "none",
      margin: 4,
    },
    visibleSeperator: {
      width: "100%",
      borderBottom: "1px solid rgba(0 0 0 0.1)",
      marginBottom: 20,
    },
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto 20px auto",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    button: {
      marginTop: 20,
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
    paper: {
      padding: 20,
      minHeight: 345,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        " & .button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& a": {
        color: "#00bcd4",
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.buttin": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },
});
axios.defaults.baseURL =
  "https://europe-west1-your-mind-d6382.cloudfunctions.net/api";

const token = localStorage.FbIdToken;
if (token) {
  const decodedToken = JWT(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/user/:handle" component={user} />
                <Route
                  exact
                  path="/user/:handle/mind/:mindId"
                  component={user}
                />
                <Route exact path="/about" component={about} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
