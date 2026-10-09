// ============================================
// 1. ПОДКЛЮЧЕНИЕ FIREBASE
// ============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  remove,
  update,
  get
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

// ============================================
// 2. ДАННЫЕ ПО УМОЛЧАНИЮ
// ============================================
const defaultStudents = [
  { id: 1, name: "Тихомиров Владимир", login: "tihomirov", password: "1111", avatar: "vrchatplayer.jfif", bio: "", archived: false },
  { id: 2, name: "Бушеленков Никита", login: "bushelenkov", password: "2222", avatar: "", bio: "", archived: false },
  { id: 3, name: "Габлина Полина", login: "gablina", password: "3333", avatar: "", bio: "", archived: false },
  { id: 4, name: "Воронова Анастасия", login: "voronova", password: "4444", avatar: "", bio: "", archived: false },
  { id: 5, name: "Галкина Яна", login: "galkina", password: "5555", avatar: "", bio: "", archived: false },
  { id: 6, name: "Добряков Егор", login: "dobryakov", password: "6666", avatar: "", bio: "", archived: false }
];

const availableAvatars = [
  { id: 1, name: "Ж", path: "girl.jpg" },
  { id: 2, name: "М", path: "man.jpg" },
  { id: 3, name: "S", path: "stiv.jpg" }
];

const achievementCategories = [
  { id: 'pc', title: "Достижения по ПК", desc: "Сборка, настройка и обслуживание компьютеров" },
  { id: 'network', title: "Достижения по сети", desc: "Домены, политики, Wi-Fi и безопасность" },
  { id: 'mfp', title: "Достижения по МФУ", desc: "Принтеры, плоттеры, сканеры и расходники" },
  { id: 'pq', title: "Личные качества", desc: "Хорошие, плохие" },
  { id: 'other', title: "Другие достижения", desc: "Разное" }
];

const defaultTemplates = [
  { id: 101, category: 'pc', title: "Установка рабочего места", desc: "подключение ПК", background: "pk.png" },
  { id: 102, category: 'pc', title: "Установка системы", desc: "установка Windows", background: "" },
  { id: 103, category: 'pc', title: "Базовое ПО", desc: "Office, браузеры, архиваторы", background: "" },
  { id: 104, category: 'pc', title: "Инженерное ПО", desc: "AutoCAD, Компас-3D, SolidWorks", background: "" },
  { id: 105, category: 'pc', title: "Очистка корпуса", desc: "Продувка от пыли", background: "" },
  { id: 106, category: 'pc', title: "Замена термопасты", desc: "Обслуживание процессора/видеокарты", background: "" },
  { id: 107, category: 'pc', title: "Замена комплектующих", desc: "RAM, SSD, GPU", background: "" },
  { id: 111, category: 'network', title: "Ввод в домен", desc: "Компьютер в домене", background: "" },
  { id: 112, category: 'network', title: "Обновление политик", desc: "gpupdate /force", background: "" },
  { id: 113, category: 'network', title: "Kaspersky Endpoint", desc: "Подключение kaspersky к серверу", background: "" },
  { id: 114, category: 'network', title: "Перезавод в домен", desc: "Отключение домена и ввод в домен", background: "" },
  { id: 115, category: 'network', title: "USB-WiFi адаптер", desc: "Подключение wifi-адаптера к компьютеру", background: "" },
  { id: 120, category: 'mfp', title: "Kyocera 8130", desc: "Замена картриджа", background: "Kyocera8130.png" },
  { id: 121, category: 'mfp', title: "Плоттер", desc: "Замена картриджа", background: "Плоттер.png" },
  { id: 122, category: 'mfp', title: "Kyocera 2040", desc: "Замена картриджа", background: "Kyocera2040.png" },
  { id: 123, category: 'mfp', title: "Zebra Printer", desc: "Настройка зебры", background: "Zebra.png" },
  { id: 124, category: 'mfp', title: "TSC Printer", desc: "Настройка TSC", background: "TSC.png" },
  { id: 125, category: 'mfp', title: "Mertech Printer", desc: "Настройка Mertech", background: "" },
  { id: 130, category: 'pq', title: "Коммуникабельность", desc: "Умеет легко общаться", background: "" },
  { id: 131, category: 'pq', title: "Ответственность", desc: "Умеет отвечать за свои решения", background: "" },
  { id: 132, category: 'pq', title: "Инициативность", desc: "Умеет проявлять желание", background: "" },
  { id: 133, category: 'pq', title: "Исполнительность", desc: "Умеет выполнять задачи качественно и в срок", background: "" },
  { id: 134, category: 'pq', title: "Лентяйство", desc: "Избегает работы", background: "" },
  { id: 135, category: 'pq', title: "Вспыльчивый", desc: "Не умеет быть сдержанным", background: "" },
  { id: 136, category: 'pq', title: "Сдержанный", desc: "Умеет быть сдержанным", background: "" },
  { id: 137, category: 'pq', title: "Самоуверенный", desc: "Считает что может всё", background: "" },
  { id: 138, category: 'pq', title: "Шутник йо банный", desc: "Задолбал юморист", background: "" },
  { id: 140, category: 'other', title: "Прошел экзамен", desc: "прошел экзамен по слепой печати и устному опросу", background: "" },
  { id: 141, category: 'other', title: "Не закончил", desc: "Не завершил заявку или с плохим результатом", background: "" }
];

// ============================================
// 3. ИНИЦИАЛИЗАЦИЯ БАЗЫ ДАННЫХ
// ============================================
async function initDatabase() {
  const studentsSnap = await get(ref(db, 'students'));
  if (!studentsSnap.exists()) {
    const obj = {};
    defaultStudents.forEach(s => { obj[s.id] = s; });
    await set(ref(db, 'students'), obj);
  }

  const templatesSnap = await get(ref(db, 'templates'));
  if (!templatesSnap.exists()) {
    const obj = {};
    defaultTemplates.forEach(t => { obj[t.id] = t; });
    await set(ref(db, 'templates'), obj);
  }

  const categoriesSnap = await get(ref(db, 'categories'));
  if (!categoriesSnap.exists()) {
    const obj = {};
    achievementCategories.forEach(c => { obj[c.id] = c; });
    await set(ref(db, 'categories'), obj);
  }

  const achievementsSnap = await get(ref(db, 'achievements'));
  if (!achievementsSnap.exists()) {
    await set(ref(db, 'achievements'), {});
  }

  const requestsSnap = await get(ref(db, 'requests'));
  if (!requestsSnap.exists()) {
    await set(ref(db, 'requests'), {});
  }
}

// ============================================
// 4. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// ============================================
let activeStudentId = null;
let editingId = null;
let currentTab = 'student';
let currentCategory = null;
let currentEditStudentId = null;
let selectedAvatarPath = null;

