
    // function editUser(x, y, z, d) {
    //   if(x.value.length == 0 && y.value.length == 0 && z.value.length == 0 && d.value.length == 0){
    //     var pAlterar = document.getElementById('pAlterar')
    //     pAlterar.innerHTML = 'Preencha algum campo, se desejar alterar'
    //   }
    // }

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
      
      // function revelarSenha(password, showSenha){
      //   if (password.type == "password") {
      //     password.type = "text"
      //     showSenha.textContent = "OCULTAR Senha"
      //   } else {
      //     password.type = "password"
      //     showSenha.textContent = "MOSTRAR Senha"
      //   }
      // }
  
      
  