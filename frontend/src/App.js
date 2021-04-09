import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Portfolios from "./components/Portfolios";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/portfolios" component={Portfolios} />
      </Router>
    </>
  );
}

export default App;
