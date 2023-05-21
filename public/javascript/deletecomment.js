function deleteCommentMacroHandler(event) {
    const deleteButton = event.target;
    deleteButton.style.display = 'none';
    const nearbyEdit = event.target.closest('.editCommentBtn');
    nearbyEdit.style.display = 'none';

    const commentId = deleteButton.dataset.commentId;

    deleteCommentMicroHandler(commentId);
};

const deleteCommentButtons = document.querySelectorAll('.deleteCommentBtn');
deleteCommentButtons.forEach((button) => {
    button.addEventListener('click', deleteCommentMacroHandler);
});

const deleteCommentMicroHandler = (commentId) => {
    fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (response.ok) {
            const successMessage = 'Comment deleted successfully!';
            alert(successMessage);
            setTimeout(() => {
                document.location.reload();
            }, 1000);
        } else {
            throw new Error('Comment deletion failed');
        }
    })
    .catch((error) => {
        alert(error.message);
    });
};