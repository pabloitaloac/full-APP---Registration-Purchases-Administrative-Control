
    function validar(password,password2){

        var passwordToChange = document.getElementById('passwordToChange')
        var passwordToChange2 = document.getElementById('passwordToChange2')


                          
        if(password.value.length == 0){
                passwordToChange.innerHTML = 'Preencha o campo'
        }
        else if(password2.value.length == 0){
                passwordToChange2.innerHTML = 'Preencha o campo'

        }
        else if(password.value != password2.value){        
            passwordToChange2.innerHTML = 'Os campos precisam ser iguais'
        }
        else if(password.value === password2.value && password.value.length > 0){
        
                    //Is all data complete? - Todos os campos escritos?
                    var regex = /^(?=(?:.*?[A-Z]){3})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/
          
                              
                              //Validate password - mínimo 3 caracteres em maiúsculo, 2 números e 1 caractere especial
                              if(password.value.length < 8){
                                passwordToChange.innerHTML = 'A senha deve conter 08 caracteres ou mais'
                              }
                              else if(!regex.exec(password.value))
                              {
                                passwordToChange2.innerHTML = `A senha deve conter no mínimo 3 caracteres em maiúsculo, 2 números e 1 caractere especial!`
                              }
                              else {

                                //OK
                                
                                document.getElementById("formChangePassword").submit()

                            }
    }     
    }