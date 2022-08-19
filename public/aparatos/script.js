const getCurrentValues = () => {
  showLoading(true);
  $.ajax({
    url: `https://sorteos-pelitos.herokuapp.com/api/aparato/`,
    type: 'GET',
    success: (result) => {
      Object.keys(result).forEach(key => {
        setSwitchValue(key, result[key]);
      });
      showLoading(false);
    }
  });
};

const setSwitchValue = (id, value) => {
  if(!['hora','total'].includes(id)) {
    let chkElem = document.getElementById(id);
    chkElem.checked = (value == "ON");
  };
};

const showLoading = (show) => {
  console.log('show loading: ', show);
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

$(document).ready(function () {
  loadingModal = document.getElementById('loadingModal');
  showLoading(true);
  getCurrentValues();
});

addEventListener('change', handleSwitchChange);
