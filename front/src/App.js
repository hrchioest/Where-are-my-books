import "./App.css";
import ContentPersons from "./container/ContentPersons/ContentPersons";
import ContentBooks from "./container/ContentBooks/ContentBooks";
import ContentCategories from "./container/ContentCategories/ContentCategories";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <DataProvider>
      <Router>
        <Header />
        <Switch>
          {/* <Route exact path='/'>
            <ContentBooks />
          </Route> */}
          <Route exact path='/personas'>
            <ContentPersons />
          </Route>
          <Route exact path='/libros'>
            <ContentBooks />
          </Route>
          <Route exact path='/categorias'>
            <ContentCategories />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </DataProvider>
  );
}

export default App;
