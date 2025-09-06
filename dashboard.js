const token = localStorage.getItem('token');
if (!token) window.location.href = 'login.html';

const projectList = document.getElementById('projectList');
const newProjectBtn = document.getElementById('newProjectBtn');

async function loadProjects() {
  try {
    const res = await fetch('http://localhost:3000/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const projects = await res.json();

    projectList.innerHTML = '';
    projects.forEach(proj => {
      const li = document.createElement('li');
      li.textContent = proj.name;
      li.style.cursor = 'pointer';
      li.onclick = () => location.href = `project.html?projectId=${proj.id}`;
      projectList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    alert('Could not load projects');
  }
}
newProjectBtn.onclick = async () => {
  const name = prompt('Enter project name:');
  if (!name) return;
  await fetch('http://localhost:3000/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });
  loadProjects();
};
loadProjects();