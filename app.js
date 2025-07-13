const usuarioValido = "admin";
const contrasenaValida = "1234";

let tareas = [];
let tareaSeleccionada = null;

function login() {
  const userInput = document.getElementById("username").value.trim();
  const passInput = document.getElementById("password").value.trim();
  const error = document.getElementById("login-error");

  if (userInput === usuarioValido && passInput === contrasenaValida) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("main-app").style.display = "block";
    document.getElementById("user-name").textContent = userInput;
    error.textContent = "";
  } else {
    error.textContent = "Usuario o contraseña incorrectos";
  }
}

document.getElementById("btn-login").addEventListener("click", login);

document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("task-id").value.trim();
  const titulo = document.getElementById("task-title").value.trim();
  const descripcion = document.getElementById("task-desc").value.trim();
  const fecha = document.getElementById("task-date").value;
  const cliente = document.getElementById("client-name").value.trim();
  const proyecto = document.getElementById("project-id").value.trim();
  const comentarios = document.getElementById("comments").value.trim();
  const estatus = document.getElementById("status").value;

  if (!id || !titulo || !descripcion || !fecha || !cliente || !proyecto || !comentarios) {
    alert("Por favor, llena todos los campos.");
    return;
  }

  const nuevaTarea = {
    id, titulo, descripcion, fecha, cliente, proyecto, comentarios, estatus
  };

  tareas.push(nuevaTarea);
  renderTabla();
  document.getElementById("task-form").reset();
});

function renderTabla() {
  const tabla = document.getElementById("task-table");
  tabla.innerHTML = "";

  const filtro = document.getElementById("filtro-estatus").value;

  tareas.forEach((tarea, index) => {
    if (filtro !== "Todos" && tarea.estatus !== filtro) return;

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${tarea.id}</td>
      <td>${tarea.titulo}</td>
      <td>${tarea.descripcion}</td>
      <td>${tarea.fecha}</td>
      <td>${tarea.cliente}</td>
      <td>${tarea.proyecto}</td>
      <td>${tarea.comentarios}</td>
      <td>${tarea.estatus}</td>
    `;

    fila.addEventListener("dblclick", () => cargarEnFormulario(index));
    tabla.appendChild(fila);
  });
}

function cargarEnFormulario(index) {
  const tarea = tareas[index];
  tareaSeleccionada = index;

  document.getElementById("edit-id").value = tarea.id;
  document.getElementById("edit-title").value = tarea.titulo;
  document.getElementById("edit-desc").value = tarea.descripcion;
  document.getElementById("edit-status").value = tarea.estatus;
  document.getElementById("new-comment").value = "";
}

document.getElementById("update-task").addEventListener("click", () => {
  try {
    if (tareaSeleccionada === null) {
      alert("Selecciona una tarea primero");
      return;
    }

    const nuevoEstatus = document.getElementById("edit-status").value;
    const nuevoComentario = document.getElementById("new-comment").value.trim();
    const fecha = new Date().toLocaleString();

    const tarea = tareas[tareaSeleccionada];
    tarea.estatus = nuevoEstatus;

    if (nuevoComentario) {
      tarea.comentarios += `\n[${fecha}]: ${nuevoComentario}`;
    }

    renderTabla();
    alert("Tarea actualizada correctamente");

  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    alert("Error al actualizar tarea. Revisa consola.");
  }
});

document.getElementById("filtro-estatus").addEventListener("change", () => {
  renderTabla();
});
