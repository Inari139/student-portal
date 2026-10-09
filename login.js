import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmSPjgdHKa85SoGHNvNQ9MQXb1ytDtJAs",
  authDomain: "student-portal-fb6d8.firebaseapp.com",
  databaseURL: "https://student-portal-fb6d8-default-rtdb.firebaseio.com",
  projectId: "student-portal-fb6d8",
  storageBucket: "student-portal-fb6d8.firebasestorage.app",
  messagingSenderId: "344526082363",
  appId: "1:344526082363:web:d3bf026cd915d2aae8e71e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const usernameInput = document.getElementById('username').value.trim();
  const passwordInput = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');
  
  errorMessage.textContent = '';
  errorMessage.classList.add('hidden');
  
  // Проверка админа
  if (usernameInput === 'admin' && passwordInput === '1234') {
    localStorage.setItem('role', 'admin');
    localStorage.removeItem('studentId');
    window.location.href = 'index.html';
    return;
  }
  
  // Проверка студента через Firebase
  try {
    const snapshot = await get(ref(db, 'students'));
    const data = snapshot.val() || {};
    const students = Object.values(data);
    
    const student = students.find(s => s.login === usernameInput && s.password === passwordInput);
    
    if (student) {
      if (student.archived) {
        errorMessage.textContent = 'Ваш аккаунт архивирован!';
        errorMessage.classList.remove('hidden');
        return;
      }
      
      localStorage.setItem('role', 'student');
      localStorage.setItem('studentId', student.id);
      window.location.href = 'index.html';
    } else {
      errorMessage.textContent = 'Неверный логин или пароль!';
      errorMessage.classList.remove('hidden');
    }
  } catch (error) {
    errorMessage.textContent = 'Ошибка подключения к базе данных!';
    errorMessage.classList.remove('hidden');
    console.error(error);
  }
});
