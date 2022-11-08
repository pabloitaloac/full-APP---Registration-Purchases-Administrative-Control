 const fs = require('fs')
 const path = require ('path')

 //criar pasta // usa o 'path' para localizar, e o 'mkdir' que adiciona o caminho ou arquivo
        //esse é um método assíncrono
                // fs.mkdir(path.join(__dirname, '/teste'), (erro)=>{
                //     if (erro){
                //         return console.log('Erro: '+ erro);
                //     }

                //     console.log('Pasta criada com sucesso!');
                // })

//criar arquivo (apenas o arquivo)
// fs.writeFile(path.join(__dirname, '/teste', 'teste.html'), 'Hello node', (erro)=>{
//     if(erro){
//         return console.log('Erro: ' + erro);}

//         console.log('Arquivo adicionado');
// })

            //Se rodar o writeFile no mesmo arquivo, ele sobscreve o anterior


//Adicionar a um arquivo específico
// fs.appendFile(path.join(__dirname, '/teste', 'teste.html'), 'Conteúdo a ser adicionado', (erro)=>{
//     if(erro){
//         return console.log('Erro: ' + erro);}
// })



//Ler arquivos (como 2º parâmetro, precisa passar o sistema de caracteres)
// fs.readFile(path.join(__dirname, 'teste', 'teste.html'), 'utf8', (erro, data)=>{
//     if(erro){
//         return console.log('Erro: ' + erro);}
    
//     console.log('O conteúdo é: ', data);
// })


//Se for add + ler, se coloca o apendFile dentro do callback
    //Porquê essas funções são assíncronas (Não vai na ordem necessariamente, a depender da demora)

    









