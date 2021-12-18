import "./styles.css";
import Movie from "./components/movie";
import Rental from "./components/rental";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

export default function App() {
  return (
    <main className="container">
      <NavBar />
      <Switch>
        <Route path="/rental" component={Rental} />
        <Route path="/customers" component={Customers} />
        <Route path="/movies" component={Movie} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" to="movies" />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
}
