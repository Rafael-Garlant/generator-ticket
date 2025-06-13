document.addEventListener("DOMContentLoaded", () => {
  const ticketData = JSON.parse(localStorage.getItem('ticketData'));
  const ticketName = document.getElementById('username');
  const ticketNameTitle = document.querySelector('.username-title');
  const ticketGithub = document.querySelector('.attendee-handle');
  const ticketAvatar = document.querySelector('.img-user');
  const ticketDate = document.querySelector('.event-details');
  const ticketEmail = document.querySelector('.attendee-email');
  const ticketCode = document.querySelector('.code');

  
  
  if (ticketData) {
    ticketName.textContent = ticketNameTitle.textContent = ticketData.name;
    ticketGithub.textContent = ticketData.github;
    ticketAvatar.src = ticketData.avatar;
    ticketDate.textContent = ticketData.date + " / São Paulo, Br";
    ticketEmail.textContent = ticketData.email;
    ticketCode.innerText = ticketData.code;
  }
});