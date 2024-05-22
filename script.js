function consultaCEP(cep) {
    cep = cep.replace(/\D/g, '')
    if (cep !="") {
        const padraoCep = /^[0-9]{8}$/;
        if (padraoCep.test(cep)) {
            document.querySelector('#bairro').setAttribute('readonly','')
            document.querySelector('#cidade').setAttribute('readonly','')
            document.querySelector('#uf').setAttribute('readonly','')
            
            const requisicao = new Request(`https://viacep.com.br/ws/${cep}/json`,{
                "methodo":"GET",
                "headers": {
                    "Content-type": "application/json"
                }
            });
            
            fetch(requisicao)
            .then(resposta =>resposta.json())
            .then(resposta => {
                if (!(resposta.erro)) {
                    
                    document.querySelector('#logradouro').value = resposta.logradouro;
                    document.querySelector('#bairro').value = resposta.bairro;
                    document.querySelector('#cidade').value = resposta.localidade;
                    document.querySelector('#uf').value = resposta.uf;
                } else{
                    limpaform();
                    window.alert('CEP não localizado')
                    document.querySelector('#bairro').removeAttribute('readonly');
                    document.querySelector('#cidade').removeAttribute('readonly');
                    document.querySelector('#uf').removeAttribute('readonly');

                    document.querySelector('#logradouro').focus();
                }
                
            })
        }else{
            limpaform();
            window.alert('O formato do CEP é invalido')
        }
    } else{
        limpaform();
        window.alert('Digite um Cep!');
    }
}
function limpaform() {
    document.querySelectorAll('input:not(#cep)').forEach(input => {
        input.valve = ''
    });
    
}