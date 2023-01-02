
function logout(){

    alert('inicio')
  
    var c = document.cookie.split("; ");
  
    alert(c)
  
    for (i in c) 
    document.cookie =/^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";    
  
      document.location('/login')
  
  }
  
  
      //To Know if user is logged
      function userPanel(){
  
        //search entire url
        var url = window.location.href
        //search last part of url
        url = url.split('/');
              const lastPartUrl = url[url.length-1]
  
              // Is ID
              if(lastPartUrl.length > 15){
                location.href = `/user/painel/${lastPartUrl}`
              }
              // Not is ID
              else{
                location.href = '/user/painel'
              }
        }