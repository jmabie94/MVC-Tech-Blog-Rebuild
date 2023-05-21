function displayUpdateCommentFormHandler(event) {
  const editButton = event.target;
  editButton.style.display = 'none';
  // why is this not working?
  // const nearbyDelete = event.target.closest('.deleteCommentBtn');
  // nearbyDelete.style.display = 'none';

  const updateFooter = event.target.closest('.card-footer');

  const commentId = editButton.dataset.commentId;

  const form = document.createElement('form');
  form.id = `edit-comment-${commentId}`;

  form.innerHTML = `
    <div class='field'>
    <label class='label'>Comment</label>
    <div class='control'>
      <input
        class='input'
        type='text'
        placeholder='{{comment_text}}'
        id='updatecomment-body'
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
          id='updatecomment-status'
        />
      </div>
    </div>
  </fieldset>

  <div class='field is-grouped'>
    <div class='control'>
      <button
        id='submitUpdate'
        class='button is-link commentUpdateBtn'
      >Update</button>
    </div>
    <div class='control'>
      <button
        id='cancelUpdate'
        class='button is-link is-light updateCancelBtn'
      >Cancel</button>
    </div>
  </div>
  `;

  updateFooter.appendChild(form);

  const updateCommentForm = document.getElementById(
    `edit-comment-${commentId}`
  );
  const cancelUpdateBtn = document.getElementById('cancelUpdate');
  const submitUpdateBtn = document.getElementById('submitUpdate');

  submitUpdateBtn.addEventListener('click', (event) => {
    event.preventDefault();
    updateCommentHandler(commentId);
  });

  cancelUpdateBtn.addEventListener('click', (event) => {
    event.preventDefault();
    updateCancelHandler();
  });
}

const editCommentButtons = document.querySelectorAll('.editCommentBtn');
editCommentButtons.forEach((button) => {
  button.addEventListener('click', displayUpdateCommentFormHandler);
});

const updateCommentHandler = (commentId) => {
  const updateText = document.getElementById('updatecomment-body').value;
  const updateStatusEl = document.getElementById('updatecomment-status');

  if (updateText.length <= 4 || !updateText) {
    updateStatusEl.textContent = 'Comments must be a minimum of 5 characters';
    updateStatusEl.style.color = 'red';
    updateStatusEl.classList.add('is-danger');
    setTimeout(() => {
      updateStatusEl.textContent =
        'Comment must be at least 5 characters in length!';
      updateStatusEl.style.color = 'black';
      updateStatusEl.classList.remove('is-danger');
    }, 4000);
  } else {
    fetch(`/api/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({
        comment_text: updateText,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          updateStatusEl.textContent = 'Comment updated successfully!';
          updateStatusEl.style.color = 'green';
          updateStatusEl.classList.add('is-success');
          setTimeout(() => {
            document.location.reload();
          }, 1000);
        } else {
          throw new Error('Comment update failed');
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
};

const updateCancelHandler = () => {
  document.location.reload();
};
