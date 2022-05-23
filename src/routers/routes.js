import SearchBook from "components/pages/SearchBook";
import Detail from "components/pages/Detail";
import Favorite from "components/pages/Favorite";

const routes = [{
    path: "/",
    exact: true,
    element: <SearchBook />
  },
  {
    path: "/favorite",
    exact: true,
    element: <Favorite />
  },
  {
    path: "/detail/:id",
    element: <Detail />
  }
];

export default routes