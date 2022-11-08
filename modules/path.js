const path = require('path')

//nome do arquivo atual
console.log(path.basename(__filename))

//nome do diretório atual
console.log('Este arquivo está no diretório: ' + path.dirname(__filename));

//nome da extensão do arquivo
console.log('Extensão: ' + path.extname(__filename));



//criar objeto path
console.log(path.parse(__filename))


//juntar caminhos de arquivos //não adiciona o arquivo ou pasta
console.log(path.join(__dirname, 'teste', 'teste.html'));




