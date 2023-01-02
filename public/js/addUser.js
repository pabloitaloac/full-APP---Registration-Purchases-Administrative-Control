
function submitForm(){
    if(firstName.value.length == 0 || lastName.value.length == 0 || email.value.length == 0 || password.value.length == 0){
      alert('preencha tudo')
    }
    else{
      document.getElementById("addUserForm").submit()
    }
  }
  