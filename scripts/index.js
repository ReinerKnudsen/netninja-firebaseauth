import { database } from './firebase.js';
import {
  collection,
  doc,
  getDoc,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

const guideList = document.querySelector('.guides');

const logoutLinks = document.querySelectorAll('.logged-out');
const loginLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

export const setupUI = (user) => {
  if (user) {
    // show items only for admins (video 20)
    if (user.admin) {
      adminItems.forEach((item) => (item.style.display = 'block'));
    }
    // show account info (video 14)
    // display the user's bio (video 15)
    // the following code looks quite different from Shaun's video, but it does the same thing
    const userDocRef = doc(database, 'users', user.uid);
    getDoc(userDocRef).then((doc) => {
      const html = `
      <div>Logged in as ${user.email}</div>
      <div><em>${doc.data().bio}</em></div>
      <div class="blue-text">${user.admin ? 'Admin' : ''}</div>
    `;
      accountDetails.innerHTML = html;
    });

    // toggle user menu elements (video 11)
    loginLinks.forEach((item) => (item.style.display = 'block'));
    logoutLinks.forEach((item) => (item.style.display = 'none'));
  } else {
    // hide admin items (video 20)
    adminItems.forEach((item) => (item.style.display = 'none'));
    // hide account info (video 14)
    accountDetails.innerHTML = '';
    // toggle user menu elements (video 11)
    loginLinks.forEach((item) => (item.style.display = 'none'));
    logoutLinks.forEach((item) => (item.style.display = 'block'));
  }
};
// setup guides (video 9)
export const setupGuides = (data) => {
  let html = '';
  if (data.length) {
    data.forEach((doc) => {
      const guide = doc.data();
      const li = `
    <li>
      <div class="collapsible-header grey lighten-4">${guide.title}</div>
      <div class="collapsible-body white">${guide.content}</div>
    </li>
    `;
      html += li;
    });
  } else {
    html = '<h5 class="center-align grey-text">Login to view guides</h5>';
  }
  guideList.innerHTML = html;
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});
