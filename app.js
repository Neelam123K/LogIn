window.addEventListener('load', () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    showProfile(user);
  } else {
    document.getElementById('signup-container').style.display = 'block';
  }
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault(); 

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const message = document.getElementById('message');

  if (!name || !email || !password || !confirmPassword) {
    message.textContent = "All fields are required.";
    message.style.color = "red";
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    message.style.color = "red";
    return;
  }

  const accessToken = Math.random().toString(36).substring(2, 18);

  const user = {
    name,
    email,
    password,
    accessToken,
  };

  localStorage.setItem('user', JSON.stringify(user));

  message.textContent = "Signup successful! Redirecting to profile...";
  message.style.color = "green";

  setTimeout(() => {
    showProfile(user); 
  }, 1000);
});

function showProfile(user) {
  document.getElementById('signup-container').style.display = 'none';
  document.getElementById('profile-container').style.display = 'block';
  document.getElementById('profile-name').textContent = user.name;
  document.getElementById('profile-email').textContent = user.email;
}

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('user'); 
  alert("Logged out successfully.");
  window.location.reload(); 
});
