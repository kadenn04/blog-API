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
      {index: true, element: <FrontPage/>, handle: {title: "Home"}},
      {path: "post/:postId", element: <PostPage/>, handle: {title: "Post"}}
    ]
  },
]


export default routes; 