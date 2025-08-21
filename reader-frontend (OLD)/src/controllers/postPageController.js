async function getPageFromAPI(postId) {
    try {
        const response = await fetch(`http://localhost:3001/post/${postId}`, {mode: 'cors'});
        const data = await response.json();
        return data
    } catch(err) {
        console.log(err);
    }
} 

async function postPageGet(req, res, next) {
    const { postId } = req.params;
    const post = await getPageFromAPI(postId);
    res.render("post", {post})
}

module.exports = {
    postPageGet
}