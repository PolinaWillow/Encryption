import 'bootstrap'
import {Main} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";

export const App = () => {
  return (
      <Router>
        <div className="container">
          <Main/>
        </div>
      </Router>
  );
}
