// Function to handle the click event on 'Add a Comment' button
function displayCommentFormHandler(event) {
  const addButton = event.target;
  addButton.style.display = 'none';

  const commentFooter = event.target.closest('.card-footer');

  // Create a new form element
  const form = document.createElement('form');
  form.id = 'new-comment';

  // Add the HTML structure for the form
  form.innerHTML = `
      <div class='field'>
        <label class='label'>Comment</label>
        <div class='control'>
          <input
            class='input'
            type='text'
            placeholder='Type Your Comment Here'
            id='newcomment-body'
          />
        </div>
      </div>
  
      <fieldset disabled style='margin-bottom: 20px;'>
        <div class='field'>
          <label class='label'>Status</label>
          <div class='control'>
            <input
              class='input'
              type='text'
              placeholder='Comment must be at least 5 characters in length!'
              id='newcomment-status'
            />
          </div>
        </div>
      </fieldset>
  
      <div class='field is-grouped'>
        <div class='control'>
          <button
            id='submit'
            class='button is-primary is-small commentSubmitBtn'
          >Submit</button>
        </div>
        <div class='control'>
          <button
            id='cancel'
            class='button is-light is-small commentCancelBtn'
          >Cancel</button>
        </div>
      </div>
    `;

  // Append the form to the comment footer
  commentFooter.appendChild(form);

  // Get the newly created form
  const newCommentForm = document.getElementById('new-comment');
  const cancelCommentBtn = document.getElementById('cancel');
  const submitCommentBtn = document.getElementById('submit');

  // Event listener for the submit button
  submitCommentBtn.addEventListener('click', (event) => {
    event.preventDefault();
    newCommentHandler();
  });

  // Event listener for the cancel button
  cancelCommentBtn.addEventListener('click', (event) => {
    event.preventDefault();
    cancelCommentHandler();
  });
}

// Listen for click events on 'Add a Comment' buttons
const addCommentButtons = document.querySelectorAll('.addCommentBtn');
addCommentButtons.forEach((button) => {
  button.addEventListener('click', displayCommentFormHandler);
});

const newCommentHandler = () => {
  const commentText = document.getElementById('newcomment-body').value;
  const commentStatusEl = document.getElementById('newcomment-status');
  const postIdInput = document.getElementById('post-id');
  const userIdInput = document.getElementById('user-id');
  const postId = postIdInput.value;
  const userId = userIdInput.value;

  if (commentText.length <= 4 || !commentText) {
    commentStatusEl.textContent = 'Comments must be a minimum of 5 characters';
    commentStatusEl.style.color = 'red';
    commentStatusEl.classList.add('is-danger');
    setTimeout(() => {
      commentStatusEl.textContent =
        'Comment must be at least 5 characters in length!';
      commentStatusEl.style.color = 'black';
      commentStatusEl.classList.remove('is-danger');
    }, 4000);
  } else {
    fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        comment_text: commentText,
        post_id: postId,
        user_id: userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          commentStatusEl.textContent = 'Comment created successfully!';
          commentStatusEl.style.color = 'green';
          commentStatusEl.classList.add('is-success');
          setTimeout(() => {
            document.location.reload();
          }, 1000);
        } else {
          throw new Error('Comment creation failed');
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
};

const cancelCommentHandler = () => {
  document.location.reload();
};
