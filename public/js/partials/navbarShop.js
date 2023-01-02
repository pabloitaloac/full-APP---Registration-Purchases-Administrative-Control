
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


  function showCart(){

    // var to keep all products
    allCartProducts = []



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
            

                  // thisAjaxResponse = (ajax.response).replace('[[', '[').replace(']]', ']')
                  thisAjaxResponse = (ajax.response)
                  

                  thisAjaxResponse = thisAjaxResponse.split('///')


                  var cartOnClick = document.getElementById('cartOnClick')


                  if(ajax.response.length > 0){


                    thisAjaxResponse.forEach(item =>{

                          item = item.split(",")

                          itemCode =Number(item[0])
                          itemQtd = Number(item[1])


                          // see at server the single product price
                          var ajax = new XMLHttpRequest()
                                    
                                    var params = `itemCode=${itemCode}`
                                            
                                    ajax.open('POST', '/shop/cart/priceSingleProduct', false)
                                    

                                    ajax.setRequestHeader('content-type','application/x-www-form-urlencoded')
                                    
                                    ajax.onreadystatechange = function(){
                                            
                                      
                                      
                                      // var txtShowProduct = `Item: ${allCartProducts[i][0]} | Qtd: ${allCartProducts[i][1]} | Preço: ${ajax.response}<br>`

                                      // newP.innerHTML = `Item: ${allCartProducts[i][0]} | Qtd: ${allCartProducts[i][1]} | Preço: ${ajax.response}<br>`

                                      let thisResponse = (ajax.response).split('///')
                                      


                                      allCartProducts.push([itemCode , itemQtd , Number(thisResponse[0]) , thisResponse[1]])

                                      
                                    }
                                    
                                    
                                    ajax.send(params)
                                    // 







                          })


                  }
                  else{
                    cartOnClick.innerHTML = `Carrinho vazio`

                  }

                  


                  var totalPrice = 0

                    // Show each item
                    for(var i=0 ; i<allCartProducts.length ; i++){
            
                    let newP = document.createElement(`p${i}`)

            
                    
                    
                    
                    newP.innerHTML = `${allCartProducts[i][3]} | Qtd: ${allCartProducts[i][1]} X R$${allCartProducts[i][2].toFixed(2)} | Preço: R$${(allCartProducts[i][1] * allCartProducts[i][2]).toFixed(2)}<br>`

                      totalPrice = totalPrice + (allCartProducts[i][1] * allCartProducts[i][2])

                    document.getElementById('cartOnClick').appendChild(newP)


                    }
                    var newPTotalPrice = document.createElement(`p${totalPrice.toFixed(2)}`)
                    newPTotalPrice.innerHTML = `<br>Preço total: R$${totalPrice.toFixed(2)}`
                    document.getElementById('cartOnClick').appendChild(newPTotalPrice)




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




            var allLocal = JSON.stringify(window.localStorage)
            allLocal = allLocal.replace('{', '').replace('}', '')
            allLocal = allLocal.split(',')


            // VAR TO SHOW ALL PRODUCTS AT LS


                  // separe each item
                  allLocal.forEach(item => {
                      // separe/show each product with json
                      item  = item.replace('"', '').replace('":"',':').replace('"', '')
                      item = item.split(':')

                      itemCode =Number(item[0])
                      itemQtd = Number(item[1])



                      // see at server the single product price
                              var ajax = new XMLHttpRequest()
                              
                              var params = `itemCode=${itemCode}`
                                      
                              ajax.open('POST', '/shop/cart/priceSingleProduct', false)
                              

                              ajax.setRequestHeader('content-type','application/x-www-form-urlencoded')
                              
                              ajax.onreadystatechange = function(){
                                      
                                
                                
                                // var txtShowProduct = `Item: ${allCartProducts[i][0]} | Qtd: ${allCartProducts[i][1]} | Preço: ${ajax.response}<br>`

                                // newP.innerHTML = `Item: ${allCartProducts[i][0]} | Qtd: ${allCartProducts[i][1]} | Preço: ${ajax.response}<br>`

                                let thisResponse = (ajax.response).split('///')
                                


                                allCartProducts.push([itemCode , itemQtd , Number(thisResponse[0]) , thisResponse[1]])

                                
                              }
                              
                              
                              ajax.send(params)
                              // 
                              
                              
                              
                              

                    })  //end of forEach


                    var totalPrice = 0

                    // Show each item
                    for(var i=0 ; i<allCartProducts.length ; i++){
            
                      let newP = document.createElement(`p${i}`)

                      
                              
                              
                              
                              newP.innerHTML = `${allCartProducts[i][3]} | Qtd: ${allCartProducts[i][1]} X ${allCartProducts[i][2].toFixed(2)} | Preço: ${(allCartProducts[i][1] * allCartProducts[i][2]).toFixed(2)}<br>`

                              totalPrice = totalPrice + (allCartProducts[i][1] * allCartProducts[i][2])

                              document.getElementById('cartOnClick').appendChild(newP)


                    }

                    var newPTotalPrice = document.createElement(`p${totalPrice.toFixed(2)}`)
                    newPTotalPrice.innerHTML = `<br>Preço total: R$${totalPrice.toFixed(2)}`
                    document.getElementById('cartOnClick').appendChild(newPTotalPrice)

          }



        }


  }

  

  function buyThisCart(){

    var cart = JSON.stringify(allCartProducts)

    alert(JSON.stringify(allCartProducts))

    
    var userID = getCookie('userID')
    // alert(userID)

    // if exists ID
    if(userID){
      alert('com ID para checkout')
      alert(cart)

      var ajax = new XMLHttpRequest()
        
        // var params = `cart=${allCartProducts}`
                
        ajax.open('post', `/user/${userID}/checkout`, false)

        var params = `cart=${cart}`

        ajax.setRequestHeader('content-type','application/x-www-form-urlencoded')
        
        ajax.onreadystatechange = function(){
                
          
        }
        
        
        ajax.send(params)


        // redirect
        var formCheckout = document.getElementById('formCheckout')
        formCheckout.action = `/user/${userID}/checkout`
        formCheckout.method = 'get'
        formCheckout.submit()










    }
    else{

      alert('sem ID para checkout')
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