
function revelarSenha(password, showSenha){
    if (password.type == "password") {
      password.type = "text"
      showSenha.value = "OCULTAR"
    } else {
      password.type = "password"
      showSenha.value = "MOSTRAR"
    }
}

  function copydefaultUserName(){

      /* Selecionamos por ID o nosso input */
      var textoCopiado = document.getElementById("defaultUserName")

      /* Deixamos o texto selecionado (em azul) */
      textoCopiado.select();

      /* Copia o texto que está selecionado */
      document.execCommand("copy");


  }

  function copydefaultPassword(){
      /* Selecionamos por ID o nosso input */
      var textoCopiado = document.getElementById("defaultPassword")

      /* Deixamos o texto selecionado (em azul) */
      textoCopiado.select();

      /* Copia o texto que está selecionado */
      document.execCommand("copy");



}
  






  function validar(username,password){
      
      if(username.value.length > 0 && password.value.length > 0){
          var form = document.getElementById("formLogin").submit()                            
      }                       
      else{
          if(username.value.length == 0){
              var usernameToChange = document.getElementById('usernameToChange')
              
              usernameToChange.style.cssText =
                  'color: white;' +
                  'background-color: red;' +
                  'border: 1px solid magenta'
              usernameToChange.innerHTML = 'Preencha o campo'
          }
          if(password.value.length == 0){
              var passwordToChange = document.getElementById('passwordToChange')
              
              passwordToChange.style.cssText =
                  'color: white;' +
                  'background-color: red;' +
                  'border: 1px solid magenta;' 
              passwordToChange.innerHTML = 'Preencha o campo'
          }
      }
  }