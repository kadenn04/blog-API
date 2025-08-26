import PostPage from "./PostPage.jsx"
import FrontPage from "./FrontPage.jsx"
import ErrorPage from './ErrorPage.jsx';
import Layout from "../layout/Layout.jsx"


const routes = [
  {
    path: "/", 
    element: <Layout/>,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <FrontPage/>},
      {path: "post/:postId", element: <PostPage/>}
    ]
  },
]


export default routes; 