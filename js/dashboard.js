import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

onAuthStateChanged(auth, user => {
  if (!user) return window.location.href = 'index.html';
  const name = user.email.split('@')[0];
  document.getElementById('dev-name').textContent = name;

  (async () => {
    const logsQ = query(collection(db, 'stats'), where('user', '==', name));
    const snap = await getDocs(logsQ);
    const dates = [], hrs = [], prods = [];
    const tbody = document.querySelector('#logs-table tbody');
    snap.forEach(doc => {
      const { date, hours, tasks } = doc.data();
      dates.push(date);
      hrs.push(hours);
      prods.push(tasks);
      const tr = tbody.insertRow();
      tr.insertCell().textContent = date;
      tr.insertCell().textContent = hours;
      tr.insertCell().textContent = tasks;
    });
    new Chart(document.getElementById('prodChart'), {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          { label: 'Horas', data: hrs },
          { label: 'Produções', data: prods }
        ]
      }
    });
  })();

  (async () => {
    const usersSnap = await getDocs(collection(db, 'users'));
    const scores = [];
    for (let u of usersSnap.docs) {
      if (u.data().role !== 'dev') continue;
      const name = u.id;
      const statsQ = query(collection(db, 'stats'), where('user', '==', name));
      const statSnap = await getDocs(statsQ);
      let total = 0;
      statSnap.forEach(d => total += d.data().hours + d.data().tasks);
      scores.push({ name, total });
    }
    scores.sort((a, b) => b.total - a.total);
    const ol = document.getElementById('ranking');
    scores.forEach(s => {
      const li = document.createElement('li');
      li.textContent = `${s.name} — ${s.total}`;
      ol.appendChild(li);
    });
  })();
});
