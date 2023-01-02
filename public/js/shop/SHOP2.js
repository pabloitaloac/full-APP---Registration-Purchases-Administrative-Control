
// function tstAjax(valor1, valor2){
  
//   event.preventDefault()  //avoid change page

//   var valor1 = Number(valor1.value)
//   var valor2 = Number(valor2.value)

//   var ajax = new XMLHttpRequest()

//       ajax.open('POST', '/shop/ajax')
//         var params = `valor1=${valor1}&&valor2=${valor2}`

//       ajax.setRequestHeader('content-type','application/x-www-form-urlencoded')

//       ajax.onreadystatechange = function(){
//         document.getElementById('changeByAjax').innerHTML = ajax.responseText
//       }
      
//       ajax.send(params)



// }


function addToCart(id, qtdProduct){

    var itemCode = Number(id)
    var itemQtd = Number(qtdProduct)
    
    
    
    
    
    var cookies = document.cookie.split(';');//contains all the cookies
    var cookieName = []; // to contain name of all the cookies
    
    for(let i=0;i<cookies.length;i++) {
      cookieName[i] = cookies[i].split('=')[0].trim();
    }
    
    
    if(cookieName.includes('userID')) {
      // alert("EXIST ID")
    
          // SENDIND WITH AJAX  ===============
    
          var ajax = new XMLHttpRequest()
    
          ajax.open('POST', '/shop/cart/addProduct')
            var params = `itemCode=${itemCode}&&itemQtd=${itemQtd}`
    
          ajax.setRequestHeader('content-type','application/x-www-form-urlencoded')
    
          ajax.onreadystatechange = function(){
            
              var cartResponse = ajax.responseText
              
              // alert(`Produto adicionado ao carrinho!`)
            
          }
    
    
          ajax.send(params)
    }
    
    
    
    else {
      // alert("DOESN'T EXIST ID")
    
    
    
      // Item don't exists yet
      if(!window.localStorage.getItem(itemCode)){    
        // Add item to LocalStorage
          window.localStorage.setItem(itemCode,itemQtd)
    
          // alert('Item adicionado')
    
      }
      else{
        // know the quantity of this existent item
        var thisItemQtd = Number(window.localStorage.getItem(itemCode))
            thisItemQtd = thisItemQtd + itemQtd
        
        // update item to LocalStorage with currently quantity
        window.localStorage.setItem(itemCode,thisItemQtd)
      }
    
      // Show all products with json
      var allLocal = JSON.stringify(window.localStorage)
        allLocal = allLocal.replace('{', '').replace('}', '')
        allLocal = allLocal.split(',')
    
    
              // separe each item
              allLocal.forEach(item => {
                  // separe/show each product with json
                  item  = item.replace('"', '').replace('":"',':').replace('"', '')
                  item = item.split(':')
    
                  itemCode =Number(item[0])
                  itemQtd = Number(item[1])
    
                // alert(`itemCode: ${itemCode} | itemQtd: ${itemQtd}`)
    
              })
    
      // alert('Item atualizado')
    
    }
    
    
    
    
    }
    
    
    
    //             // SENDIND WITH AJAX  ===============
    
    //             var ajax = new XMLHttpRequest()
    
    //             ajax.open('POST', '/shop/cart')
    //               var params = `itemCode=${itemCode}&&itemQtd=${itemQtd}`
    
    //             ajax.setRequestHeader('content-type','application/x-www-form-urlencoded')
    
    //             ajax.onreadystatechange = function(){
    //               var newItem = document.createElement('p')
    //               var cartToChange =  document.getElementById('cartToChange')
    //                   cartToChange.appendChild(newItem)
    
    //               newItem.innerHTML = ajax.responseText
    //             }
    
    
    //             ajax.send(params)
    
    
    
    // });
    
    
    
    
    
      
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // var allProducts = [] 
    
    //   var cookie = {};
      
    //   document.cookie.split(';').forEach(function(el) {
    //     var [k,v] = el.split('=');
    //     cookie[k.trim()] = v;
    //   })
      
      
    //   var CART = cookie['CART'].replace('[[', '[').replace(']]', ']').replace('],[' , ',')
    
    //   CART = CART.split(',')
      
    //   CART.push('[1]')
    //   CART.push('[2]')
    //   CART.push('[3]')
    //   CART.push('[4]')
    //   CART.push('[5]')
      
    // alert(CART)
    
    // for(let i = 0 ; i < 10 ; i++){
    //   alert(CART [i])
    
    // }
    
    //   alert(typeof CART)
    
      
    
          
    
    //   // DO NOT TOUCH ON RETURNs!!!!!!!!!
    // function addToCart(cookieCART, productCode, productQtd) {
    //   // document.cookie = `CART=`
    
    // // CREATE ARRAY WITH SINGLE PRODUCTS + QTD
    
    //   // IF IS A NEW PAGE, FORCE THE FIRST PUSH
    //   if(allProducts.length == 0){
    //     allProducts.push([parseInt(productCode),parseInt(productQtd)])
    //     alert(allProducts.length)
    //     alert(JSON.stringify(allProducts))
    
    //     document.cookie = `CART=${JSON.stringify(allProducts)}; expires=Mon, 01 Jan 2024 00:00:00 UTC`
    //     // document.cookie = `CART=${JSON.parse(allProducts)}; expires=Mon, 01 Jan 2024 00:00:00 UTC`
    
    //     return 
    
    //   }
    //   else{
    
    //     // TO VERIFY IF EXISTS THE PRODUCT ON PAGE
    //       for( var i = 0 ; i < allProducts.length; i++){
    //         alert(`FOR [${i}] [0]`)
    
    //         // PRODUCT IS AWREADY FINDED AT ARRAY
    //         if(productCode == allProducts[i][0]){
    //           allProducts[i][1] = parseInt(allProducts[i][1]) + parseInt(productQtd)
    //           allProducts[i][0] = parseInt(allProducts[i][0])
    
    //           alert(`A [${i}] [0]`)
              
    //           alert(`MATCH - productCode: ${allProducts[i][0]}, productQtd: ${allProducts[i][1]}  `)
    //           alert(allProducts.length)     
    //           alert(JSON.stringify(allProducts))
    
    //           document.cookie = `CART=${JSON.stringify(allProducts)}; expires=Mon, 01 Jan 2024 00:00:00 UTC`
    //           // document.cookie = `CART=${JSON.parse(allProducts)}; expires=Mon, 01 Jan 2024 00:00:00 UTC`
    
    //           return 
    
            
                      
    //           }
    //       }
    //   }
    
    //   // IF NOT EXIST, (!= OF THE LAST ONE) AND IS THE END OF THE LIST, CREATE NEW PRODUCT
    //       if (productCode != allProducts[allProducts.length - 1][0]){
    //                   alert(`B [${i}] [0]`)
    
    //                   allProducts.push([parseInt(productCode),parseInt(productQtd)])
    //                   alert(allProducts.length)
    //                   alert(JSON.stringify(allProducts))
    
    //                   document.cookie = `CART=${JSON.stringify(allProducts)}; expires=Mon, 01 Jan 2024 00:00:00 UTC`
    
    //                   // document.cookie = `CART=${JSON.parse(allProducts)}; expires=Mon, 01 Jan 2024 00:00:00 UTC`
    
    //                   return 
    //       }
    
    
    
    
    // // PASS THE CONDICTIONS TO COOKIE
    // // document.cookie = `CART=${allProducts}`
    
    // }
    
    
    
    
    
    
    
    
    
    
    
    // function addToCart(cookieCART, productCode, productQtd) {
    
      
      
    //   var cookie = {};
      
    //   document.cookie.split(';').forEach(function(el) {
    //     var [k,v] = el.split('=');
    //     cookie[k.trim()] = v;
    //   })
      
    //   // return cookie['CART'];
      
    //   var CART = cookie[cookieCART]
      
    //   var a = productCode
    //   var b = productQtd.value
    //   // var date = new Date
      
    //   document.cookie = `CART=${CART}+${a}/${b}`
    //   // document.cookie = `CART=`
    
      
    //   var anyCLICK = CART.split('+')
          
    //       for(var i = 0; i < anyCLICK.length; i++){
            
    //         var anyProduct = anyCLICK[i].split('/')
      
    
    //         // allProducts.push(anyProduct[0])
    
    //         //       for(var t = 0  ; t < allProducts.length ; t++){
    
    //         //         if(anyProduct[0] == allProducts[t]){
    
    //         //           alert(`OK - anyProduct[0]: ${anyProduct[0]} - allProducts[t]: ${allProducts[t]}   `)
    //         //         }
    
    
    //         //       }
    
    
    
    //       }
    
    //         // alert(allProducts)
    
    //         // alert(`allProducts: ${allProducts} ; anyCLICK: ${anyCLICK}`)
    //         alert(allProducts)
    
    
    // }
    
    
    
    
    
    // function addToCart(thisProduct, qtdProduct){
    
    //     var q = qtdProduct.value
    
    //       var n = thisProduct
    //       var im = document.getElementById(thisProduct+'-image')
    //       var s = document.getElementById(thisProduct+'-situation').textContent
    
    
    //       var c = ((document.getElementById(thisProduct+'-cost').textContent)*q).toFixed(2)
    //           var cToNumber = parseFloat(c)
    
    //       var p = ((document.getElementById(thisProduct+'-promo').textContent)*q).toFixed(2)
    //         if((document.getElementById(thisProduct+'-promo').textContent).length<=0){
    //           var p = null
    //         }
    //         else{
    //           var c = p
    //           var isPromo = true
    
    //           var cToNumber = parseFloat(c)
    //         }
    
    //         //calculing - var sum == total
    //         totalCart.push(cToNumber)
            
    //                 var sum = 0.00;
    
    //                 for(var i =0;i<totalCart.length;i++){
    //                   sum+=totalCart[i];
    //                 }
    
    //         qtdCart.push(parseFloat(q))
    
    //                 var qtdSum = 0
    
    //                 for(var i = 0 ; i<qtdCart.length ; i++){
    //                   qtdSum+=qtdCart[i]
    //                 }
                    
    
    
    //       //adding to cart
    
            
          
    //         var createPImage = document.createElement("a")
    //                   createPImage.className = 'infoCart'
    //         var createPNome = document.createElement("a")
    //                   createPNome.className = 'infoCart'
    
    //         var createPCost = document.createElement("a")
    //                   createPCost.className = 'infoCart'
    
    //                 if(isPromo == true){
    //                   var createInfoPromo = document.createElement("a")
    //                             createInfoPromo.className = 'infoCartPromo'
    
    //                   createInfoPromo.innerHTML = `CLUBE!   &nbsp&nbsp&nbsp`
    //                 }
                    
    
    
    //         createPNome.innerHTML = `| ${q} X ${n} = `
    //         createPCost.innerHTML = `R$${c}<br>`
    //         document.getElementById('totalToChange').innerHTML = `Itens: ${qtdSum} | TOTAL: R$${sum.toFixed(2)}`
            
    //         if(isPromo == true){
    //           document.getElementById('cartToChange').append(createInfoPromo)  
    //         }
            
    //         document.getElementById('cartToChange').append(createPNome)        
    //         document.getElementById('cartToChange').append(createPCost)
            
    
    //         //att total (02 decimals)
          
    // }
    