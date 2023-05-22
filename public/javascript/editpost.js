function displayEditPostFormHandler(event) {
  const editButton = event.target;
  editButton.style.display = 'none';

  let postId = '';
  let updateTableData = null;
  let updateFooter = null;

  if (document.location.pathname === '/dashboard') {
    updateTableData = event.target.closest('.dashboard-wrapper');
    postId = editButton.dataset.blogpostId;
    console.log('trying to find the id', editButton.dataset.blogpostId);
  } else if (document.location.pathname.match(/\/blogposts\/(\d+)/)) {
    updateFooter = event.target.closest('.content');
    postId = editButton.dataset.blogpostId;
    console.log('trying to find the id', editButton.dataset);
  } else if (document.location.pathname.match(/\/user\/(\d+)/)) {
    updateFooter = event.target.closest('.content');
    postId = editButton.dataset.blogpostId;
    console.log('trying to find the id', editButton.dataset);
  }

  console.log('postId', postId);
  console.log('updateTableData', updateTableData);
  console.log('updateFooter', updateFooter);

  const form = document.createElement('form');
  form.id = `edit-post-${postId}`;

  form.innerHTML = `
    <div class='field'>
    <label class='label'>Title</label>
    <div class='control'>
      <input
        class='input'
        type='text'
        placeholder='Give your blogpost a new title here!'
        id='updatepost-title'
      />
    </div>
  </div>

  <div class='field'>
    <label class='label'>Content</label>
    <div class='control'>
      <textarea
        class='textarea'
        placeholder='Write your updated blogpost here!'
        id='updatepost-description'
      ></textarea>
    </div>
  </div>

  <fieldset disabled>
    <div class='field'>
      <label class='label'>Status</label>
      <div class='control'>
        <input
          class='input'
          type='text'
          placeholder='Fill in all required inputs, no less than 5 characters are allowed'
          id='updatepost-status'
        />
      </div>
    </div>
  </fieldset>

  <div class='field is-grouped'>
    <div class='control'>
      <button id='submitPostUpdate' class='button is-link blogUpdateBtn'>Update</button>
    </div>
    <div class='control'>
      <button
        id='cancelPostUpdate'
        class='button is-link is-light blogUpdateCancelBtn'
      >Cancel</button>
    </div>
  </div>
    `;

  if (updateTableData) {
    updateTableData.appendChild(form);
  } else if (updateFooter) {
    updateFooter.appendChild(form);
  }

  const updatePostForm = document.getElementById(`edit-post-${postId}`);

  const submitUpdateBtn = document.getElementById('submitPostUpdate');
  const cancelUpdateBtn = document.getElementById('cancelPostUpdate');

  submitUpdateBtn.addEventListener('click', (event) => {
    event.preventDefault();
    updatePostHandler(postId);
  });

  cancelUpdateBtn.addEventListener('click', (event) => {
    event.preventDefault();
    updatePostCancelHandler();
  });
}

const editPostButtons = document.querySelectorAll('.editPostBtn');
editPostButtons.forEach((button) => {
  button.addEventListener('click', displayEditPostFormHandler);
});

const updatePostHandler = (postId) => {
  const updateTitle = document.getElementById('updatepost-title').value;
  const updateDesc = document.getElementById('updatepost-description').value;
  const updatePostStatusEl = document.getElementById('updatepost-status');

  if (
    updateTitle.length <= 4 ||
    updateDesc.length <= 4 ||
    !updateTitle ||
    !updateDesc
  ) {
    updatePostStatusEl.textContent =
      'All fields must be a minimum of 5 characters!';
    updatePostStatusEl.style.color = 'red';
    updatePostStatusEl.classList.add('is-danger');
    setTimeout(() => {
      updatePostStatusEl.textContent =
        'Fill in all required inputs, no less than 5 characters are allowed';
      updatePostStatusEl.style.color = 'black';
      updatePostStatusEl.classList.remove('is-danger');
    }, 4000);
  } else {
    fetch(`/api/blogposts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: updateTitle,
        description: updateDesc,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          updatePostStatusEl.textContent = 'Post updated successfully!';
          updatePostStatusEl.style.color = 'green';
          updatePostStatusEl.classList.add('is-success');
          setTimeout(() => {
            document.location.reload();
          }, 1000);
        } else {
          throw new Error('Post update failed');
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
};

const updatePostCancelHandler = () => {
  document.location.reload();
};
