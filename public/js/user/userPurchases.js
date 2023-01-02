
function viewProduct(id){

    const userAtCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('userID='))
    ?.split('=')[1];


location.href = `/user/${userAtCookie}/pedidos/${id}`


}
