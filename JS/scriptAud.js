const endpointAud =
  "https://gb5fed5c7c16c49-db202109eduard.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/audience/audience";
const etp = document.getElementById("informacionAud");
/** capturar bones de auditorio */
const bmostrarAud = document.getElementById("bmostrarAud");
const bguardarAud = document.getElementById("bguardarAud");
const bactualizarAud = document.getElementById("bactualizarAud");
const beliminarAud = document.getElementById("beliminarAud");

/** captura de los inputs de la interfaz html para auditorios */
const idAud = document.getElementById("idAud");
const owner = document.getElementById("owner");
const capacity = document.getElementById("capacity");
const category_id = document.getElementById("category_id");
const name = document.getElementById("name");

/**
 * petición get para auditorios
 */

function peticiongetAud() {
  $.ajax({
    method: "GET",
    url: endpointAud,
    success: function (data) {
      getAuditorio(data.items);
    },
  });
}

function peticionpostAud() {
  $.ajax({
    method: "POST",
    url: endpointAud,
    data: capturarAuditorio(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      mostrarResultadoAud(response.status, "Se guardó con exito");
      //console.log(response.status);
      limpiarCampoAud();
      peticiongetAud();
    },
  });
}

function peticionPutAud() {
  $.ajax({
    method: "PUT",
    url: endpointAud,
    data: capturarAuditorio(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      mostrarResultadoAud(response.status, "Se actualizó con exito");
      //console.log(response.status);
      limpiarCampoAud();
      peticiongetAud();
    },
  });
}

function peticionDeleteAud() {
  $.ajax({
    method: "DELETE",
    url: endpointAud,
    data: captIdAud(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      resultadoEliminarAud(response.status);
      limpiarCampoAud();
      peticiongetAud();
    },
  });
}

function getAuditorio(auditorios) {
  let cadenaAud = "";
  if (auditorios.length == 0) {
    cadenaAud = "Sin Registros";
  } else {
    auditorios.forEach((auditorio) => {
      cadenaAud +=
        "<p>id: " +
        auditorio.id +
        "</p>" +
        "<p>owner: " +
        auditorio.owner +
        "</p>" +
        "<p>capacity: " +
        auditorio.capacity +
        "</p>" +
        "<p>category_id: " +
        auditorio.category_id +
        "</p>" +
        "<p> name: " +
        auditorio.name +
        "</p>";
    });
  }

  //console.log(etp);
  //console.log(cadenaAud);
  etp.innerHTML = cadenaAud;
}

function capturarAuditorio() {
  const data = {
    id: idAud.value,
    owner: owner.value,
    capacity: capacity.value,
    category_id: category_id.value,
    name: name.value,
  };
  return JSON.stringify(data);
}

function mostrarResultadoAud(status, texto) {
  let mensaje = "";
  if (status == 201) {
    mensaje = texto;
  } else if (status == 204) {
    mensaje = "El registro existe";
  }
  alert(mensaje);
}

function limpiarCampoAud() {
  idAud.value = "";
  owner.value = "";
  capacity.value = "";
  category_id.value = "";
  name.value = "";
  idAud.focus();
}

function validarCampoAud() {
  if (
    idAud.value == "" ||
    owner.value == "" ||
    capacity.value == "" ||
    category_id.value == "" ||
    name.value == ""
  ) {
    return true;
  } else {
    return false;
  }
}

function captIdAud() {
  const data = {
    id: idAud.value,
  };
  return JSON.stringify(data);
}

function resultadoEliminarAud(status) {
  if (status == 204) {
    alert("Registro eliminado");
  }
}

function validarCampoEliAud() {
  if (idAud.value == "") {
    return true;
  } else {
    return false;
  }
}

bmostrarAud.addEventListener("click", (e) => {
  e.preventDefault();
  peticiongetAud();
});

bguardarAud.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoAud()) {
    alert("campo(s) Vacio!!");
  } else {
    peticionpostAud();
  }
});

bactualizarAud.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoAud()) {
    alert("Campo(s) vacio!!");
  } else {
    peticionPutAud();
  }
});

beliminarAud.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoEliAud()) {
    alert("Campo id Vacio!!");
  } else {
    peticionDeleteAud();
  }
});
