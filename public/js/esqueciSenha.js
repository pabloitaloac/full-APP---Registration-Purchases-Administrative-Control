
    function validar(username){

        if(username.value.length > 0){
            document.getElementById("formChangePassword").submit()

        }                       
        else if(username.value.length == 0){
                var usernameToChange = document.getElementById('usernameToChange')
                usernameToChange.innerHTML = 'Preencha o campo'
        }
        
    }