let cachedStudents = [];
let cachedAchievements = [];
let cachedTemplates = [];
let cachedCategories = [];
let cachedRequests = [];

const currentRole = localStorage.getItem('role') || 'guest';
const studentId = localStorage.getItem('studentId');

// ============================================
// 5. АВТОПОДПИСКА НА FIREBASE (Синхронизация)
// ============================================
onValue(ref(db, 'students'), (snapshot) => {
  const data = snapshot.val() || {};
  cachedStudents = Object.values(data);
  if (currentTab === 'student') renderStudents();
  if (currentTab === 'archive') renderArchived();
  if (currentTab === 'profile') renderProfile();
  if (currentTab === 'requests') renderRequests();
});

onValue(ref(db, 'achievements'), (snapshot) => {
  const data = snapshot.val() || {};
  cachedAchievements = Object.values(data);
  if (currentTab === 'student' && activeStudentId) renderAchievements(activeStudentId);
  if (currentTab === 'template') renderTemplatesView();
  if (currentTab === 'profile') renderProfile();
  if (currentTab === 'requests') renderRequests();
});

onValue(ref(db, 'templates'), (snapshot) => {
  const data = snapshot.val() || {};
  cachedTemplates = Object.values(data);
  if (currentTab === 'template') renderTemplatesView();
  if (currentTab === 'profile') renderProfile();
  if (currentTab === 'requests') renderRequests();
});

onValue(ref(db, 'categories'), (snapshot) => {
  const data = snapshot.val() || {};
  cachedCategories = Object.values(data);
  if (currentTab === 'template') renderTemplatesView();
  if (currentTab === 'profile') renderProfile();
});

onValue(ref(db, 'requests'), (snapshot) => {
  const data = snapshot.val() || {};
  cachedRequests = Object.values(data);
  if (currentTab === 'requests') renderRequests();
  const pendingCount = cachedRequests.filter(r => r.status === 'pending').length;
  const countEl = document.getElementById('requests-count');
  if (countEl) countEl.textContent = pendingCount;
});

// ============================================
// 6. DOM-ЭЛЕМЕНТЫ
// ============================================
const authBtn = document.getElementById('auth-btn');
const userStatus = document.getElementById('user-status');
const adminElements = document.querySelectorAll('.admin-only');
const studentControls = document.querySelector('.student-controls');
const tabStudent = document.getElementById('tab-student');
const tabTemplate = document.getElementById('tab-template');
const tabProfile = document.getElementById('tab-profile');
const tabArchive = document.getElementById('tab-archive');
const tabRequests = document.getElementById('tab-requests');
const viewStudent = document.getElementById('view-student');
const viewTemplate = document.getElementById('view-template');
const viewProfile = document.getElementById('view-profile');
const viewArchive = document.getElementById('view-archive');
const viewRequests = document.getElementById('view-requests');
const backToCategoriesBtn = document.getElementById('back-to-categories');
const addTemplateBtn = document.getElementById('add-template-btn');

// ============================================
// 7. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
// ============================================
function switchTab(tabName) {
  currentTab = tabName;
  currentCategory = null;

  [tabStudent, tabTemplate, tabProfile, tabArchive, tabRequests].forEach(t => t && t.classList.remove('active-tab'));
  [viewStudent, viewTemplate, viewProfile, viewArchive, viewRequests].forEach(v => v && (v.style.display = 'none'));

  if (tabName === 'student') {
    tabStudent && tabStudent.classList.add('active-tab');
    viewStudent && (viewStudent.style.display = 'block');
    renderStudents();
    if (activeStudentId) renderAchievements(activeStudentId);
  } else if (tabName === 'template') {
    tabTemplate && tabTemplate.classList.add('active-tab');
    viewTemplate && (viewTemplate.style.display = 'block');
    renderTemplatesView();
  } else if (tabName === 'profile') {
    tabProfile && tabProfile.classList.add('active-tab');
    viewProfile && (viewProfile.style.display = 'block');
    renderProfile();
  } else if (tabName === 'archive') {
    tabArchive && tabArchive.classList.add('active-tab');
    viewArchive && (viewArchive.style.display = 'block');
    renderArchived();
  } else if (tabName === 'requests') {
    tabRequests && tabRequests.classList.add('active-tab');
    viewRequests && (viewRequests.style.display = 'block');
    renderRequests();
  }
}

tabStudent && tabStudent.addEventListener('click', () => switchTab('student'));
tabTemplate && tabTemplate.addEventListener('click', () => switchTab('template'));
tabProfile && tabProfile.addEventListener('click', () => switchTab('profile'));
tabArchive && tabArchive.addEventListener('click', () => switchTab('archive'));
tabRequests && tabRequests.addEventListener('click', () => switchTab('requests'));

backToCategoriesBtn && backToCategoriesBtn.addEventListener('click', () => {
  currentCategory = null;
  renderTemplatesView();
});

// ============================================
// 8. АВТОРИЗАЦИЯ
// ============================================
if (currentRole === 'admin') {
  userStatus.textContent = 'Администратор';
  authBtn.textContent = 'Выйти';
  authBtn.onclick = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('studentId');
    location.reload();
  };
  adminElements.forEach(el => el.classList.remove('hidden'));
  studentControls && studentControls.classList.remove('hidden');
  addTemplateBtn && addTemplateBtn.classList.remove('hidden');
  switchTab('student');
} else if (currentRole === 'student') {
  const myData = cachedStudents.find(s => s.id == studentId);
  if (!myData) {
    localStorage.removeItem('role');
    localStorage.removeItem('studentId');
    window.location.href = 'login.html';
  } else {
    userStatus.textContent = myData.name;
    authBtn.textContent = 'Выйти';
    authBtn.onclick = () => {
      localStorage.removeItem('role');
      localStorage.removeItem('studentId');
      location.reload();
    };
    adminElements.forEach(el => el.classList.add('hidden'));
    studentControls && studentControls.classList.add('hidden');
    addTemplateBtn && addTemplateBtn.classList.add('hidden');
    tabArchive && tabArchive.classList.add('hidden');
    tabRequests && tabRequests.classList.add('hidden');
    activeStudentId = parseInt(studentId);
    switchTab('student');
  }
} else {
  userStatus.textContent = 'Гость';
  authBtn.textContent = 'Войти';
  authBtn.onclick = () => { location.href = 'login.html'; };
  adminElements.forEach(el => el.classList.add('hidden'));
  studentControls && studentControls.classList.add('hidden');
  addTemplateBtn && addTemplateBtn.classList.add('hidden');
  tabProfile && tabProfile.classList.add('hidden');
  tabArchive && tabArchive.classList.add('hidden');
  tabRequests && tabRequests.classList.add('hidden');
  switchTab('student');
}

