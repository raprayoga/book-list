import routes from "./routers/routes"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import './App.css';
import { useLocation } from "react-router-dom";
import { initiateLocalStorage } from "stores/ManageCollection";

import BottomNavigate from './components/organisms/BottomNavigate'
import Navbar from "components/organisms/Navbar";
import Header from "components/organisms/Header";

const history = createBrowserHistory();

function WithBottomNavigate() {
  const location = useLocation()
  const myLocation = location.pathname.split('/')

  return (
    myLocation[1] != 'detail' &&
    <BottomNavigate />
  )
}

function App() {
  initiateLocalStorage()
  
  return (
    <Router history={history} basename="/books-list">
      <Navbar />
      <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={route.element}
            />
          ))}
        </Routes>
      <WithBottomNavigate />
    </Router>
  );
}

export default App;
