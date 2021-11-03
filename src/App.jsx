import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//pages
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ResultPage from "./pages/ResultPage";
import TransitionsModal from "./components/Modal";
import CustomDrawer from "./components/CustomDrawer";
import AdminRegister from "./pages/AdminRegister";
import PageNotFound from "./pages/PageNotFound";
import CreateStudent from "./pages/CreateStudent";
import SingleStudent from "./pages/SingleStudent";
//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//redux
import { connect } from "react-redux";
import { logOutAdmin } from "./redux/admin/admin.actions";
//jwt
import jwtDecode from "jwt-decode";
import CreateMark from "./pages/CreateMark";

const App = ({ currentAdmin, logOutAdmin }) => {
  React.useEffect(() => {
    const checkAuth = () => {
      let token = currentAdmin?.token;
      if (token) {
        let decodedToken = jwtDecode(token);
        let currentDate = new Date();
        //console.log("DECODED TOKEN", decodedToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          console.log("Token expired.");
          logOutAdmin();
        }
      }
    };
    checkAuth();
  });
  return (
    <BrowserRouter>
      <Header />
      <TransitionsModal />
      {currentAdmin && <CustomDrawer />}
      <ToastContainer />
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            currentAdmin ? <Dashboard /> : <Redirect to="/result" />
          }
        />
        <Route
          exact
          path="/result"
          render={() => (currentAdmin ? <Redirect to="/" /> : <ResultPage />)}
        />
        <Route exact path="/admin/register" component={AdminRegister} />
        <Route
          exact
          path="/create-student"
          render={() =>
            currentAdmin ? <CreateStudent /> : <Redirect to="/result" />
          }
        />
        <Route
          path="/student/:studentId"
          render={() =>
            currentAdmin ? <SingleStudent /> : <Redirect to="/result" />
          }
        />
        <Route
          path="/mark/create/:studentid"
          render={() =>
            currentAdmin ? <CreateMark /> : <Redirect to="/result" />
          }
        />
        <Route path="**" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  currentAdmin: state.admin.currentAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  logOutAdmin: () => dispatch(logOutAdmin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
