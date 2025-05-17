import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const form = document.getElementById('login-form');
const errorDiv = document.getElementById('error');

form.addEventListener('submit', e => {
  e.preventDefault();
  const user = form.user.value;
  const pass = form.pass.value;

  // Login estático para admin
  if (user === 'Victor' && pass === '202005') {
    window.location.href = 'admin.html';
    return;
  }
  // Para DEV: tenta Login no Firebase
  signInWithEmailAndPassword(auth, `${user}@exemplo.com`, pass)
    .then(() => window.location.href = 'dashboard.html')
    .catch(err => errorDiv.textContent = 'Usuário ou senha inválidos.');
});
