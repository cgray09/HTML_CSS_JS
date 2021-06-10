const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

// Toggle nav
toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')  /* generates this class in the body when clicked and vice versa */
);  /* im thinking that 'show-nav' is built in for the 
       nav since the nav is built in */

// Show modal
open.addEventListener('click', () => modal.classList.add('show-modal'));  // adds this div w/ the class to the modal

// Hide modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));  // removes this div w/ the class to the modal

// Hide modal on outside click
window.addEventListener('click', e =>
  e.target == modal ? modal.classList.remove('show-modal') : false
);

// window is the top most object in the browser */
