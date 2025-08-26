import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

async function getPost(postId) {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {mode: 'cors'});
    if (response.status >= 400) {
        throw new Error("server error");
    }
    return response.json();
}

function Post() {
    const { postId } = useParams();
    const [post, setPost] = useState({})
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getPost(parseInt(postId))
        .then(result => {
            setPost(result);
        }).catch(error => {
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [])

    if (error) return <p> A network error was encountered </p>
    if (!post) return <p> This post does not exist </p>

    return (
    <>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
    </>)
}

export default Post;