const getCurrentValues = () => {
  showLoading(true);
  $.ajax({
    url: `https://sorteos-pelitos.herokuapp.com/api/aparato/`,
    type: 'GET',
    success: (result) => {
      console.log(result);
      Object.keys(result).forEach(key => {
        setSwitchValue(key, result[key]);
      });
      conexionDesc.innerHTML = 'Conexión: ' + result.last_checked_time;
      showLoading(false);
    }
  });
};

const setSwitchValue = (id, value) => {
  if(!['hora','last_checked_time'].includes(id)) {
    let chkElem = document.getElementById(id);
    if(chkElem)
      chkElem.checked = (value == "ON");
  };
};

const showLoading = (show) => {
  loadingModal.style.display = show ? "inline-block" : "none";
}

const handleSwitchChange = (event) => {
  let id = event?.target?.id || '';
  if(id) {
    showLoading(true);
    $.ajax({
      url: `https://sorteos-pelitos.herokuapp.com/api/aparato/${id}`,
      type: 'PUT',
      contentType: "application/json",
      success: (result) => {
          showLoading(true);
          getCurrentValues();
      }
    });
  };
}

let loadingModal;
let conexionDesc;

$(document).ready(function () {
  loadingModal = document.getElementById('loadingModal');
  conexionDesc = document.getElementById('conexionDesc');
  showLoading(true);
  getCurrentValues();
});

addEventListener('change', handleSwitchChange);
