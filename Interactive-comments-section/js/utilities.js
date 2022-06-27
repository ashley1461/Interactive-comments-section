// require moment.min.js

/* --- Dates --- */

function showDate(date) {
    let _date = moment(date);
    let now = moment();
    if (_date.isValid()) {
        let days = now.diff(_date, "days"),
        months = now.diff(_date, "month");
        if (days >= 7 && months == 0) {
            let weeks = now.diff(_date, "weeks"),
            number = weeks > 1 ? 'weeks' : 'week';
            return `${weeks} ${number} ago`
        }
        return _date.fromNow();
    }
    return date;
}


/* --- Identifiers --- */

function genID() {
    let lastId = window.localStorage.getItem('last-id');
    if (!lastId) lastId = 13;
    window.localStorage.setItem('last-id', ++lastId);
    return lastId;
}


/* --- Local Storage --- */

function setCurrentUser(user) {
    user = JSON.stringify(user);
    window.localStorage.setItem('cur_user', user);
}

function getCurrentUser() {
    let user  = window.localStorage.getItem('cur_user');
    return JSON.parse(user);
}

function setComments(comments) {
    comments = JSON.stringify(comments);
    window.localStorage.setItem('comments', comments);
}

function getComments() {
    let comments = window.localStorage.getItem('comments');
    if (comments) return JSON.parse(comments);
    console.error('There are no comments');
}

function hasLocalContent() {
     return window.localStorage.getItem('comments') &&
     window.localStorage.getItem('cur_user');
}

function getCommt(id, parentId) {
    let comments = getComments();
    let comnt = comments.find(cmnt => cmnt.id === parentId);
    if (id === parentId)
        return comnt;
    let replies = comnt.replies;
    return replies.find(reply => reply.id === id);
}

function addLocalComnt(comnt) {
    let comments = getComments();
    comments.push(comnt);
    setComments(comments);
}

function addLocalReply(comntId, reply) {
    let comments = getComments();
    let cmntIndex = comments.findIndex(cmnt => cmnt.id === comntId);
    comments[cmntIndex].replies.push(reply);
    setComments(comments);
}

function editLocalComnt(id, parentId, comntText) {
    let comments = getComments();
    let cmntIndex = comments.findIndex(cmnt => cmnt.id === parentId);
    if (id === parentId) {
        comments[cmntIndex].content = comntText;
    } else {
        let replies = comments[cmntIndex].replies;
        let replyIndex = replies.findIndex(reply => reply.id === id);
        comments[cmntIndex].replies[replyIndex].content = comntText;
    }
    setComments(comments);
}

function updateLocalComnt(id, parentId, comnt) {
    let comments = getComments();
    let cmntIndex = comments.findIndex(cmnt => cmnt.id === parentId);
    if (id === parentId) {
        comments[cmntIndex] = comnt;
    } else {
        let replies = comments[cmntIndex].replies;
        let replyIndex = replies.findIndex(reply => reply.id === id);
        comments[cmntIndex].replies[replyIndex] = comnt;
    }
    setComments(comments);
}

function deleteLocalComnt(id, parentId) {
    let comments = getComments();
    let cmntIndex = comments.findIndex(cmnt => cmnt.id === parentId);
    if (!comments[cmntIndex]) return;
    if (id === parentId) {
        comments.splice(cmntIndex, 1);
    } else {
        let replies = comments[cmntIndex].replies;
        let replyIndex = replies.findIndex(reply => reply.id === id);
        comments[cmntIndex].replies.splice(replyIndex, 1);
    }
    setComments(comments);
}

