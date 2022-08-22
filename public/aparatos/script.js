const getCurrentValues = () => {
  showLoading(true);
  $.ajax({
    url: `/api/aparato/`,
    type: 'GET',
    success: (result) => {
      divAparatos.innerHTML = "";
      Object.keys(result.aparatos).forEach(key => {
        generateControl(key, result.aparatos[key]);
      });
      divConexionDesc.innerHTML = 'Conexión: ' + result.conexion;
      showLoading(false);
    }
  });
};

const generateControl = (id, value) => {
  let input = document.createElement("input");
  input.className = "form-check-input";
  input.type = "checkbox";
  input.id = id;
  input.checked = value;
  
  let label = document.createElement("label");
  label.className = "form-check-label aparato-label";
  label.for = "flexSwitchCheckDefault";
  label.innerHTML = id.charAt(0).toUpperCase() + id.slice(1);

  let btnBorrar = document.createElement("span");
  btnBorrar.className = "material-symbols-rounded delete-icon";
  btnBorrar.setAttribute("onclick",`deleteAparato('${id}');`);
  btnBorrar.innerHTML = "delete_forever";

  let aparato = document.createElement("div");
  aparato.className = "form-check form-switch hac-card";
  aparato.appendChild(input);
  aparato.appendChild(label);
  aparato.appendChild(btnBorrar);

  divAparatos.appendChild(aparato);
};

const showLoading = (show) => {
  divLoadingModal.style.display = show ? "inline-block" : "none";
}

const handleSwitchChange = (event) => {
  let id = event?.target?.id || '';
  if(id) {
    showLoading(true);
    $.ajax({
      url: `/api/aparato/${id}`,
      type: 'PUT',
      contentType: "application/json",
      success: (result) => {
          showLoading(true);
          getCurrentValues();
      }
    });
  };
}

const deleteAparato = (id) => {
  showLoading(true);
  $.ajax({
    url: `/api/aparato/${id}`,
    type: 'DELETE',
    contentType: "application/json",
    success: (result) => {
        showLoading(true);
        getCurrentValues();
    }
  });
}

let divLoadingModal;
let divConexionDesc;
let divAparatos;

$(document).ready(function () {
  divLoadingModal = document.getElementById('loadingModal');
  divConexionDesc = document.getElementById('conexionDesc');
  divAparatos = document.getElementById('aparatos');
  showLoading(true);
  getCurrentValues();
});

addEventListener('change', handleSwitchChange);
