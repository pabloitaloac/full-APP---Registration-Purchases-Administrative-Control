
function create(productCode, productName, productQtd, productCost, productNormalPrice, productSpecialPrice){

    var code = productCode.value
    var name = productName.value
    var qtd = productQtd.value
    var cost = productCost.value
    var price = productNormalPrice.value
    var offer = productSpecialPrice.value
    
        if(name.length==0 || code.length==0 || qtd.length==0 || cost.length==0 || price.length==0 || offer.length==0){

            alert('Favor preencher todos os dados')

        }

        else{
            //SUBMIT

            document.getElementById('newProduct').submit()

            // alert(`TUDO OK! - Nome: ${name}, Código: ${code}, Qtd: ${qtd}, Custo: ${cost}, Preço: ${price}, Afiliado: ${offer} `)
        }

}
