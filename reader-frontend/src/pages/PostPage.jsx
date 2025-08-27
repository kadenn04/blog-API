import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import "./PostPage.css"

async function getPost(postId) {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {mode: 'cors'});
    if (response.status >= 400) {
        throw new Error("server error");
    }
    return response.json();
}

function formatDateTime(datetime) {
    const date = new Date(datetime);
    const formatted = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        month: "short",
        day: "numeric",
        year: "numeric"
    });
    
    const [monthDay, year, time] = formatted.split(", ");
    const [month, day] = monthDay.split(" ");
    const [hourMinute, ampm] = time.split(" ")


    return (`${hourMinute} ${ampm}, ${month.toUpperCase()} ${day}, ${year}`);
}

function formatTags(tags) {
    if (!tags) {
        return <></>
    } else {
        return(
            <>
                {tags.map((tag) => {
                    return <span key={tag.id}><a href="/" className="tag-links"> {tag.name} </a> </span>
                })}
            </>
    )}
}

function Post() {
    const { postId } = useParams();
    const [post, setPost] = useState(null)
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
        <div id="page-content">
            <div id="post-header">
                <div id="post-info">
                    <div id="post-tags">
                        {formatTags(post.tags)}
                    </div>
                    <div id="post-date">
                        {formatDateTime(post.createdAt)}
                        {post.updatedAt && (post.updatedAt != post.createdAt) ? " • Edited " + formatDateTime(post.updatedAt):null}    
                    </div>
                </div>
                <div id="post-title"> {post.title} </div>
                <div id="post-subtitle"> on starting again and again</div>
                <div id="author">me!</div>
            </div>
            <div id="post-text">
                <p>{post.content}</p>
            </div>
        </div> 
    )
}

export default Post;