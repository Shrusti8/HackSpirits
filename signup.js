const form = document.getElementById('signupForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!name || !email || !password) {
    alert('All fields are required.');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Sign up successful! Please log in.');
      window.location.href = '/'; // redirect to login page
    } else {
      alert(data.message || 'Sign up failed');
    }

  } catch (err) {
    console.error('Signup error:', err);
    alert('Server error. Please try again later.');
  }
});