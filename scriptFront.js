const sistemaClinica = {
    pacientes: [],
    agendamentos: [],

    carregarDados(dbUsuarios) {
      const usuarios = localStorage.getItem(dbUsuarios);
      return usuarios ? JSON.parse(dados) : null;
    },

    salvarDados(dbUsuarios, usuarios) {
      localStorage.setItem(dbUsuarios, JSON.stringify(usuarios));
    },

    cadastrarPaciente() {
      const nome = prompt("Digite o nome do paciente: ");
      const telefone = prompt("Digite o telefone do paciente: ");

      if (nome.trim() === "" || telefone.trim() === "") {
        alert("Insira um valor válido");
      } else {
        const pacienteExistente = this.pacientes.find(p => p.Telefone === telefone);
        if (pacienteExistente) {
          alert("Paciente já cadastrado!");
        } else {
          const novoPaciente = {Nome: nome, Telefone: telefone };
          this.pacientes.push(novoPaciente);
          this.salvarDados('pacientes', this.pacientes);
          alert("Paciente cadastrado com sucesso!");
        }
      }
        
      this.menuPrincipal();
    },

    listarPacientes() {
      this.pacientes.forEach((paciente, index) => {
        alert(`${index + 1}. ${paciente.Nome} - Telefone: ${paciente.Telefone}`);
      });
    },

    marcarConsulta() {
        if (this.pacientes.length > 0) {
          this.listarPacientes();
          const nPaciente = prompt("Escolha o número do paciente para agendar a consulta: ");
          const paciente = this.pacientes[parseInt(nPaciente) - 1];
  
          const dia = prompt("Digite o dia da consulta: ");
          const hora = prompt("Digite a hora da consulta: ");
          const especialidade = prompt("Digite a especialidade desejada: ");
  
          const consultaExistente = this.agendamentos.find(c => c.Dia === dia && c.Hora === hora);
          const dataAtual = new Date();
          const dataConsulta = new Date(`${dia} ${hora}`);
  
          if (consultaExistente) {
            alert("Horário já agendado. Escolha outro horário.");
          } else if (dataConsulta <= dataAtual) {
            alert("Não é possível agendar consultas para datas antigas.");
          } else {
            const agendamento = {
              Paciente: paciente.Nome,
              Dia: dia,
              Hora: hora,
              Especialidade: especialidade
            };
            this.agendamentos.push(agendamento);
            this.salvarDados('agendamentos', this.agendamentos);
            alert("Consulta agendada com sucesso!");
          }
        } else {
          alert("Nenhum paciente foi cadastrado ainda! Por favor, realize o cadastro no menu principal.");
        }

        this.menuPrincipal();
      },

    listarAgendamentos() {
      this.agendamentos.forEach((consulta, index) => {
        alert(`${index + 1}. ${consulta.Paciente} - Dia: ${consulta.Dia}, Hora: ${consulta.Hora}, Especialidade: ${consulta.Especialidade}`);
      });
    },

    cancelarConsulta() {
      this.listarAgendamentos();
      const escolha = prompt("Escolha o número da consulta para cancelar: ");
      const consulta = this.agendamentos[parseInt(escolha) - 1];

      if (consulta) {
        alert(`Consulta marcada para ${consulta.Dia}, ${consulta.Hora} - ${consulta.Especialidade}`);
        const confirmacao = prompt("Deseja cancelar esta consulta? (S/N): ");

        if (confirmacao.toUpperCase() === "S") {
          this.agendamentos.splice(parseInt(escolha) - 1, 1);
          this.salvarDados('agendamentos', this.agendamentos);
          alert("Consulta cancelada com sucesso!");
        }
      } else {
        alert("Consulta não encontrada. Operação cancelada.");
      }

      this.menuPrincipal();
    },

    menuPrincipal() {
      console.log("\n=== Menu Principal ===");
      console.log("1. Cadastrar Paciente");
      console.log("2. Marcar Consulta");
      console.log("3. Listar Agendamentos");
      console.log("4. Cancelar Consulta");
      console.log("5. Sair");

      const escolha = prompt("Escolha uma opção: ");

      switch (parseInt(escolha)) {
        case 1:
          this.cadastrarPaciente();
          break;
        case 2:
          this.marcarConsulta();
          break;
        case 3:
          this.listarAgendamentos();
          break;
        case 4:
          this.cancelarConsulta();
          break;
        case 5:
          alert("Encerrando o programa...");
          break;
        default:
          alert("Opção inválida. Tente novamente.");
          this.menuPrincipal();
          break;
      }
    }
};
  
sistemaClinica.menuPrincipal();