// ============================================
// 9. РЕНДЕР СТУДЕНТОВ
// ============================================
function renderStudents() {
  const listContainer = document.getElementById('students-list');
  if (!listContainer) return;
  listContainer.innerHTML = '';

  const activeStudents = cachedStudents.filter(s => !s.archived);

  activeStudents.forEach(student => {
    const li = document.createElement('li');
    const avatarSrc = student.avatar ? student.avatar : 'avatar-default.jpg';
    li.innerHTML = `<img src="${avatarSrc}" alt="Аватар" class="student-list-avatar"><span class="student-list-name">${student.name}</span>`;

    if (student.id == activeStudentId) {
      li.classList.add('active');
    }

    li.addEventListener('click', () => {
      activeStudentId = student.id;
      editingId = null;
      renderStudents();
      renderAchievements(student.id);
      renderProfile();
      if (currentTab === 'template') renderTemplatesView();
    });

    listContainer.appendChild(li);
  });

  if (!activeStudentId && activeStudents.length > 0) {
    activeStudentId = activeStudents[0].id;
  }
}

// ============================================
// 10. РЕНДЕР ШАБЛОНОВ
// ============================================
function renderTemplatesView() {
  const container = document.getElementById('templates-container');
  const headerTitle = document.querySelector('#view-template h2');
  if (!container || !headerTitle) return;

  if (!currentCategory) {
    headerTitle.textContent = 'Выберите категорию достижений';
    if (backToCategoriesBtn) backToCategoriesBtn.style.display = 'none';
    if (addTemplateBtn) addTemplateBtn.style.display = 'none';
    container.innerHTML = '';
    container.className = 'categories-grid';

    cachedCategories.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'category-card';
      card.innerHTML = `<h3>${cat.title}</h3><p>${cat.desc}</p>`;

      if (currentRole === 'admin') {
        const actions = document.createElement('div');
        actions.className = 'card-actions';
        actions.style.position = 'static';
        actions.style.marginTop = '10px';
        actions.style.justifyContent = 'center';

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.className = 'btn-edit';
        editBtn.onclick = (e) => { e.stopPropagation(); editCategory(cat.id); };

        const delBtn = document.createElement('button');
        delBtn.innerHTML = '🗑️';
        delBtn.className = 'btn-delete';
        delBtn.onclick = (e) => { e.stopPropagation(); deleteCategory(cat.id); };

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);
        card.appendChild(actions);
      }

      card.addEventListener('click', () => {
        currentCategory = cat.id;
        renderTemplatesView();
      });
      container.appendChild(card);
    });

    if (currentRole === 'admin') {
      const addCatCard = document.createElement('div');
      addCatCard.className = 'category-card';
      addCatCard.style.borderStyle = 'dashed';
      addCatCard.style.opacity = '0.7';
      addCatCard.innerHTML = '<h3>➕ Добавить категорию</h3>';
      addCatCard.addEventListener('click', () => addNewCategory());
      container.appendChild(addCatCard);
    }
  } else {
    const catInfo = cachedCategories.find(c => c.id === currentCategory);
    headerTitle.textContent = catInfo ? catInfo.title : 'Достижения';

    if (backToCategoriesBtn) backToCategoriesBtn.style.display = 'inline-block';
    if (addTemplateBtn) addTemplateBtn.style.display = 'inline-block';

    container.className = 'achievements-grid';
    const filtered = cachedTemplates.filter(t => t.category === currentCategory);
    renderCards(container, filtered, false);
  }
}

// ============================================
// 11. УНИВЕРСАЛЬНЫЙ РЕНДЕР КАРТОЧЕК
// ============================================
function renderCards(container, dataArray, isStudentView) {
  container.innerHTML = '';

  if (dataArray.length === 0) {
    container.innerHTML = '<p class="placeholder">В этой категории пока нет достижений.</p>';
    return;
  }

  dataArray.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('achievement-card');

    let isAssigned = false;
    if (!isStudentView && activeStudentId) {
      isAssigned = cachedAchievements.some(a =>
        a.studentId === activeStudentId &&
        a.title === item.title &&
        a.category === item.category
      );
      if (isAssigned) card.classList.add('assigned');
    }

    let hasRequest = false;
    if (currentRole === 'student' && !isStudentView) {
      hasRequest = cachedRequests.some(r =>
        r.studentId == studentId &&
        r.templateId === item.id &&
        r.status === 'pending'
      );
    }

    if (currentRole === 'admin' && item.id === editingId) {
      card.classList.add('editing');
      let categoryOptions = '';
      cachedCategories.forEach(cat => {
        const selected = cat.id === item.category ? 'selected' : '';
        categoryOptions += `<option value="${cat.id}" ${selected}>${cat.title}</option>`;
      });
      card.innerHTML = `
        <input type="text" class="edit-title" value="${item.title.replace(/"/g, '&quot;')}" placeholder="Название">
        <textarea class="edit-desc" placeholder="Описание">${item.desc}</textarea>
        <input type="text" class="edit-background" value="${(item.background || '').replace(/"/g, '&quot;')}" placeholder="Ссылка на иконку">
        <select class="edit-category" style="width:100%; padding:8px; font-family:'Press Start 2P', cursive; font-size:10px; background:#1a1a2e; border:3px solid #5a5a8a; color:#ffd700; border-radius:4px; margin-bottom:8px;">
          ${categoryOptions}
        </select>
        <div class="edit-actions">
          <button class="btn-save" data-id="${item.id}">✓ Сохранить</button>
          <button class="btn-cancel">✕ Отмена</button>
        </div>
      `;
    } else {
      let actionsHtml = '';
      if (currentRole === 'admin') {
        actionsHtml = `
          <div class="card-actions">
            <button class="btn-edit" data-id="${item.id}">✏️</button>
            <button class="btn-delete" data-id="${item.id}">🗑️</button>
            ${!isStudentView ? `<button class="btn-assign" data-id="${item.id}"></button>` : ''}
          </div>`;
      } else if (currentRole === 'student' && !isStudentView && !isAssigned) {
        if (hasRequest) {
          actionsHtml = `
            <div class="card-actions">
              <button class="btn-requested" disabled style="opacity:0.6;cursor:not-allowed;"> Запрос отправлен</button>
            </div>`;
        } else {
          actionsHtml = `
            <div class="card-actions">
              <button class="btn-request" data-id="${item.id}">📩 Запросить</button>
            </div>`;
        }
      }

      const iconHtml = item.background ? `<img src="${item.background}" class="achievement-icon">` : '';
      card.innerHTML = `
        <div class="mc-achievement">
          ${iconHtml}
          <div class="achievement-text">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>
          ${actionsHtml}
        </div>`;
    }
    container.appendChild(card);
  });

  if (currentRole === 'admin') {
    container.querySelectorAll('.btn-edit').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      editingId = parseInt(btn.dataset.id);
      if (isStudentView) renderAchievements(activeStudentId);
      else renderTemplatesView();
    }));

    container.querySelectorAll('.btn-delete').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      deleteItem(parseInt(btn.dataset.id), !isStudentView);
    }));

    container.querySelectorAll('.btn-save').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      saveEdit(parseInt(btn.dataset.id), !isStudentView);
    }));

    container.querySelectorAll('.btn-cancel').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      editingId = null;
      if (isStudentView) renderAchievements(activeStudentId);
      else renderTemplatesView();
    }));

    container.querySelectorAll('.btn-assign').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      assignTemplate(parseInt(btn.dataset.id));
    }));
  } else if (currentRole === 'student') {
    container.querySelectorAll('.btn-request').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      requestAchievement(parseInt(btn.dataset.id));
    }));
  }
}

