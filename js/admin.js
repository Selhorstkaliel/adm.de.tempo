import { db } from "./firebase-config.js";
import { collection, doc, setDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const addForm = document.getElementById('add-dev-form');
const devList = document.getElementById('dev-list');
const whiteListEl = document.getElementById('whitelist');
const logsTbody = document.querySelector('#logs-admin tbody');

addForm.addEventListener('submit', async e => {
  e.preventDefault();
  const name = addForm['new-dev'].value;
  const pass = addForm['new-pass'].value;
  await setDoc(doc(db, 'users', name), {
    role: 'dev',
    whitelist: true,
    password: pass
  });
  loadDevs();
  addForm.reset();
});

async function loadDevs() {
  devList.innerHTML = '';
  whiteListEl.innerHTML = '';
  const snap = await getDocs(collection(db, 'users'));
  snap.forEach(d => {
    const data = d.data();
    if (data.role !== 'dev') return;
    const li = document.createElement('li');
    li.textContent = d.id;
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.checked = data.whitelist;
    chk.onchange = async () => {
      await updateDoc(doc(db, 'users', d.id), { whitelist: chk.checked });
      loadWh();
    };
    li.prepend(chk);
    devList.appendChild(li);
  });
  loadWh();
  loadLogs();
}

async function loadWh() {
  whiteListEl.innerHTML = '';
  const snap = await getDocs(collection(db, 'users'));
  snap.forEach(d => {
    if (d.data().role === 'dev' && d.data().whitelist) {
      const li = document.createElement('li');
      li.textContent = d.id;
      whiteListEl.appendChild(li);
    }
  });
}

async function loadLogs() {
  logsTbody.innerHTML = '';
  const snap = await getDocs(collection(db, 'stats'));
  snap.forEach(d => {
    const { user, date, hours, tasks } = d.data();
    const tr = logsTbody.insertRow();
    [user, date, hours, tasks].forEach(txt => tr.insertCell().textContent = txt);
  });
}

loadDevs();
