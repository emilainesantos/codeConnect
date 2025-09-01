const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) =>{
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover =  evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
})

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript" ];

async function verificarTagsDisponiveis(tagTexto) {
    return new Promise ((resolve) =>{
        setTimeout(()=>{
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
        
    })
    
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter"){
        evento.preventDefault();
        const tagTexto = inputTags.value.trim(); 
        if (tagTexto !== "") {
            try{
                const tagExiste = await verificarTagsDisponiveis(tagTexto)
                if (tagExiste) {
                    const newtag = document.createElement("li");
                    newtag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(newtag);
                    inputTags.value = "";
                } else {
                    alert ("Tag não foi encontrada.");

                }
              } catch (error) {
                console.error("Erro ao verificar a existencia da tag");
                alert ("Erro ao verificar a existência da tag. Verifique o console.")
            }
        }
    }
})