// ============================================
// 12. РЕНДЕР ДОСТИЖЕНИЙ СТУДЕНТА
// ============================================
function renderAchievements(studentId) {
  const container = document.getElementById('achievements-container');
  if (!container) return;
  const filtered = cachedAchievements.filter(a => a.studentId === studentId);
  renderCards(container, filtered, true);
}

// ============================================
// 13. РЕНДЕР ЗАПРОСОВ
// ============================================
function renderRequests() {
  const container = document.getElementById('requests-container');
  if (!container) return;

  const pendingRequests = cachedRequests.filter(r => r.status === 'pending');

  if (pendingRequests.length === 0) {
    container.innerHTML = '<p class="placeholder">Нет новых запросов.</p>';
    return;
  }

  container.innerHTML = '';
  container.className = 'achievements-grid';

  pendingRequests.forEach(request => {
    const student = cachedStudents.find(s => s.id === request.studentId);
    const template = cachedTemplates.find(t => t.id === request.templateId);
    if (!student || !template) return;

    const card = document.createElement('div');
    card.classList.add('achievement-card');
    card.classList.add('request-card');

    const avatarSrc = student.avatar ? student.avatar : 'avatar-default.jpg';

    card.innerHTML = `
      <div class="request-card-inner">
        <img src="${avatarSrc}" class="request-avatar">
        <div class="request-info">
          <h3>${student.name}</h3>
          <p class="request-template">Запрашивает: ${template.title}</p>
          <p class="request-date">${request.date}</p>
        </div>
        <div class="request-actions">
          <button class="btn-grant" data-request-id="${request.id}" data-student-id="${student.id}" data-template-id="${template.id}">✓ Выдать</button>
          <button class="btn-reject" data-request-id="${request.id}">✕ Отклонить</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll('.btn-grant').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      grantAchievement(
        btn.dataset.requestId,
        parseInt(btn.dataset.studentId),
        parseInt(btn.dataset.templateId)
      );
    });
  });

  container.querySelectorAll('.btn-reject').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      rejectRequest(btn.dataset.requestId);
    });
  });
}

// ============================================
// 14. ВЫДАТЬ ДОСТИЖЕНИЕ ПО ЗАПРОСУ
// ============================================
async function grantAchievement(requestId, studentIdToGrant, templateId) {
  const request = cachedRequests.find(r => r.id === requestId);
  if (!request) return;

  const template = cachedTemplates.find(t => t.id === templateId);
  if (!template) return;

  const student = cachedStudents.find(s => s.id === studentIdToGrant);
  if (!student) return;

  const newAchievementRef = push(ref(db, 'achievements'));
  await set(newAchievementRef, {
    id: newAchievementRef.key,
    studentId: student.id,
    title: template.title,
    desc: template.desc,
    background: template.background,
    category: template.category
  });

  await remove(ref(db, `requests/${requestId}`));
  alert(`✅ Достижение "${template.title}" выдано студенту ${student.name}!`);
}

async function rejectRequest(requestId) {
  if (!confirm('Отклонить этот запрос?')) return;
  await remove(ref(db, `requests/${requestId}`));
}

// ============================================
// 15. ЗАПРОС ДОСТИЖЕНИЯ (студент)
// ============================================
async function requestAchievement(templateId) {
  const template = cachedTemplates.find(t => t.id === templateId);
  if (!template) return;

  const existingRequest = cachedRequests.find(r =>
    r.studentId == studentId &&
    r.templateId === templateId &&
    r.status === 'pending'
  );
  if (existingRequest) {
    alert('️ Вы уже отправляли запрос на это достижение!');
    return;
  }

  const alreadyHas = cachedAchievements.find(a =>
    a.studentId == studentId &&
    a.title === template.title
  );
  if (alreadyHas) {
    alert('⚠️ У вас уже есть это достижение!');
    return;
  }

  const newRequestRef = push(ref(db, 'requests'));
  await set(newRequestRef, {
    id: newRequestRef.key,
    studentId: parseInt(studentId),
    templateId: templateId,
    status: 'pending',
    date: new Date().toLocaleString('ru-RU')
  });

  alert(`✅ Запрос на достижение "${template.title}" отправлен администратору!`);
}

// ============================================
// 16. РЕНДЕР ПРОФИЛЯ
// ============================================
function renderProfile() {
  const container = document.getElementById('profile-content');
  if (!container) return;

  let targetId = activeStudentId;
  if (!targetId && currentRole === 'student') targetId = studentId;
  if (!targetId && currentRole === 'admin' && cachedStudents.length > 0) {
    targetId = cachedStudents[0].id;
    activeStudentId = targetId;
  }

  const student = cachedStudents.find(s => s.id == targetId);
  if (!student) {
    container.innerHTML = '<p class="placeholder">Выберите студента из списка слева, чтобы увидеть его профиль.</p>';
    return;
  }

  const avatarSrc = student.avatar ? student.avatar : 'avatar-default.jpg';
  const studentAch = cachedAchievements.filter(a => a.studentId == targetId);

  const allCategories = cachedCategories || [];
  const radarCategories = allCategories.map(cat => {
    let short = cat.title.toUpperCase();
    short = short.replace('ДОСТИЖЕНИЯ ПО ', '').replace('ДОСТИЖЕНИЯ ', '');
    if (short.length > 8) short = short.substring(0, 6);
    return { id: cat.id, short: short, title: cat.title };
  });

  const radarData = radarCategories.map(cat => {
    const templateTitles = cachedTemplates
      .filter(t => t.category === cat.id)
      .map(t => t.title.toLowerCase().trim());

    const personalTitlesInCat = studentAch
      .filter(a => a.category === cat.id && !templateTitles.includes(a.title.toLowerCase().trim()))
      .map(a => a.title.toLowerCase().trim());
    const uniquePersonalTitles = [...new Set(personalTitlesInCat)];

    const totalInCategory = templateTitles.length + uniquePersonalTitles.length;
    const earnedInCategory = studentAch.filter(a => a.category === cat.id).length;

    const percent = totalInCategory > 0 ? earnedInCategory / totalInCategory : 0;
    return { ...cat, total: totalInCategory, earned: earnedInCategory, percent: Math.min(percent, 1) };
  });

  const svgWidth = 300;
  const svgHeight = 250;
  const cx = svgWidth / 2;
  const cy = svgHeight / 2 + 10;
  const radius = 100;
  const axes = radarData.length;

  function getPoint(axisIndex, value) {
    const angle = -Math.PI / 2 + (2 * Math.PI / axes) * axisIndex;
    return {
      x: cx + radius * value * Math.cos(angle),
      y: cy + radius * value * Math.sin(angle)
    };
  }

  let gridSvg = '';
  for (let level = 1; level <= 4; level++) {
    const v = level / 4;
    let points = [];
    for (let i = 0; i < axes; i++) {
      const p = getPoint(i, v);
      points.push(`${p.x},${p.y}`);
    }
    gridSvg += `<polygon points="${points.join(' ')}" fill="none" stroke="#3d3d5c" stroke-width="1.5" stroke-dasharray="4,3"/>`;
  }

  let axesSvg = '';
  for (let i = 0; i < axes; i++) {
    const p = getPoint(i, 1);
    axesSvg += `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="#3d3d5c" stroke-width="1.5" stroke-dasharray="4,3"/>`;
  }

  let dataPoints = [];
  let dataDots = '';
  radarData.forEach((cat, i) => {
    const p = getPoint(i, cat.percent);
    dataPoints.push(`${p.x},${p.y}`);
    dataDots += `<rect x="${p.x - 5}" y="${p.y - 5}" width="10" height="10" fill="#4caf50" stroke="#ffd700" stroke-width="2" style="image-rendering: pixelated;"/>`;
  });

  const dataPolygon = `<polygon points="${dataPoints.join(' ')}" fill="rgba(76, 175, 80, 0.35)" stroke="#4caf50" stroke-width="3"/>`;

  let labelsSvg = '';
  radarData.forEach((cat, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI / axes) * i;
    const labelR = radius + 10;
    const lx = cx + labelR * Math.cos(angle);
    const ly = cy + labelR * Math.sin(angle);
    let anchor = 'middle';
    if (Math.cos(angle) > 0.3) anchor = 'start';
    else if (Math.cos(angle) < -0.3) anchor = 'end';
    let dy = 0;
    if (Math.sin(angle) < -0.5) dy = -5;
    else if (Math.sin(angle) > 0.5) dy = 10;

    labelsSvg += `<text x="${lx}" y="${ly + dy - 4}" text-anchor="${anchor}" fill="#ffd700" font-family="'Press Start 2P', cursive" font-size="7" style="text-shadow: 1px 1px 0 #000;">${cat.short}</text>`;
    labelsSvg += `<text x="${lx}" y="${ly + dy + 6}" text-anchor="${anchor}" fill="#ffd700" font-family="'Press Start 2P', cursive" font-size="7" style="text-shadow: 1px 1px 0 #000;">(${cat.earned}/${cat.total})</text>`;
  });

  const radarSvg = `<svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" style="display:block; margin: 0 auto;">${gridSvg}${axesSvg}${dataPolygon}${dataDots}${labelsSvg}</svg>`;

  const canEdit = (currentRole === 'admin') || (currentRole === 'student' && student.id == studentId);

  let leftColumn = `
    <div style="text-align:center;">
      <img src="${avatarSrc}" alt="Аватар" style="width:120px; height:120px; border-radius:50%; border:4px solid #ffd700; object-fit:cover; image-rendering:pixelated; background:#1a1a2e; cursor:pointer;" title="Нажми, чтобы изменить">
      <h2 style="color:#ffd700; text-shadow:2px 2px 0 #000; margin-top:15px; font-size:18px;">${student.name}</h2>
      <p style="color:#888; font-size:11px; margin-top:10px; line-height:1.6;">${student.bio || 'Нет описания'}</p>
  `;

  if (currentRole === 'admin') {
    leftColumn += `
      <div style="margin-top:15px; display:flex; align-items:center; justify-content:center; gap:8px;">
        <button onclick="toggleEditCredentials(${student.id})" id="edit-creds-btn" title="Редактировать логин и пароль" style="background:#2d2d4a; border:2px solid #3d3d5c; border-radius:6px; padding:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; width:36px; height:36px; transition:all 0.2s;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px; height:18px;">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <div id="creds-display" style="padding:10px; background:#1a1a2e; border:2px solid #3d3d5c; border-radius:6px; text-align:left; min-width:180px;">
          <div style="font-size:9px; color:#ffd700; margin-bottom:5px; text-shadow:1px 1px 0 #000;">
            <span style="color:#888;">Логин:</span>
            <span class="secret-data hidden-secret" id="profile-login" data-original="${student.login || '—'}">${student.login || '—'}</span>
          </div>
          <div style="font-size:9px; color:#ffd700; text-shadow:1px 1px 0 #000;">
            <span style="color:#888;">Пароль:</span>
            <span class="secret-data hidden-secret" id="profile-password" data-original="${student.password || '—'}">${student.password || '—'}</span>
          </div>
        </div>
        <div id="creds-edit" style="display:none; padding:10px; background:#1a1a2e; border:2px solid #ffd700; border-radius:6px; text-align:left; min-width:180px;">
          <div style="font-size:9px; color:#ffd700; margin-bottom:5px; text-shadow:1px 1px 0 #000;">
            <span style="color:#888;">Логин:</span>
            <input type="text" id="edit-login-input" value="${student.login || ''}" style="width:100px; padding:3px 5px; font-family:'Press Start 2P', cursive; font-size:8px; background:#2d2d4a; border:1px solid #5a5a8a; color:#ffd700; border-radius:3px; outline:none;">
          </div>
          <div style="font-size:9px; color:#ffd700; text-shadow:1px 1px 0 #000;">
            <span style="color:#888;">Пароль:</span>
            <input type="text" id="edit-password-input" value="${student.password || ''}" style="width:100px; padding:3px 5px; font-family:'Press Start 2P', cursive; font-size:8px; background:#2d2d4a; border:1px solid #5a5a8a; color:#ffd700; border-radius:3px; outline:none;">
          </div>
        </div>
        <div id="creds-actions" style="display:none; gap:4px;">
          <button onclick="saveCredentials(${student.id})" title="Сохранить" style="background:#4caf50; border:2px solid #3d8a40; border-radius:6px; padding:8px; cursor:pointer; color:white; font-family:'Press Start 2P', cursive; font-size:10px; width:36px; height:36px;">✓</button>
          <button onclick="cancelEditCredentials()" title="Отмена" style="background:#757575; border:2px solid #5a5a5a; border-radius:6px; padding:8px; cursor:pointer; color:white; font-family:'Press Start 2P', cursive; font-size:10px; width:36px; height:36px;">✕</button>
        </div>
        <button onclick="toggleSecret()" id="eye-btn" title="Показать/скрыть" style="background:#2d2d4a; border:2px solid #3d3d5c; border-radius:6px; padding:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; width:36px; height:36px; transition:all 0.2s;">
          <svg id="eye-icon-open" viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px; height:18px; display:none;">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <svg id="eye-icon-closed" viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px; height:18px;">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          </svg>
        </button>
      </div>
    `;
  }

  leftColumn += `</div>`;

  if (canEdit) {
    leftColumn += `
      <div style="display:flex; gap:10px; justify-content:center; margin-top:20px;">
        <button onclick="editProfileAvatar(${student.id})" style="background:#5a5a8a; color:white; border:2px solid #3d3d5c; padding:8px 16px; border-radius:4px; cursor:pointer; font-family:'Press Start 2P', cursive; font-size:9px;"> Изменить фото</button>
        <button onclick="editProfileBio(${student.id})" style="background:#5a5a8a; color:white; border:2px solid #3d3d5c; padding:8px 16px; border-radius:4px; cursor:pointer; font-family:'Press Start 2P', cursive; font-size:9px;">✏️ Изменить описание</button>
      </div>
    `;
  }

  const rightColumn = `
    <div style="background:#1a1a2e; border:3px solid #3d3d5c; border-radius:8px; padding:15px;">
      <h3 style="color:#ffd700; text-shadow:2px 2px 0 #000; font-size:12px; text-align:center; margin:0 0 10px 0; letter-spacing:2px;">SKILL WEB</h3>
      ${radarSvg}
    </div>
  `;

  container.innerHTML = `
    <div style="display:flex; gap:25px; align-items:flex-start; width:100%;">
      <div style="flex:1; min-width:300px;">${leftColumn}</div>
      <div style="flex:1.5; min-width:400px;">${rightColumn}</div>
    </div>
  `;

  setTimeout(() => {
    const secrets = document.querySelectorAll('.secret-data');
    secrets.forEach(el => {
      el.dataset.original = el.textContent;
      el.classList.add('hidden-secret');
    });
    const eyeOpen = document.getElementById('eye-icon-open');
    const eyeClosed = document.getElementById('eye-icon-closed');
    if (eyeOpen) eyeOpen.style.display = 'none';
    if (eyeClosed) eyeClosed.style.display = 'block';
  }, 50);
}

// ============================================
// 17. ФУНКЦИИ ПРОФИЛЯ
// ============================================
window.toggleSecret = function() {
  const secrets = document.querySelectorAll('.secret-data');
  const eyeOpen = document.getElementById('eye-icon-open');
  const eyeClosed = document.getElementById('eye-icon-closed');
  const eyeBtn = document.getElementById('eye-btn');

  if (secrets.length === 0) return;

  const isHidden = secrets[0].classList.contains('hidden-secret');

  secrets.forEach(el => {
    if (isHidden) {
      el.classList.remove('hidden-secret');
      el.textContent = el.dataset.original;
    } else {
      el.dataset.original = el.textContent;
      el.classList.add('hidden-secret');
    }
  });

  if (isHidden) {
    eyeOpen.style.display = 'block';
    eyeClosed.style.display = 'none';
  } else {
    eyeOpen.style.display = 'none';
    eyeClosed.style.display = 'block';
  }

  eyeBtn.style.borderColor = isHidden ? '#3d3d5c' : '#ffd700';
};

window.toggleEditCredentials = function(studentId) {
  document.getElementById('creds-display').style.display = 'none';
  document.getElementById('creds-edit').style.display = 'block';
  document.getElementById('creds-actions').style.display = 'flex';
  document.getElementById('edit-creds-btn').style.display = 'none';
  document.getElementById('eye-btn').style.display = 'none';
  setTimeout(() => {
    const loginInput = document.getElementById('edit-login-input');
    if (loginInput) loginInput.focus();
  }, 50);
};

window.cancelEditCredentials = function() {
  document.getElementById('creds-display').style.display = 'block';
  document.getElementById('creds-edit').style.display = 'none';
  document.getElementById('creds-actions').style.display = 'none';
  document.getElementById('edit-creds-btn').style.display = 'flex';
  document.getElementById('eye-btn').style.display = 'flex';
};

window.saveCredentials = async function(studentId) {
  const newLogin = document.getElementById('edit-login-input').value.trim();
  const newPassword = document.getElementById('edit-password-input').value.trim();

  if (!newLogin) return alert('️ Логин не может быть пустым!');
  if (!newPassword) return alert('️ Пароль не может быть пустым!');

  const loginTaken = cachedStudents.some(s => s.login === newLogin && s.id !== studentId);
  if (loginTaken) return alert('⚠️ Этот логин уже занят другим студентом!');

  await update(ref(db, `students/${studentId}`), { login: newLogin, password: newPassword });

  alert('✅ Логин и пароль успешно обновлены!');
  cancelEditCredentials();
};

window.editProfileAvatar = async function(studentId) {
  currentEditStudentId = studentId;
  selectedAvatarPath = null;
  const modal = document.getElementById('avatar-modal');
  const grid = document.getElementById('avatar-grid');
  const customInput = document.getElementById('custom-avatar-input');

  grid.innerHTML = '';
  customInput.value = '';

  availableAvatars.forEach(avatar => {
    const option = document.createElement('div');
    option.className = 'avatar-option';
    option.innerHTML = `<img src="${avatar.path}" alt="${avatar.name}"><div class="avatar-name">${avatar.name}</div>`;
    option.addEventListener('click', () => {
      grid.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
      option.classList.add('selected');
      selectedAvatarPath = avatar.path;
      customInput.value = '';
    });
    grid.appendChild(option);
  });

  customInput.oninput = () => {
    if (customInput.value.trim()) {
      grid.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
      selectedAvatarPath = customInput.value.trim();
    }
  };

  document.getElementById('avatar-save-btn').onclick = async () => {
    const finalPath = selectedAvatarPath || customInput.value.trim();
    if (!finalPath) return alert('Выберите аватарку или вставьте ссылку!');
    await update(ref(db, `students/${currentEditStudentId}`), { avatar: finalPath });
    modal.classList.add('hidden');
  };

  document.getElementById('avatar-cancel-btn').onclick = () => modal.classList.add('hidden');
  modal.classList.remove('hidden');
};

window.editProfileBio = async function(studentId) {
  const student = cachedStudents.find(s => s.id == studentId);
  if (!student) return;

  const newBio = prompt('Введите новое описание профиля:', student.bio || '');
  if (newBio === null) return;

  await update(ref(db, `students/${studentId}`), { bio: newBio.trim() });
};

// ============================================
// 18. КАСТОМНОЕ ПОДТВЕРЖДЕНИЕ
// ============================================
function showCustomConfirm(message, onConfirm) {
  const modal = document.getElementById('custom-confirm-modal');
  const msgEl = document.getElementById('modal-message');
  const confirmBtn = document.getElementById('modal-confirm-btn');
  const cancelBtn = document.getElementById('modal-cancel-btn');

  msgEl.textContent = message;
  modal.classList.remove('hidden');

  confirmBtn.onclick = () => {
    modal.classList.add('hidden');
    if (onConfirm) onConfirm();
  };

  cancelBtn.onclick = () => modal.classList.add('hidden');
}

// ============================================
// 19. ПРИСВОЕНИЕ ШАБЛОНА СТУДЕНТУ
// ============================================
async function assignTemplate(templateId) {
  if (!activeStudentId) {
    alert('⚠️ Сначала выберите студента из списка слева!');
    return;
  }

  const template = cachedTemplates.find(t => t.id === templateId);
  if (!template) return;

  const targetStudent = cachedStudents.find(s => s.id == activeStudentId);
  if (!targetStudent) return;

  const alreadyHas = cachedAchievements.find(a =>
    a.studentId === targetStudent.id &&
    a.title === template.title
  );

  if (alreadyHas) {
    alert(`⚠️ У студента "${targetStudent.name}" уже есть достижение "${template.title}"!\n\nПовторное присвоение невозможно.`);
    return;
  }

  const confirmMsg = `Вы присваиваете достижение:\n\n«${template.title}»\n\nстуденту:\n${targetStudent.name}\n\nПродолжить?`;

  showCustomConfirm(confirmMsg, async () => {
    const newAchievementRef = push(ref(db, 'achievements'));
    await set(newAchievementRef, {
      id: newAchievementRef.key,
      studentId: targetStudent.id,
      title: template.title,
      desc: template.desc,
      background: template.background,
      category: template.category
    });
    alert(`✅ Достижение "${template.title}" успешно присвоено!\nСтудент: ${targetStudent.name}`);
    if (currentTab === 'profile') renderProfile();
  });
}

// ============================================
// 20. ДОБАВЛЕНИЕ СТУДЕНТА
// ============================================
document.getElementById('add-student-btn')?.addEventListener('click', () => {
  const modal = document.getElementById('add-student-modal');
  const nameInput = document.getElementById('new-student-name');
  const loginInput = document.getElementById('new-student-login');
  const passwordInput = document.getElementById('new-student-password');

  nameInput.value = '';
  loginInput.value = '';
  passwordInput.value = '';
  modal.classList.remove('hidden');

  document.getElementById('save-new-student').onclick = async () => {
    const name = nameInput.value.trim();
    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name) return alert('ФИО обязательно!');
    if (!login) return alert('Логин обязателен!');
    if (!password) return alert('Пароль обязателен!');

    const loginTaken = cachedStudents.some(s => s.login === login);
    if (loginTaken) return alert('Этот логин уже занят!');

    const newId = cachedStudents.length > 0 ? Math.max(...cachedStudents.map(s => s.id)) + 1 : 1;

    await set(ref(db, `students/${newId}`), {
      id: newId,
      name,
      login,
      password,
      avatar: "",
      bio: "",
      archived: false
    });

    modal.classList.add('hidden');
  };

  document.getElementById('cancel-new-student').onclick = () => {
    modal.classList.add('hidden');
  };
});

// ============================================
// 21. УДАЛЕНИЕ СТУДЕНТА
// ============================================
document.getElementById('delete-student-btn')?.addEventListener('click', async () => {
  if (!activeStudentId) return alert('Выберите студента!');

  const student = cachedStudents.find(s => s.id === activeStudentId);
  if (!confirm(`Удалить "${student.name}" и все его достижения?`)) return;

  await remove(ref(db, `students/${activeStudentId}`));

  const studentAchievements = cachedAchievements.filter(a => a.studentId === activeStudentId);
  for (const ach of studentAchievements) {
    await remove(ref(db, `achievements/${ach.id}`));
  }

  activeStudentId = null;
  editingId = null;
  document.getElementById('achievements-container').innerHTML = '<p class="placeholder">Выберите студента...</p>';
});

// ============================================
// 22. АРХИВАЦИЯ АКТИВНОГО СТУДЕНТА
// ============================================
document.getElementById('archive-student-btn')?.addEventListener('click', async () => {
  if (!activeStudentId) return alert('⚠️ Сначала выберите студента из списка слева!');

  const student = cachedStudents.find(s => s.id === activeStudentId);
  if (!student) return;

  if (!confirm(`Отправить "${student.name}" в архив?\n\nЕго достижения сохранятся, но он исчезнет из основного списка.`)) return;

  await update(ref(db, `students/${student.id}`), { archived: true });

  activeStudentId = null;
  editingId = null;
  document.getElementById('achievements-container').innerHTML = '<p class="placeholder">Студент отправлен в архив.</p>';
});

// ============================================
// 23. ДОБАВЛЕНИЕ ДОСТИЖЕНИЯ
// ============================================
document.getElementById('add-achievement-btn')?.addEventListener('click', () => {
  if (currentTab === 'student' && !activeStudentId) return alert('Выберите студента!');

  const modal = document.getElementById('add-achievement-modal');
  const titleInput = document.getElementById('new-ach-title');
  const descInput = document.getElementById('new-ach-desc');
  const bgInput = document.getElementById('new-ach-bg');
  const categorySelector = document.getElementById('category-selector');

  titleInput.value = '';
  descInput.value = '';
  bgInput.value = '';
  categorySelector.innerHTML = '';

  let selectedCategory = '';
  cachedCategories.forEach(cat => {
    const option = document.createElement('div');
    option.className = 'category-option';
    option.textContent = cat.title;
    option.addEventListener('click', () => {
      categorySelector.querySelectorAll('.category-option').forEach(el => el.classList.remove('selected'));
      option.classList.add('selected');
      selectedCategory = cat.id;
    });
    categorySelector.appendChild(option);
  });

  modal.classList.remove('hidden');

  document.getElementById('save-new-ach').onclick = async () => {
    const title = titleInput.value.trim();
    if (!title) return alert('Название обязательно!');
    if (!selectedCategory) return alert('Выберите категорию!');

    const desc = descInput.value.trim();
    const bg = bgInput.value.trim();

    const newAchievementRef = push(ref(db, 'achievements'));
    await set(newAchievementRef, {
      id: newAchievementRef.key,
      studentId: activeStudentId,
      title,
      desc,
      background: bg,
      category: selectedCategory
    });

    modal.classList.add('hidden');
    if (currentTab === 'profile') renderProfile();
  };

  document.getElementById('cancel-new-ach').onclick = () => modal.classList.add('hidden');
});

// ============================================
// 24. ДОБАВЛЕНИЕ ШАБЛОНА
// ============================================
if (addTemplateBtn) {
  addTemplateBtn.addEventListener('click', () => {
    if (currentTab === 'template' && !currentCategory) return alert('Сначала выберите категорию!');

    const modal = document.getElementById('add-template-modal');
    const titleInput = document.getElementById('new-template-title');
    const descInput = document.getElementById('new-template-desc');
    const bgInput = document.getElementById('new-template-bg');

    titleInput.value = '';
    descInput.value = '';
    bgInput.value = '';
    modal.classList.remove('hidden');

    document.getElementById('save-new-template').onclick = async () => {
      const title = titleInput.value.trim();
      if (!title) return alert('Название обязательно!');

      const desc = descInput.value.trim();
      const bg = bgInput.value.trim();

      const newTemplateRef = push(ref(db, 'templates'));
      await set(newTemplateRef, {
        id: newTemplateRef.key,
        category: currentCategory,
        title,
        desc,
        background: bg
      });

      modal.classList.add('hidden');
    };

    document.getElementById('cancel-new-template').onclick = () => {
      modal.classList.add('hidden');
    };
  });
}

// ============================================
// 25. СОХРАНЕНИЕ РЕДАКТИРОВАНИЯ
// ============================================
async function saveEdit(id, isTemplate) {
  const card = document.querySelector('.achievement-card.editing');
  const title = card.querySelector('.edit-title').value.trim();
  const desc = card.querySelector('.edit-desc').value.trim();
  const bg = card.querySelector('.edit-background').value.trim();
  const categorySelect = card.querySelector('.edit-category');
  const newCategory = categorySelect ? categorySelect.value : null;

  if (!title) return alert('Название обязательно!');

  const path = isTemplate ? `templates/${id}` : `achievements/${id}`;
  const updateData = { title, desc, background: bg };
  if (newCategory) updateData.category = newCategory;

  await update(ref(db, path), updateData);

  editingId = null;
  if (isTemplate) renderTemplatesView();
  else renderAchievements(activeStudentId);
  renderProfile();
}

// ============================================
// 26. УДАЛЕНИЕ ДОСТИЖЕНИЯ/ШАБЛОНА
// ============================================
async function deleteItem(id, isTemplate) {
  if (!confirm('Удалить это достижение?')) return;

  const path = isTemplate ? `templates/${id}` : `achievements/${id}`;
  await remove(ref(db, path));

  if (editingId === id) editingId = null;
  if (isTemplate) renderTemplatesView();
  else renderAchievements(activeStudentId);
}

// ============================================
// 27. КАТЕГОРИИ
// ============================================
async function addNewCategory() {
  const title = prompt('Название новой категории:');
  if (!title) return;
  const desc = prompt('Описание категории:') || '';

  const newId = title.toLowerCase().replace(/[^a-zа-я0-9]/g, '').substring(0, 10) + Date.now();
  await set(ref(db, `categories/${newId}`), { id: newId, title, desc });
}

async function editCategory(catId) {
  const cat = cachedCategories.find(c => c.id === catId);
  if (!cat) return;

  const newTitle = prompt('Новое название:', cat.title);
  if (!newTitle) return;
  const newDesc = prompt('Новое описание:', cat.desc);

  await update(ref(db, `categories/${catId}`), { title: newTitle, desc: newDesc || '' });
}

async function deleteCategory(catId) {
  if (!confirm('Удалить эту категорию и ВСЕ достижения в ней?')) return;

  await remove(ref(db, `categories/${catId}`));

  const templatesInCat = cachedTemplates.filter(t => t.category === catId);
  for (const t of templatesInCat) {
    await remove(ref(db, `templates/${t.id}`));
  }

  if (currentCategory === catId) currentCategory = null;
}

// ============================================
// 28. РЕНДЕР АРХИВА
// ============================================
function renderArchived() {
  const container = document.getElementById('archived-container');
  if (!container) return;

  const archivedStudents = cachedStudents.filter(s => s.archived);

  if (archivedStudents.length === 0) {
    container.innerHTML = '<p class="placeholder">Архив пуст.</p>';
    return;
  }

  container.innerHTML = '';
  container.className = 'achievements-grid';

  archivedStudents.forEach(student => {
    const card = document.createElement('div');
    card.classList.add('achievement-card');
    const avatarSrc = student.avatar ? student.avatar : 'avatar-default.jpg';
    const studentAch = cachedAchievements.filter(a => a.studentId === student.id);

    card.innerHTML = `
      <div class="mc-achievement">
        <img src="${avatarSrc}" class="achievement-icon">
        <div class="achievement-text">
          <h3>${student.name}</h3>
          <p>Достижений: ${studentAch.length}</p>
        </div>
        ${currentRole === 'admin' ? `
          <div class="card-actions">
            <button class="btn-unarchive" data-id="${student.id}" title="Вернуть из архива">↩️</button>
            <button class="btn-delete" data-id="${student.id}" title="Удалить навсегда">️</button>
          </div>
        ` : ''}
      </div>
    `;
    container.appendChild(card);
  });

  if (currentRole === 'admin') {
    container.querySelectorAll('.btn-unarchive').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        await update(ref(db, `students/${id}`), { archived: false });
      });
    });

    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const student = cachedStudents.find(s => s.id === id);
        if (!confirm(`Удалить "${student.name}" НАВСЕГДА?\nВсе его достижения будут удалены безвозвратно!`)) return;

        await remove(ref(db, `students/${id}`));

        const studentAchievements = cachedAchievements.filter(a => a.studentId === id);
        for (const ach of studentAchievements) {
          await remove(ref(db, `achievements/${ach.id}`));
        }
      });
    });
  }
}

// ============================================
// 29. ЗАПУСК
// ============================================
async function startApp() {
  await initDatabase();

  await new Promise(resolve => {
    const unsub = onValue(ref(db, 'students'), (snapshot) => {
      const data = snapshot.val() || {};
      cachedStudents = Object.values(data);
      unsub();
      resolve();
    }, { onlyOnce: true });
  });

  if (cachedStudents.length > 0) {
    if (currentRole === 'student' && studentId) {
      activeStudentId = parseInt(studentId);
    } else {
      activeStudentId = cachedStudents[0].id;
    }
  }

  switchTab('student');
}

startApp();
