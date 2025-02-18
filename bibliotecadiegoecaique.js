class Biblioteca {
    constructor() {
        this.livros = [
            {
                titulo: "A revolução dos bichos",
                autor: "George Orwell",
                disponivel: true,
            }, {
                titulo: "Homem de giz",
                autor: "Caroline Tudor(C.j)",
                disponivel: true
            }, {
                titulo: "O principe",
                autor: "Maquiavel",
                disponivel: true
            }, {
                titulo: "Dracula",
                autor: "Bram stoker",
                disponivel: true
            }
        ];
        this.usuarios = [{
            nome: "Caique",
            email: "kaique@gmail",
            telefone: "40028922"
        }];

        this.emprestimos = [];
    }

    cadastrarLivro(titulo, autor) {
        this.livros.push({ titulo, autor, disponivel: true });
        console.log(`Livro "${titulo}" cadastrado com sucesso!`);
    }

    cadastrarUsuario(nome, email, telefone) {
        this.usuarios.push({ nome, email, telefone });
        console.log(`Usuário "${nome}" cadastrado com sucesso!`);
        alert("Seu cadastro na biblioteca Caicão foi um sucesso!");
    }

    retirarLivro(titulo) {
        let livro = this.livros.find(l => l.titulo === titulo && l.disponivel);
        if (!livro) {
            console.log("Livro indisponível para empréstimo.");
            return;
        }

        livro.disponivel = false;
        console.log("Obrigado por visitar a biblioteca Caicão! Seu empréstimo tem validade de 7 dias.");
    }

    devolverLivro(titulo) {
        let livro = this.livros.find(l => l.titulo === titulo && !l.disponivel);
        if (!livro) {
            console.log("Livro não encontrado ou já está disponível.");
            return;
        }

        livro.disponivel = true;
        console.log("Obrigado por devolver o livro para a biblioteca Caicão!");
    }

    exibirUsuarios() {
        console.log("Usuários cadastrados:\n" + this.usuarios.map(u => `${u.nome} - ${u.email} - ${u.telefone}`).join("\n"));
    }

    exibirLivros() {
        console.log("Livros cadastrados:\n" + this.livros.map(l => `${l.titulo} - ${l.autor} - ${l.disponivel ? "Disponível" : "Indisponível"}`).join("\n"));
    }

    exibirEmprestimos() {
        console.log("Emprestimos:\n" + this.emprestimos.map(e => `${e.usuario} - ${e.livro} - ${e.dataAtual} - ${e.dataDevolução} - ${e.status} - ${e.multa}`).join("\n"));
    }

    realizarEmprestimos(usuario, livro, dataDevolução, dataAtual) {
        for (let i = 0; i < this.usuarios.length; i++) {
            if (usuario == this.usuarios[i].nome) {
                for (let j = 0; j < this.livros.length; j++) {
                    if (livro == this.livros[j].titulo && this.livros[j].disponivel == true) {


                        let emprestimo = {
                            usuario: this.usuarios[i].nome,
                            livro: this.livros[j].titulo,
                            dataAtual: dataAtual.toLocaleDateString("pt-BR"),
                            dataDevolução: dataDevolução.toLocaleDateString("pt-BR"),
                            status: "Em andamento",
                            multa: 0
                        }

                        this.emprestimos.push(emprestimo)

                        this.livros[j].disponivel = false
                        console.log("Emprestimo realizado com sucesso!")
                    }
                }
            }
        }
    }

    realizarDevolvimento(usuario, livro, dataAtual) {
        for (let i = 0; i < this.emprestimos.length; i++) {
            if (usuario == this.emprestimos[i].usuario && livro == this.emprestimos[i].livro && this.emprestimos[i].status == "Em andamento") {
                for (let j = 0; j < this.livros.length; j++) {
                    if (livro == this.livros[j].titulo && this.livros[j].disponivel == false) {


                        let diferenca = dataAtual - this.emprestimos[i].dataDevolução
                        let diferençaEmDias = Math.ceil(diferenca / (1000 * 60 * 60 * 24)) // Teoricamente funciona

                        if (diferençaEmDias > 0) {

                            this.emprestimos[i].status = "Devolvido"
                            this.emprestimos[i].multa = diferençaEmDias


                        } else {
                            this.emprestimos[i].status = "Devolvido"
                        }


                        this.livros[j].disponivel = true
                        console.log("Devolvimento realizado");



                    }
                }
            }
        }
    }
}

const biblioteca = new Biblioteca();

while (true) {
    const nome = prompt("Digite seu nome (ou digite 'sair' para finalizar):");
    if (nome.toLowerCase() === 'sair') break;
    const email = prompt("Digite seu e-mail:");
    const telefone = Number(prompt("Digite seu telefone:"));
    if (typeof telefone == "number" && isNaN(telefone) != true) {
        biblioteca.cadastrarUsuario(nome, email, telefone);
    } else {
        console.log("numero invalido");

    }

}

while (true) {
    const opcao = prompt("Escolha uma opção:\n1 - Cadastrar livro\n2 - Retirar livro\n3 - Devolver livro\n4 - Exibir livros\n5 - Realizar empréstimo\n6 - Devolver livro\n7 - Exibir empréstimos\n8 - Sair");
    if (opcao === '8') break;

    if (opcao === '1') {
        const titulo = prompt("Digite o título do livro:");
        const autor = prompt("Digite o autor do livro:");
        biblioteca.cadastrarLivro(titulo, autor);
    } else if (opcao === '2') {
        const titulo = prompt("Digite o título do livro que deseja retirar:");
        biblioteca.retirarLivro(titulo);
    } else if (opcao === '3') {
        const titulo = prompt("Digite o título do livro que deseja devolver:");
        biblioteca.devolverLivro(titulo);
    } else if (opcao === '4') {
        biblioteca.exibirLivros();
    } else if (opcao === "5") {
        let arm = prompt("digite o nome do usuario: ")
        let Nl = prompt("nome do livro: ")

        let dataAtual = new Date()
        let datD = prompt("Digite a data de devolução (dd/mm/yyyy): ")
        let [dia, mes, ano] = datD.split("/");
        let novaDatD = new Date(`${ano}-${mes}-${dia}`);
        let diferença = novaDatD - dataAtual;
        let diferençaEmDias = Math.ceil(diferença / (1000 * 60 * 60 * 24))

        if (novaDatD > dataAtual && diferençaEmDias < 7) {
            biblioteca.realizarEmprestimos(arm, Nl, novaDatD, dataAtual)
        } else {
            console.log("Não pode não,man")
        }
    } else if (opcao == "6") {
        let arm = prompt("digite o nome do usuario: ")
        let Nl = prompt("nome do livro: ")

        let dataAtual = new Date()
        biblioteca.realizarDevolvimento(arm, Nl, dataAtual)
    }
    else if (opcao === "7") {
        biblioteca.exibirEmprestimos()
    } else {
        console.log("Opção inválida!");
    }

}