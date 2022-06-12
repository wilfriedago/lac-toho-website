// Responsive
const toggleBtn = document.querySelector('.header__toggle-button');
const navArea = document.querySelector('.header__nav');
const nav = document.querySelector('.nav');

const navLink = document.querySelectorAll('.nav__item'); //FIXME: Fix this querySelectorAll not working properly

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('active');
  navArea.classList.toggle('visible');
  nav.classList.toggle('active');
});

navLink.addEventListener('click', () => {
  toggleBtn.classList.remove('active');
  nav.classList.remove('active');
});

// Form handle
// TODO : Implement this function [resetFormValues(), handleFormSubmit(), checkValidity()]

const nameInput = document.querySelector('input');

nameInput.addEventListener('input', () => {
  nameInput.setCustomValidity('');
  nameInput.checkValidity(); //TODO : use Regex to check form input validity email
});

nameInput.addEventListener('invalid', () => {
  if (nameInput.value === '') {
    nameInput.setCustomValidity('Enter your username!');
  } else {
    nameInput.setCustomValidity(
      'Usernames can only contain upper and lowercase letters. Try again!'
    );
  }
});
