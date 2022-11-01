const excluirProduto = (idProduto) => {    
    $.ajax({
        method: "DELETE",
        url: `http://localhost:9000/cadastro/produtos/${idProduto}`,
        cache: false,
        complete: () => {
            location.reload()
        }
    }) 
}

jQuery(function(){

    $('#btnCadastrar').on('click', (e) =>{
        $('#formCadastro').validate({
            rules:{
                id:{
                    required: true
                },
                nome:{
                    required: true,
                },
                descricao:{
                    required: true,
                },
                valor:{
                    required: true
                },
                imagem:{
                    required: true
                }
            },
            messages:{
                id:{
                    required: "Digite um id"
                },
                nome:{
                    required: "Digite o nome do produto",
                },
                descricao:{
                    required: "Escreva uma descrição para o produto",
                },
                valor:{
                    required: "Digite qual é o valor do produto"
                },
                imagem:{
                    required: "Adicione a imagem do produto"
                }
            },
            submitHandler: () => {
                $.ajax({
                    method: "POST",
                    url: "http://localhost:9000/cadastro/produtos",
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json' 
                    },
                    cache: false,
                    dataType: "json",
                    data: JSON.stringify({
                        nome: $('#nome').val(),
                        descricao: $('#descricao').val(),
                        valor: $('#valor').val(),
                        imagem: $('#imagem').val()
                    }),
                    complete: function(result){
                        location.reload()
                        console.log(result)
                    }
                })
            }
        })
    })
    
    $.get("http://localhost:9000/cadastro/produtos", function( data ) {
        var dados = data

        for(i = 0; i <= dados.length; i++){

            var tabelaProdutos = `
            <tr>
            <td class="w-25">${dados[i].id}</td>
            <td>${dados[i].nome}</td>
            <td>${dados[i].descricao}</td>
            <td>${dados[i].valor}</td>
            <td ></td>
            <td>
                <a href="#" id="${[i]}" class="btn btn-danger btn-sm" onclick="excluirProduto(${dados[i].id})">
                    <i class="fa fa-times"></i>
                </a>
            </td>
            </tr>
        `
        $('tbody').append(tabelaProdutos)
        }
        
    })
})