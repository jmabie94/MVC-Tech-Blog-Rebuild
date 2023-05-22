function deletePostMacroHandler(event) {
  const deleteButton = event.target;
  deleteButton.style.display = 'none';
  // why is this not working?
  //   const nearbyEditPost = event.target.closest('.editPostBtn');
  //   nearbyEditPost.style.display = 'none';

  const postId = deleteButton.dataset.blogpostId;
  console.log('postId: ', postId);

  // double checking with the user to make sure they want to delete the post before running the fetch logic
  const confirmation = confirm("Are you sure you'd like to delete this post?");
  if (confirmation) {
    deletePostMicroHandler(postId);
  } else {
    document.location.reload();
  }
}

const deletePostButtons = document.querySelectorAll('.deletePostBtn');
deletePostButtons.forEach((button) => {
  button.addEventListener('click', deletePostMacroHandler);
});

const deletePostMicroHandler = (postId) => {
  fetch(`/api/blogposts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        const successMessage = 'Post deleted successfully!';
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
