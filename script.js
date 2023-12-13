function calcularTempoRestante() {
    var dataAtual = new Date();
    var dataInputUsuario = document.getElementById("dataInput").value;
    var dataInput = new Date(dataInputUsuario + "T00:00:00");

    if (isNaN(dataInput.getTime())) {
        alert("Formato de data inválido. Selecione uma data no calendário.");
        return;
    }

    var diff = Math.abs(dataInput - dataAtual);
    var diasRestantes = Math.floor(diff / (1000 * 60 * 60 * 24));
    var horasRestantes = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutosRestantes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var segundosRestantes = Math.floor((diff % (1000 * 60)) / 1000);

    var resultado = diasRestantes + " dias, " + horasRestantes + " horas, " + minutosRestantes + " minutos e " + segundosRestantes + " segundos restantes.";
    document.getElementById("resultado").innerHTML = "Tempo restante até " + dataInputUsuario + ": " + resultado;
}