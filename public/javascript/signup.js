const signForm = document.getElementById('signup-form');
const cancelRedirect = document.querySelector('.cancelBtn');
const signUpBtn = document.querySelector('.processBtn');
// const sendToSignup = document.querySelector('.signupRedirect');
// I don't have a status element in the handlebars yet, but once I do this'll work

const signupStatusEl = document.getElementById('sign-status');

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#user-username').value.trim();
    const email = document.querySelector('#user-email').value.trim();
    const password = document.querySelector('#user-password').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            signupStatusEl.textContent = 'One or more fields filled incorrectly';
            signupStatusEl.style.color = 'red';
            setTimeout(() => {
                signupStatusEl.textContent = 'Fill in all required values';
                signupStatusEl.style.color = 'black';
            }, 2500);
        }
    }
};

const cancelRedirectHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/');
};

// const goSignUpHandler = async (event) => {
//     event.preventDefault();
//     document.location.replace('/signup');
// }

signForm.addEventListener('submit', signupFormHandler);

cancelRedirect.addEventListener('click', cancelRedirectHandler);

// sendToSignup.addEventListener('click', goSignUpHandler);