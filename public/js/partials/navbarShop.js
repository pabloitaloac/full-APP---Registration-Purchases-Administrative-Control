
  function emptyCart(){


      var cookies = document.cookie.split(';');//contains all the cookies
      var cookieName = []; // to contain name of all the cookies

      for(let i=0;i<cookies.length;i++) {
        cookieName[i] = cookies[i].split('=')[0].trim();
      }


      if(cookieName.includes('userID')) {
        // alert("EXIST ID - Empty at Server")



        var ajax = new XMLHttpRequest()
        
        ajax.open('POST', '/shop/cart/empty')
        
        ajax.setRequestHeader('content-type','application/x-www-form-urlencoded')
        
        ajax.onreadystatechange = function(){
                

  
        }
  
  
        ajax.send()
  
        document.getElementById('cartOnClick').innerHTML = `Carrinho vazio`

      }
      else {
        // alert("DOESN'T EXIST ID - Empty at Local Storage")

        window.localStorage.clear()

        // alert('LocalStorage is empty now')

        document.getElementById('cartOnClick').innerHTML = `Carrinho vazio`


      }



  }

  function cartShowAtServer(ajaxResponse){

    
    var totalPrice = 0


    cartOnClick = document.getElementById('cartOnClick')

    thisResponse = ajaxResponse


    if(!thisResponse){

      cartOnClick.innerHTML = `Carrinho vazio`
    }
    else{


      thisResponse = thisResponse.replace('[[', '').replace(']]', '')
      thisResponse = thisResponse.split('],[')
  
  
      for(var i = 0 ; i < thisResponse.length ; i++){
  
        var item = thisResponse[i].replace('"', '').replace('"', '').replace('"', '')
            item = item.split('////')
  
  
  
            var itemCode  = item[0]
            var itemQtd   = item[1]
            var itemPrice = item[2]
            var itemName  = item[3]
            var itemImage = item[4]
  
            let singleItem = document.createElement('p')
                singleItem.id = 'singleItem'
  
            let img = document.createElement("IMG");
                img.src           = `${itemImage}`
                img.style.width   = "60px";
                img.style.height  = "60px";
                img.id            = `itemCartImg`
                singleItem.appendChild(img);
  
  
            let newP = document.createElement(`p`)
                newP.id = `itemCartInfo`
            
            newP.innerHTML= `${itemName} | Qtd: ${itemQtd} X R$${itemPrice} | Preço: R$${(itemQtd * itemPrice).toFixed(2)}<br>`
  
            singleItem.appendChild(newP)
  
            cartOnClick.appendChild(singleItem)
  
  
  
            totalPrice = totalPrice + (itemQtd * itemPrice)
  
      } //END OF  FOR
  
  
      
      var newPTotalPrice = document.createElement(`p`)
          newPTotalPrice.id = `newPTotalPrice`
      newPTotalPrice.innerHTML = `<br>Preço total: R$${totalPrice.toFixed(2)}`
      cartOnClick.appendChild(newPTotalPrice)
  
    }




  }

  allCartProducts = []

  function showCart(){

    // var to keep all products



    document.getElementById('cartOnClick').innerHTML = ''
    
    var cookies = document.cookie.split(';');//contains all the cookies
    var cookieName = []; // to contain name of all the cookies

    for(let i=0;i<cookies.length;i++) {
      cookieName[i] = cookies[i].split('=')[0].trim();
    }


    if(cookieName.includes('userID')) {
      // alert("EXIST ID - Show at Server")
    
          var ajax = new XMLHttpRequest()
          
          ajax.open('POST', '/shop/cart/show', false)
          
          ajax.setRequestHeader('content-type','application/x-www-form-urlencoded')
          
          ajax.onreadystatechange = function(){
            
            return cartShowAtServer(ajax.response)

          }
    
    
          ajax.send()
        
        
        }
        
        
        else {
          // alert("DOESN'T EXIST ID - Show at LocalStorage")


          // The cart is already empty?
          if(JSON.stringify(window.localStorage) == '{}' || JSON.stringify(window.localStorage) == null || JSON.stringify(window.localStorage) == undefined ){

            document.getElementById('cartOnClick').innerHTML = `Carrinho vazio`

          }
          else{

            // alert('exist LS')

            var totalPrice = 0
            allLocal = JSON.stringify(window.localStorage)


            // AJAX
            var ajax = new XMLHttpRequest()
  
            var params = `allLocal=${allLocal}`
          
            ajax.open('POST', '/shop/cart/show', false)
  

            ajax.setRequestHeader('content-type','application/x-www-form-urlencoded')
  
            ajax.onreadystatechange = function(){

              return cartShowAtServer(ajax.response)

            }
  
  
            ajax.send(params)

          }

        }

  }

  // ================================

  function buyThisCart(){
    
    var userID = getCookie('userID')

    // if exists ID
    if(userID){

      if(!thisResponse){

        document.getElementById('cartOnClick').innerHTML = `Carrinho vazio.<br><br>Adicione algum ítem para prosseguir.`

      }
      else{
        alert('Indo para o checkout')

        var formCheckout = document.getElementById('formCheckout')
        formCheckout.action = `/user/${userID}/checkout`
        formCheckout.method = 'get'
        formCheckout.submit()

      }


      // var ajax = new XMLHttpRequest()
        
      //   // var params = `cart=${allCartProducts}`
                
      //   ajax.open('post', `/user/${userID}/checkout`, false)

      //   var params = `cart=${cart}`

      //   ajax.setRequestHeader('content-type','application/x-www-form-urlencoded')
        
      //   ajax.onreadystatechange = function(){
                
          
      //   }
        
        
      //   ajax.send(params)


        // redirect
        
    }
    else{
      if(JSON.stringify(window.localStorage) == '{}' || JSON.stringify(window.localStorage) == null || JSON.stringify(window.localStorage) == undefined ){

        document.getElementById('cartOnClick').innerHTML = `Carrinho vazio.<br><br>Adicione algum ítem para prosseguir.`

      }
  else{
      alert(`Você não está logado. Para seguir ao checkout, faça login.`)

        var formCheckout = document.getElementById('formCheckout')
        formCheckout.action = `/user/${userID}/checkout`
        formCheckout.method = 'get'
        formCheckout.submit()

      }

      
    }



    

  }

  function getCookie(cName) {
      const name = cName + "=";
      const cDecoded = decodeURIComponent(document.cookie); //to be careful
      const cArr = cDecoded.split('; ');
      let res;
      cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
      })
      return res
  }