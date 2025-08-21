async function getAllPublishedPosts() {
    try {
        const response = await fetch("http://localhost:3001/post",{mode: 'cors'})
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
    }
}

async function getFrontPageGet(req, res, next) {
    const posts = await getAllPublishedPosts();
    res.render("frontPage", {posts});
}

module.exports = {
    getFrontPageGet,
}