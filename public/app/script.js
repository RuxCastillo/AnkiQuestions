const sidebar = document.getElementById('sidebar');
const sidebarbutton = document.querySelector('.fa-bars');

sidebarbutton.addEventListener('click', () => {
	sidebar.classList.toggle('hide');
});
