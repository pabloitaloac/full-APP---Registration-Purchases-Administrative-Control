
    function editUser(x, y, z, d) {
        var regex = /^(?=(?:.*?[A-Z]){3})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/
  
        var problemPassword = document.getElementById('problemPassword')
  
        if(x.value.length == 0 && y.value.length == 0 && z.value.length == 0 && d.value.length == 0){
          var pAlterar = document.getElementById('pAlterar')
          pAlterar.innerHTML = 'Preencha algum campo, se desejar alterar'
        }
        else if(d.value.length < 8){
  problemPassword.innerHTML = 'A senha deve conter no mínimo 08 caracteres'
        }
        else if(!regex.exec(d.value)){
          problemPassword.innerHTML = 'A senha deve conter no mínimo:<br>3 caracteres em maiúsculo;<br>2 números;<br>1 caractere especial.'
        }
        else{
          document.getElementById('updateUserForm').submit()
        }
      }
  
      function excludeUser(){
        if(sim.checked == true){
          // var id = document.getElementById('idSingleUser')
  
          document.getElementById("formExclude").submit()
  
  
            // window.location.href = `/adm/delete/users/${id.textContent}`
          // alert('/adm/delete/users/'+id.textContent)
          
        }
        else{
          alert('Para excluir, CONFIRME')
        }
      }
      
      function revelarSenha(passwordUser, showSenha){
        if (passwordUser.type == "password") {
          passwordUser.type = "text"
          showSenha.textContent = "OCULTAR Senha"
        } else {
          passwordUser.type = "password"
          showSenha.textContent = "MOSTRAR Senha"
        }
      }
  
      
  