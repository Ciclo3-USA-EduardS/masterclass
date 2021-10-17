const endpointCli =
  "https://gb5fed5c7c16c49-db202109eduard.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client";
const etpCli = document.getElementById("informacionCli");
/** capturar bones decliente */
const bmostrarCli = document.getElementById("bmostrarCli");
const bguardarCli = document.getElementById("bguardarCli");
const bactualizarCli = document.getElementById("bactualizarCli");
const beliminarCli = document.getElementById("beliminarCli");

/** captura de los inputs de la interfaz html para clientes */
const idCli = document.getElementById("idCli");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const age = document.getElementById("age");

/**
 * petición get para clientes
 */

function peticiongetCli() {
  $.ajax({
    method: "GET",
    url: endpointCli,
    success: function (data) {
      getCliente(data.items);
    },
  });
}

function peticionpostCli() {
  $.ajax({
    method: "POST",
    url: endpointCli,
    data: capturarClientes(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      mostrarResultadoCli(response.status, "Se guardó con exito");
      //console.log(response.status);
      limpiarCampoCli();
      peticiongetCli();
    },
  });
}

function peticionPutCli() {
  $.ajax({
    method: "PUT",
    url: endpointCli,
    data: capturarClientes(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      mostrarResultadoCli(response.status, "Se actualizó con exito");
      //console.log(response.status);
      limpiarCampoCli();
      peticiongetCli();
    },
  });
}

function peticionDeleteCli() {
  $.ajax({
    method: "DELETE",
    url: endpointCli,
    data: captIdCli(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      resultadoEliminarCli(response.status);
      limpiarCampoCli();
      peticiongetCli();
    },
  });
}

function getCliente(clientes) {
  let cadenaCli = "";
  if (clientes.length == 0) {
    cadenaCli = "Sin Registros";
  } else {
    clientes.forEach((cliente) => {
      cadenaCli +=
        "<p>id: " +
        cliente.id +
        "</p>" +
        "<p>nombre: " +
        cliente.name +
        "</p>" +
        "<p>email: " +
        cliente.email +
        "</p>" +
        "<p>age: " +
        cliente.age +
        "</p>";
    });
  }

  //console.log(etpCli);
  //console.log(cadenaCli);
  etpCli.innerHTML = cadenaCli;
}

function capturarClientes() {
  const data = {
    id: idCli.value,
    name: nombre.value,
    email: email.value,
    age: age.value,
  };
  return JSON.stringify(data);
}

function mostrarResultadoCli(status, texto) {
  let mensaje = "";
  if (status == 201) {
    mensaje = texto;
  } else if (status == 204) {
    mensaje = "El registro existe";
  }
  alert(mensaje);
}

function limpiarCampoCli() {
  idCli.value = "";
  nombre.value = "";
  email.value = "";
  age.value = "";
  idCli.focus();
}

function validarCampoCli() {
  if (
    idCli.value == "" ||
    nombre.value == "" ||
    email.value == "" ||
    age.value == ""
  ) {
    //console.log(nombre.value);
    return true;
  } else {
    return false;
  }
}

function captIdCli() {
  const data = {
    id: idCli.value,
  };
  return JSON.stringify(data);
}

function resultadoEliminarCli(status) {
  if (status == 204) {
    alert("Registro eliminado");
  }
}

function validarCampoEliCli() {
  if (idCli.value == "") {
    return true;
  } else {
    return false;
  }
}

bmostrarCli.addEventListener("click", (e) => {
  e.preventDefault();
  peticiongetCli();
});

bguardarCli.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoCli()) {
    alert("campo(s) Vacio!!");
  } else {
    peticionpostCli();
  }
});

bactualizarCli.addEventListener("click", (e) => {
  e.preventDefault();

  if (validarCampoCli()) {
    alert("Campo(s) vacio!!");
  } else {
    peticionPutCli();
  } 
});

beliminarCli.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(idCli.value)
  if (validarCampoEliCli()) {
    alert("Campo id Vacio!!");
  } else {
    peticionDeleteCli();
  }
});
