// ==== KELAS UNTUK TUGAS ==== //
class Task {
  constructor(text, deadline = '') {
    this.id = Date.now();
    this.text = text;
    this.deadline = deadline;
    this.done = false;
  }
}

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const renderTasks = () => {
  const taskList = document.getElementById('taskList');
  const sortedTasks = [...tasks].sort((a, b) => a.done - b.done);
  taskList.innerHTML = '';
  sortedTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleTaskDone(task.id));

    const span = document.createElement('span');
    span.innerHTML = `${task.text}${task.deadline ? ` <small>(Deadline: ${task.deadline})</small>` : ''}`;

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.addEventListener('click', () => editTask(task.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '❌';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
};

const addTask = () => {
  const input = document.getElementById('taskInput');
  const deadline = document.getElementById('taskDeadline').value;
  if (!input.value.trim()) return;
  const task = new Task(input.value, deadline);
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  input.value = '';
  document.getElementById('taskDeadline').value = '';
  renderTasks();
  showMessage("✅ Task added!");
};

const deleteTask = id => {
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};

const toggleTaskDone = id => {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
};

const editTask = id => {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newText = prompt("Edit task text:", task.text);
  if (newText === null || newText.trim() === '') return;

  const newDeadline = prompt("Edit deadline (YYYY-MM-DD):", task.deadline);
  if (newDeadline !== null) {
    task.deadline = newDeadline.trim();
  }

  task.text = newText.trim();
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  showMessage("✏️ Task updated!");
};

const clearCompletedTasks = () => {
  tasks = tasks.filter(t => !t.done);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  showMessage("🧹 Completed tasks have been deleted!");
};

// ==== CATATAN PRIBADI ==== //
class Note {
  constructor(text) {
    this.id = Date.now();
    this.text = text;
  }
}

let notes = JSON.parse(localStorage.getItem('notes')) || [];

const renderNotes = () => {
  const noteList = document.getElementById('noteList');
  noteList.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note.text;

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.addEventListener('click', () => editNote(note.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.addEventListener('click', () => deleteNote(note.id));

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    noteList.appendChild(li);
  });
};

const addNote = () => {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) return;
  const note = new Note(text);
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
  input.value = '';
  renderNotes();
};

const deleteNote = id => {
  notes = notes.filter(note => note.id !== id);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
};

const editNote = id => {
  const note = notes.find(n => n.id === id);
  const newText = prompt("Edit note:", note.text);
  if (newText !== null && newText.trim()) {
    note.text = newText.trim();
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
  }
};

// ==== CUACA REAL-TIME ==== //
const fetchWeather = async () => {
  try {
    const city = 'Bandar Lampung';
    const apiKey = '123b258b5d04ad57dc5cffcb1b18fdd5'; // Ganti dengan API key kamu
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    const info = `🌡️ ${data.main.temp}°C, ${data.weather[0].description}`;
    document.getElementById('weather-info').innerText = info;
  } catch (err) {
    document.getElementById('weather-info').innerText = 'Failed to load weather data';
  }
};

// ==== NOTIFIKASI MINI ==== //
const showMessage = (text) => {
  const msg = document.getElementById('message');
  msg.innerText = text;
  msg.style.display = 'block';
  setTimeout(() => {
    msg.style.display = 'none';
  }, 3000);
};

// ==== DARK MODE TOGGLE ==== //
const toggleThemeBtn = document.getElementById('toggle-theme');

const applyTheme = (isDark) => {
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

toggleThemeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  applyTheme(!isDark);
});

// Load theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
});

// ==== EXPORT & IMPORT DATA ==== //
const exportData = () => {
  const data = {
    tasks,
    notes
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mylifeboard_backup.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showMessage("📁 Data exported successfully!");
};

const importData = () => {
  const fileInput = document.getElementById('importFile');
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (imported.tasks && imported.notes) {
        tasks = imported.tasks;
        notes = imported.notes;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('notes', JSON.stringify(notes));
        renderTasks();
        renderNotes();
        showMessage("✅ Data imported successfully!");
      } else {
        showMessage("⚠️ Invalid file format.");
      }
    } catch (e) {
      showMessage("❌ Failed to import data.");
    }
  };
  reader.readAsText(file);
};

// ==== INISIALISASI ==== //
document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  renderNotes();
  fetchWeather();
});  