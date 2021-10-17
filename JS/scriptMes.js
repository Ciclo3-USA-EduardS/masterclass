const endpointMes =
  "https://gb5fed5c7c16c49-db202109eduard.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message";
const etpMes = document.getElementById("informacionMes");
/** capturar bones decliente */
const bmostrarMes = document.getElementById("bmostrarMes");
const bguardarMes = document.getElementById("bguardarMes");
const bactualizarMes = document.getElementById("bactualizarMes");
const beliminarMes = document.getElementById("beliminarMes");

/** captura de los inputs de la interfaz html para mensajes */
const idMes = document.getElementById("idMes");
const messagetext = document.getElementById("messagetext");

/**
 * petición get para mensajes
 */

function peticiongetMes() {
  $.ajax({
    method: "GET",
    url: endpointMes,
    success: function (data) {
      getMessage(data.items);
    },
  });
}

function peticionpostMes() {
  $.ajax({
    method: "POST",
    url: endpointMes,
    data: capturarMensajes(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      mostrarResultadoMes(response.status, "Se guardó con exito");
      //console.log(response.status);
      limpiarCampoMes();
      peticiongetMes();
    },
  });
}

function peticionPutMes() {
  $.ajax({
    method: "PUT",
    url: endpointMes,
    data: capturarMensajes(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      mostrarResultadoMes(response.status, "Se actualizó con exito");
      //console.log(response.status);
      limpiarCampoMes();
      peticiongetMes();
    },
  });
}

function peticionDeleteMes() {
  $.ajax({
    method: "DELETE",
    url: endpointMes,
    data: captIdMes(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      resultadoEliminarMes(response.status);
      limpiarCampoMes();
      peticiongetMes();
    },
  });
}

function getMessage(mensajes) {
  let cadenaMes = "";
  if (mensajes.length == 0) {
    cadenaMes = "Sin Registros";
  } else {
    mensajes.forEach((mensaje) => {
      cadenaMes +=
        "<p>id: " +
        mensaje.id +
        "</p>" +
        "<p>messagetext: " +
        mensaje.messagetext +
        "</p>";
    });
  }

  //console.log(etpMes);
  //console.log(cadenaMes);
  etpMes.innerHTML = cadenaMes;
}

function capturarMensajes() {
  const data = {
    id: idMes.value,
    messagetext: messagetext.value,
  };
  return JSON.stringify(data);
}

function mostrarResultadoMes(status, texto) {
  let mensaje = "";
  if (status == 201) {
    mensaje = texto;
  } else if (status == 204) {
    mensaje = "El registro existe";
  }
  alert(mensaje);
}

function limpiarCampoMes() {
  idMes.value = "";
  messagetext.value = "";
  idMes.focus();
}

function validarCampoMes() {
  if (idMes.value == "" || messagetext.value == "") {
    console.log(messagetext.value);
    return true;
  } else {
    return false;
  }
}

function captIdMes() {
  const data = {
    id: idMes.value,
  };
  return JSON.stringify(data);
}

function resultadoEliminarMes(status) {
  if (status == 204) {
    alert("Registro eliminado");
    
  }
}

function validarCampoEliMes() {
  if (idMes.value == "") {
    return true;
  } else {
    return false;
  }
}

bmostrarMes.addEventListener("click", (e) => {
  e.preventDefault();
  peticiongetMes();
});

bguardarMes.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoMes()) {
    alert("campo(s) Vacio!!");
  } else {
    peticionpostMes();
  }
});

bactualizarMes.addEventListener("click", (e) => {
  e.preventDefault();

  if (validarCampoMes()) {
    alert("Campo(s) vacio!!");
  } else {
    peticionPutMes();

  }
});

beliminarMes.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(idMes.value);
  if (validarCampoEliMes()) {
    alert("Campo id Vacio!!");
  } else {
    peticionDeleteMes();

  }
});
