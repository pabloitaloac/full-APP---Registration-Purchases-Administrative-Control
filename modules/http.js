const http = require('http')




const port = 8080



const server = http.createServer((req, res)=>{
    if(req.url == '/home'){     //define ação para cada url
        res.writeHead(200, {'Content-type': 'text/html'} )     //Sucess é '200', erro'400' ou '500' + Tipo de conteúdo que irá renderizar
        res.end('<h1>HOME PAGE</h1>')
    }
    if(req.url == '/users'){
        //Nesse teste, passamos alguns dados por JSON para o navegador
            //Aqui estamos "forçando" os dados, mas geralmente se pega de um DB
        const users = [
            {
                name: 'user01',
                email: '01@tst.com'
            },
            {
                name: 'user02',
                email: '02@tst.com'
            }
        ]
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(JSON.stringify(users))     //transforma objeto em JSON
    
    }
})


server.listen(port, ()=>{ 
    console.log(`Server ON.!
        Rodando na porta ${port}`);
})