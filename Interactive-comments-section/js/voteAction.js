// require utilities.js

function voteUp(comntId, parentId) {
    let voteScore = processVote(comntId, parentId, true);
    if (voteScore === undefined) return;
    displayVoteDetail(comntId, voteScore, true);
}

function voteDown(comntId, parentId) {
    let voteScore = processVote(comntId, parentId, false);
    if (voteScore === undefined) return;
    displayVoteDetail(comntId, voteScore, false);
}

function processVote(comntId, parentId, like) {
    let comnt = getCommt(comntId, parentId);
    let vote = comnt.vote;
    if (vote === undefined) return;
    if (alreadyVote(vote, like)) return;
    computeVote(vote, like);
    updateLocalComnt(comntId, parentId, comnt);
    return vote.score;
}

function computeVote(vote, like) {
    let userVote = getUserVote(vote.detail);
    let actualVote = like ? 'upVote' : 'downVote',
    revVote = like ? 'downVote' : 'upVote',
    score = vote.score + (like ? 1 : -1) * (1 + userVote[revVote]);
    userVote[actualVote] = true;
    userVote[revVote] = false;
    vote.score = score;
}

function getUserVote(votes) {
    return votes.find(vt => vt.username === currentUser.username);
}

function alreadyVote(vote, like) {
    let userVote = getUserVote(vote.detail)
    if (!userVote) {
        vote.detail.push(voteObj());
        return false;
    }
    return like ? userVote.upVote : userVote.downVote;
}

function voteObj() {
    return {
        username: currentUser.username,
        upVote: false,
        downVote: false
    }
}

function displayVoteDetail(comntId, voteScore, like) {
    let cmtElem = document.getElementById('comnt' + comntId);
    cmtElem.querySelector('.vote-number').innerText = voteScore;
    if (like) {
        cmtElem.querySelector('.up-btn').classList.add('active-vote');
        cmtElem.querySelector('.down-btn').classList.remove('active-vote');
    } else {
        cmtElem.querySelector('.up-btn').classList.remove('active-vote');
        cmtElem.querySelector('.down-btn').classList.add('active-vote');
    }
}

function voteDetail(comntId, parentId, vote) {
    let userVote =  getUserVote(vote.detail);
    let like, dislike;
    if (userVote) {
        like = userVote.upVote ? 'active-vote' : '';
        dislike = userVote.downVote ? 'active-vote' : '';
    }
    return `
        <button class="btn vote-btn up-btn ${like}" 
            onclick="voteUp(${comntId}, ${parentId})" > + </button>
        <p class="vote-number"> ${vote.score} </p>
        <button class="btn vote-btn down-btn ${dislike}" 
            onclick="voteDown(${comntId}, ${parentId})"> - </button>
    `
}