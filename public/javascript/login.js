const logForm = document.getElementById('login-form');
const signUpRedirect = document.querySelector('.goSignUpBtn');
const loginBtn = document.querySelector('.loginBtn');
// const sendToLogin = document.querySelector('.loginRedirect');
// I don't have a status element in the handlebars yet, but once I do this'll work

const loginStatusEl = document.getElementById('log-status');

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      loginStatusEl.textContent = 'Incorrect Email or Password';
      loginStatusEl.style.color = 'red';
      setTimeout(() => {
        loginStatusEl.textContent = 'Fill in all required values';
        loginStatusEl.style.color = 'black';
      }, 2500);
      document.location.reload();
    }
  }
};

const signupRedirectHandler = async (event) => {
  event.preventDefault();
  document.location.replace('/signup');
};

// const goLoginHandler = async (event) => {
//     event.preventDefault();
//     document.location.replace('/login');
// };

logForm.addEventListener('submit', loginFormHandler);

signUpRedirect.addEventListener('click', signupRedirectHandler);

// sendToLogin.addEventListener('click', goLoginHandler);
