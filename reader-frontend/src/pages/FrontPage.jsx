import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FrontPage.css"

async function getAllPosts() {
    const response = await fetch("http://localhost:3001/posts", {mode: 'cors'});
    const posts = await response.json();
    posts.map((post) => {
        post.type = "post";
    })
    return posts;
}

async function getAllNotes() {
    const response = await fetch("http://localhost:3001/notes", {mode: 'cors'});
    const notes = await response.json();
    notes.map((note) => {
        note.type = "note";
    })
    return notes;
}

async function getContent() {
    const posts = await getAllPosts();
    const notes = await getAllNotes();
    let content = posts.concat(notes);
    return content;

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


    return (`${month} ${day}, ${year} at ${time}`);
}

function formatTags(tags) {
    if (!tags) {
        return null
    } else {
        return(   
                tags.map((tag, idx) => {
                    return <span key={tag.id ?? idx}><a href="/" className="tag-links"> {tag.name} </a> </span>
                })
    )}
}

function NotePreview(props) {
    return(
        <div className="note-preview">
            <div className="note-left">
                n
            </div>
            <div className="note-right">
                <div className="note-header">
                    <div className="note-date">{formatDateTime(props.note.createdAt)}</div>
                    <div className="note-tags">{formatTags(props.note.tags)}</div>
                </div>
                <div className="note-content">{props.note.content}</div>
            </div>
        </div>
    )
}

function PostBlurb(props) {
    const { title, subtitle, id } = props.post;
    console.log(props.post);
    return( 
        <div className="post-blurb">
            <div className="post-photo"></div>
            <div className="post-info">
                <div className="post-subtitle">{subtitle}</div>
                <div className="post-title">{title}</div>
            </div>
        </div>
    )
}

function PostPreview(props) {
    return(
        <Link to={`/post/${props.post.id}`}> <div className="post-preview">
            <div className="post-left">
                p
            </div>
            <div className="post-right">
                <div className="post-header">
                    <div className="post-date">{formatDateTime(props.post.createdAt)}</div>
                    <div className="post-tags">{formatTags(props.post.tags)}</div>
                </div>
                <PostBlurb post={props.post}/>
            </div>
        </div>
        </Link>
    )
}




function sortByUpdatedAt(content) {
    return content.sort((a,b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    })
}

function sortByCreatedAt(content) {
    return content.sort((a,b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })
}

function FrontPage() {
    const [content, setContent]  = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getContent()
        .then(result => { setContent(sortByCreatedAt(result)); })
        .catch(err => setError(err))
        .finally(() => setLoading(false));
        
    }, [])

    if (error) return <p> An error has occurred</p>
    if (loading) return <p> Loading... </p>


    return (
         
            <div id="page-content">
                {content.map((con) => {
                    if (con.type == "note") {
                        return (<NotePreview note={con} key={"n"+con.id}/>)
                    } else if (con.type == "post") {
                        return (<PostPreview post={con} key={"p"+con.id}/>)
                    }
                })}
            </div>
        
    )
}

export default FrontPage;