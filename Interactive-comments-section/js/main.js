// require utilities.js, comment.js and replyAction.js

const baseURI = "https://raw.githubusercontent.com/JeanleeRoy/Interactive-comments-section/master/data.json";
const $loader = document.getElementById('loading');

let currentUser = {};
let comments = []

function fetchComments() {
    $loader.style.display = 'block';
    fetch(baseURI)
    .then(res => res.json())
    .then(data => {
        currentUser = data.currentUser;
        comments = data.comments;
        setComments(comments);
        setCurrentUser(currentUser);
        renderComments();
        $loader.remove();
    })
}

function createRepliesContainer(parentId) {
    let container = document.createElement('div');
    container.classList.add('replies-container');
    container.id = "replies"+parentId;
    return container;
}

function renderReplies(parentComnt) {
    let container = createRepliesContainer(parentComnt.id);
    parentComnt.replies.forEach(comnt => {
        let comment = createComment(comnt, parentComnt.id);
        comment.querySelector(".comnt-txt").innerHTML = replyComntText(comnt);
        container.appendChild(comment);
    })
    $comments.appendChild(container);
}

function renderComments() {
    comments.sort((a, b) => b.vote.score - a.vote.score);
    comments.forEach(comnt => {
        let comment = createComment(comnt, comnt.id);
        $comments.appendChild(comment);
        renderReplies(comnt);
    })
}

if (hasLocalContent()) {
    comments = getComments();
    currentUser = getCurrentUser();
    renderComments();
} else {
    fetchComments();
}