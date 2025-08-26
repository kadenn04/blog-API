import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

async function getAllPosts() {
    const response = await fetch("http://localhost:3001/posts", {mode: 'cors'});
    const posts = await response.json();
    return posts;
}

function FrontPage() {
    const [posts, setPosts]  = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllPosts()
        .then(result => { setPosts(result); })
        .catch(err => setError(err))
        .finally(() => setLoading(false));
        
    }, [])

    if (error) return <p> An error has occurred</p>
    if (loading) return <p> Loading... </p>


    return (
        <>
            <h1>Posts: </h1>
            <ul> 
                {posts.map((post)=> {
                    return <li key={post.id}>
                        {post.title} 
                        <Link to ={"post/"+post.id}> Go </Link>
                        </li>
                })}
            </ul>
            <Outlet />
        </>
    )
}

export default FrontPage;