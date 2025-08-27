import { useEffect, useState } from "react";
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

function NotePreview(props) {
    return(
        <div className="note-preview">
            <h1>This is a note</h1>
            {props.note.content}
        </div>

    )
}

function PostPreview(props) {
    console.log(props);
    return(
        <div className="post-preview">
            <h1>This is a post</h1>
            {props.post.content}
        </div>

    )
}


function sortByUpdatedAt(content) {
    return content.sort((a,b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    })
}

function FrontPage() {
    const [content, setContent]  = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getContent()
        .then(result => { setContent(sortByUpdatedAt(result)); })
        .catch(err => setError(err))
        .finally(() => setLoading(false));
        
    }, [])

    if (error) return <p> An error has occurred</p>
    if (loading) return <p> Loading... </p>


    return (
         
            <div id="page-content">
                {content.map((con) => {
                    if (con.type == "note") {
                        return (<NotePreview note={con}/>)
                    } else if (con.type == "post") {
                        return (<PostPreview post={con}/>)
                    }
                })}
            </div>
        
    )
}

export default FrontPage;