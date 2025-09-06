const token = localStorage.getItem('token');
if (!token) window.location.href = '/index.html';

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('projectId');

document.getElementById('projectTitle').textContent = 'Project ' + projectId;

// TODO: Replace with API call later