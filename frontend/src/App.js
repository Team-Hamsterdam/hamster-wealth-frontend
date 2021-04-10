import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Portfolios from "./components/Portfolios";
// import Leaderboard from "./components/Leaderboard";
import About from "./components/About";
import Register from "./components/Register";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/portfolios" component={Portfolios} />
        <Route path="/about" component={About} />
      </Router>
    </>
  );
}

export default App;
