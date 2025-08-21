import { useEffect, useState } from "react";

async function getAllPosts() {
    const response = await fetch("http://localhost:3001/posts", {mode: 'cors'});
    const posts = await response.json();
    return posts;
}

function FrontPage() {
    console.log("hi");
    const [posts, setPosts]  = useState([]);

    useEffect(() => {
        getAllPosts().then(result => { setPosts(result); });
        
    }, [])

    return (
        <>
            <h1>Posts: </h1>
            <ul> 
                {posts.map((post)=> {
                    return <li key={post.id}>{post.title}</li>
                })}
            </ul>
        </>
    )
}

export default FrontPage;