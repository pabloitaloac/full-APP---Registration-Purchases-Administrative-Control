
function filterProduct(filter){
  
  
    var nameFilter = filter.value
  
    if(nameFilter.length>0){
      document.getElementById('filterForm').submit()
    }
    else{
      alert(`Digite algum filtro!`)
    }
  
  
  
  }
  
  
      function editSingleProduct(id){
  
        // To change space in '-', to bettar url view
          location.href = `/adm/estoque/produto/${id}`
  
  
      }