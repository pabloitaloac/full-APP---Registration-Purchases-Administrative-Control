
function isAnySeted(){
    if(lastNameFilter.value.length == 0 && firstNameFilter.value.length == 0 && emailFilter.value.length == 0){
      
      let toChange = document.getElementById("toChange")
      
      toChange.innerHTML = "Para filtrar, preencha algum filtro"
    }
  }
  
  function redirectSingleUser(id){
    window.location.href = `/adm/users/${id}`
  }
  