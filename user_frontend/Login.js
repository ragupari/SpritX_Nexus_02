import axios from 'axios';

async function login() {
  try {
    const res = await axios.get('/tokenauth', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    });
    console.log(res.data.username);
    console.log(res.data.success);
    return res.data; // Return the full data object
  } catch (err) {
    console.log(err);
    return { success: false }; // Return a consistent shape
  }
}

function logout() {
  // Remove token from localStorage
  localStorage.removeItem('token');
  console.log('Logged out successfully');
  // Optionally, redirect to login page (if using a routing library like react-router)
  window.location.href = '/signin'; // Redirect to login page
}

export { login, logout };
