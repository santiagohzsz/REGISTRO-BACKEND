
// auth.js

document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById("login-btn");
  const loginModal = document.getElementById('login-modal');
  const closeModal = document.getElementById('close-modal');
  const registerBtn = document.getElementById('register-btn');

  if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', function (e) {
      e.preventDefault();
      loginModal.classList.remove('hidden');
    });
  } else {
    console.error("Error: No se encontró el botón o el modal de inicio de sesión.");
  }

  if (closeModal && loginModal) {
    closeModal.addEventListener('click', function (e) {
      e.preventDefault();
      closeAuthModal();
    });
  } else {
    console.error("Error: No se encontró el botón de cerrar el modal.");
  }

  if (registerBtn) {
    registerBtn.addEventListener('click', function (e) {
      e.preventDefault();

      const registerName = document.getElementById('register-name').value;
      const registerEmail = document.getElementById('register-email').value;
      const registerPassword = document.getElementById('register-password').value;

      // const auth = getAuth(); // Ya no es necesario

      firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword)
        .then((userCredential) => {
          // El usuario se ha registrado correctamente
          const user = userCredential.user;
          console.log("Usuario registrado:", user);

          return user.updateProfile({ // Retorna la promesa
            displayName: registerName
          });
        })
        .then(() => {
          console.log("Perfil actualizado");
          window.location.href = 'cuestionario.html';
        })
        .catch((error) => {
          // Ocurrió un error al registrar al usuario
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error al registrar usuario:", errorCode, errorMessage);

          // Muestra el error al usuario en la interfaz
          // (por ejemplo, en el elemento con id "error-message")
        });
    });
  } else {
    console.error("Error: No se encontró el botón de registrarse.");
  }
});

function switchToRegister() {
  document.querySelector(".login-form").classList.add("hidden");
  document.querySelector(".register-form").classList.remove("hidden");
}

function switchToLogin() {
  document.querySelector(".register-form").classList.add("hidden");
  document.querySelector(".login-form").classList.remove("hidden");
}

function closeAuthModal() {
  const loginModal = document.getElementById("login-modal");
  loginModal.classList.add("hidden");

  document.querySelector(".login-form").classList.remove("hidden");
  document.querySelector(".register-form").classList.add("hidden");
}

const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const loginEmail = document.getElementById('login-email').value;
      const loginPassword = document.getElementById('login-password').value;

      const auth = firebase.auth(); // Obtiene la instancia de auth

      auth.signInWithEmailAndPassword(loginEmail, loginPassword)
        .then((userCredential) => {
          // El usuario ha iniciado sesión correctamente
          const user = userCredential.user;
          console.log("Usuario ha iniciado sesión:", user);

          window.location.href = 'escritorio.html'; // Redirige al escritorio
        })
        .catch((error) => {
          // Ocurrió un error al iniciar sesión
  const errorCode = error.code;
  const errorMessage = error.message;
  console.error("Error al iniciar sesión:", errorCode, errorMessage);

  let displayMessage = "Ocurrió un error al iniciar sesión. Inténtalo de nuevo.";

  if (errorCode === 'auth/user-not-found') {
    displayMessage = "No existe una cuenta con este correo electrónico.";
  } else if (errorCode === 'auth/wrong-password') {
    displayMessage = "La contraseña es incorrecta.";
  } else if (errorCode === 'auth/too-many-requests') {
    displayMessage = "Hemos bloqueado todas las solicitudes desde este dispositivo debido a actividad inusual. Inténtalo de nuevo más tarde.";
  }

  // Muestra el error al usuario en la interfaz
  const errorMessageElement = document.getElementById('error-message');
  if (errorMessageElement) {
    errorMessageElement.textContent = displayMessage;
          }
        });
    });
  } else {
    console.error("Error: No se encontró el formulario de inicio de sesión.");
  }