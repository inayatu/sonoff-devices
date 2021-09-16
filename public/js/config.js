const baseURL = 'http://localhost:3333';
const cookies = document.cookie.split(';');
const getCookie = (cname) => {
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].split('=');
    if (cookie[0].trim() == cname.trim()) {
      return cookie[1];
    }
  }
  return null;
};
