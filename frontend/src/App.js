import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Login} />
        {/* <Route path="/register" render={(props) => <Register />} />
        <Route path="/login" render={(props) => <Login />} />

        <Route path="/tasks" component={Tasks} />
        <Route path="/profile" component={Profile} />
        <Route path="/leaderboard" component={Leaderboard} /> */}
      </Router>
    </>
  );
}

export default App;
