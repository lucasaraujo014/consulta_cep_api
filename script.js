function consultaCEP(cep) {
    cep = cep.replace(/\D/g, '')
    
    const requisicao = new Request(`https://viacep.com.br/ws/${cep}/json`,{
        "methodo":"GET",
        "headers": {
            "Content-type": "application/json"
        }
    });
    
    fetch(requisicao)
    .then(resposta =>resposta.json())
    .then(resposta => {
        document.querySelector('#logradouro').value = resposta.logradouro;
        document.querySelector('#bairro').value = resposta.bairro;
        document.querySelector('#cidade').value = resposta.localidade;
        document.querySelector('#uf').value = resposta.uf;
        
    })
}