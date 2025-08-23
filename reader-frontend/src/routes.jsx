import Post from "./Post.jsx"
import FrontPage from "./FrontPage.jsx"
import ErrorPage from './ErrorPage.jsx';
import Layout from "./Layout.jsx"


const routes = [
  {
    path: "/", 
    element: <Layout/>,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <FrontPage/>},
      {path: "post/:postId", element: <Post/>}
    ]
  },
]


export default routes; 