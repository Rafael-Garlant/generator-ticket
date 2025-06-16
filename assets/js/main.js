function formController() {
  const inputImg = document.querySelector('#avatar');
  const imgPreview = document.querySelector('.img-avatar');
  const labelAvatar = document.querySelector('#label-avatar');

  const errorFullName = document.querySelector('.error-full-name');
  const errorEmail = document.querySelector('.error-email');
  const errorGithub = document.querySelector('.error-github');
  const warnImage = document.querySelector('.p-warn');
  const errorImage = document.querySelector('.error-image');

  const form = document.getElementById('form');
  const fullName = document.getElementById('full-name');
  const email = document.getElementById('email');
  const github = document.getElementById('github');
  const button = document.getElementById('btn-submit');

  inputImg.addEventListener('change', () => {
    const file = inputImg.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        imgPreview.src = reader.result;
        imgPreview.alt = 'Imagem carregada';
      };
      reader.readAsDataURL(file);
    }
  });
  
  function validEmail() {
    if (email.value === "") {
      errorEmail.style.display = "block";
      email.style.border = "1px solid red";
      return false;
    } else {
      errorEmail.style.display = "none";
      email.style.border = "1px solid aqua";
      return true;
    }
  }

  function validName() {
    const nameCheck = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(fullName.value);
    
    if (fullName.value === "" || !nameCheck) {
      errorFullName.style.display = "block";
      fullName.style.border = "1px solid red";
      return false;
    } else {
      errorFullName.style.display = "none";
      fullName.style.border = "1px solid aqua";
      return true;
    }
  }

  function validGithub() {
    const username = github.value.trim();
    const regex = /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/;
  
    if (username === "" || !regex.test(username)) {
      errorGithub.style.display = "block";
      github.style.border = "1px solid red";
      return false;
      } else{
      errorGithub.style.display = "none";
      github.style.border = "1px solid aqua";
      return true;
    }
  }

  function validImage() {
    inputImg.addEventListener('change', () => {
      const file = inputImg.files[0];

      if (file) {
        const fileType = file.type;
        const validType = fileType === "image/jpeg" || fileType === "image/png";

        const tamanhoEmKB = file.size / 1024;
        if (tamanhoEmKB > 500 || !validType) {
          warnImage.className = "error-image";
          errorImage.style.display = "block";
          labelAvatar.style.border = "2px dashed red";
          return false;
        }
      }
    });

    if (inputImg.files.length === 0) {
      warnImage.className = "error-image";
      errorImage.style.display = "block";
      labelAvatar.style.border = "2px dashed red";
      return false;
    } else {
      warnImage.className = "p-warn";
      errorImage.style.display = "none";
      labelAvatar.style.border = "2px dashed aqua";
      return true;
    }
  }
  

  function generateCode() {
    const randomNumber = "#" + Math.random().toString(16).substring(2, 9).toUpperCase();
    
    return randomNumber
  }
  
  const code = generateCode(); 
  email.addEventListener("input", () => validEmail());
  inputImg.addEventListener("input", () => validImage());
  github.addEventListener("input", () => validGithub());
  fullName.addEventListener("input", () => validName());

  form.addEventListener('submit', event => {
    event.preventDefault();
    validImage();
    validEmail();
    validName();
    validGithub();
  });
  
  
  button.addEventListener('click', () => {
    console.log(validEmail(), validGithub(), validImage(), validName());

    const isNameValid = validName();
    const isGithubValid = validGithub();
    const isImageValid = validImage();
    const isEmailValid = validEmail();
    
    if (isNameValid && 
      isGithubValid && 
      isEmailValid && 
      isEmailValid && 
      isImageValid){
        
        const dateToday = { day: '2-digit', month: 'long', year: 'numeric' };
        const formatedDate = new Date().toLocaleDateString('pt-BR', dateToday);

        const ticketData = {
          name: fullName.value,
          email: email.value,
          github: github.value,
          avatar: imgPreview.src,
          date: formatedDate,
          code: code
        }

      localStorage.setItem('ticketData', JSON.stringify(ticketData))

      window.location.href = "./ticket.html";
    } else{
      console.log('Erro ao carregar os dados');
    }
  });
}

formController()