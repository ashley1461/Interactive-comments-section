// require comment.js

const $modal = document.getElementById('modal-template')

function deleteUserComnt(comntId, parentId) {
    document.getElementById('comnt' + comntId).remove();
    deleteLocalComnt(comntId, parentId);
}

function showModal(comntId, parentId) {
    let clone = $modal.content.cloneNode(true);
    let actions = clone.querySelector(".modal-actions");
    actions.innerHTML = modalActions(comntId, parentId);
    document.body.appendChild(clone);
    document.body.querySelector('.no-btn').focus();
}

function closeModal(e) {
    const elem = e.target;
    if (!elem.classList.contains('md-close')) return;
    document.querySelector('#del-modal').remove();
}

function editUserComnt(btnElem, comntId, parentId) {
    btnElem.disabled = true;
    const comntElem = document.getElementById('comnt' + comntId);
    const comntArea = comntElem.querySelector('.comnt-text');
    let comnt = getCommt(comntId, parentId);
    comntArea.textContent = '';
    comntArea.innerHTML = editBox(comnt, parentId);
    comntArea.querySelector('textarea').focus();
}

function updateUserComnt(btnElem, comntId, parentId) {
    const comnt = document.getElementById('comnt' + comntId);
    const comntArea = comnt.querySelector('.comnt-text');
    let content = comntArea.querySelector('textarea').value;
    if (content === '') return;
    comntArea.textContent = '';
    editLocalComnt(comntId, parentId, content)
    let textElem = document.createElement('p');
    textElem.classList.add('comnt-txt');
    textElem.innerHTML = comntTextNode(content, btnElem.dataset.reuser);
    comntArea.appendChild(textElem);
    comnt.querySelector('.edit-btn').disabled = false;
}

function userBtns(comntId, parentId) {
    return `
        <button class="btn delete-btn" 
            onclick="showModal(${comntId}, ${parentId})">
            <img src="images/icon-delete.svg" alt="">&nbsp; Delete
        </button>
        <button class="btn edit-btn"
            onclick="editUserComnt(this, ${comntId}, ${parentId})">
            <img src="images/icon-edit.svg" alt="">&nbsp; Edit
        </button>
    `
}

function editBox(comnt, parentId) {
    let inReply = comnt.replyingTo ? `data-reuser="${comnt.replyingTo}"` : '';
    return `
        <textarea placeholder="Add a comment..." rows="4"
            >${comnt.content}</textarea>
        <button class="btn update-btn" ${inReply}
            onclick="updateUserComnt(this, ${comnt.id}, ${parentId})">
        UPDATE</button>
    `
}

function modalActions(comntId, parentId) {
    return `
        <button class="btn no-btn md-close">NO, CANCEL</button>
        <button class="btn yes-btn md-close" 
            onclick="deleteUserComnt(${comntId}, ${parentId})" 
        >YES, DELETE</button>
    `
}
