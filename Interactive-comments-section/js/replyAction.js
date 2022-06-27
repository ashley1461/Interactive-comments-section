// require comment.js

function replyingTo(btnElem, comntId, parentId) {
    btnElem.disabled = true;
    let comnt = getCommt(comntId, parentId);
    const comntElem = document.getElementById('comnt' + comntId);
    let boxElem = replyBox(comntId, parentId, comnt.user.username);
    comntElem.insertAdjacentHTML("afterend", boxElem);
    document.querySelector('#box'+comntId).
        querySelector('textarea').focus();
}

function sendReply(btnElem, id, parentId) {
    const boxElem = document.getElementById('box' + id);
    let replyText = boxElem.querySelector('textarea').value;
    if (!replyText) return;
    let reUser = btnElem.dataset.reuser;
    let replyObj = replyObject(replyText, reUser, currentUser);
    addLocalReply(parentId, replyObj);
    renderReplyComnt(replyObj, parentId);
    document.getElementById('comnt' + id).
        querySelector('.reply-btn').disabled = false;
    boxElem.remove();
}

function renderReplyComnt(replyObj, parentId) {
    const container = document.getElementById("replies" + parentId);
    let comnt = createComment(replyObj, parentId);
    comnt.querySelector(".comnt-txt").innerHTML = replyComntText(replyObj);
    container.appendChild(comnt);
}

function replyObject(replyText, reUser, user) {
    return {
        id: genID(),
        content: replyText,
        createdAt: moment().format(),
        vote: {
            score: 0,
            detail: []
        },
        replyingTo: reUser,
        user: user
    }
}

function replyBox(comntId, parentId, reUser) {
    return `
        <div class="reply-box" id="box${comntId}" >
            <img src="${currentUser.image.png}" alt="${currentUser.username}" 
                width="40" height="40" class="desktop-only">
            <textarea placeholder="Add a comment..." rows="3"></textarea>
            <div class="reply-action">
                <img src="${currentUser.image.png}" 
                    width="34" height="34" class="mobile-only">
                <button class="btn" data-reuser="${reUser}"
                    onclick="sendReply(this, ${comntId}, ${parentId})" >
                    REPLY</button>
            </div>
        </div>
    `
}

function replyBtn(comntId, parentId) {
    return `
        <button class="btn reply-btn" onclick="replyingTo(this, ${comntId}, ${parentId})">
            <img src="images/icon-reply.svg" alt="">&nbsp; Reply
        </button>
    `
}

function replyComntText(comnt) {
    return comntTextNode(comnt.content, comnt.replyingTo);
}
