import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Portfolios from "./components/Portfolios";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/portfolios" component={Portfolios} />
        <Route path="/leaderboard" component={Leaderboard} />
      </Router>
    </>
  );
}

export default App;
