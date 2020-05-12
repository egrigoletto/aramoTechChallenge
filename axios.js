const calcBtn = document.getElementById('calcBtn');
let tarifaNormal = document.getElementById('val_tarifa_normal');
let tarifaPlano = document.getElementById('val_tarifa_plano');
let tarifaIndisp = document.getElementById('val_tarifa_inex');
let msgFim = document.getElementById('msg_fim');
let baseTarifaPlano = document.getElementById('base_tarifa_plano');
let baseTarifaNormal = document.getElementById('base_tarifa_normal');
let baseTarifaInex = document.getElementById('base_tarifa_inex');
let baseMagFim = document.getElementById('base_msg_fim');
let rstBtn = document.getElementById('rstBtn');
let tarifa = 0;
let valorLigacaoConvencional = 0;
let valorLigacaoFranquiada = 0;


const calcularTarifas = () => {
    let dddOrigem = Number(document.getElementById('dddOrigem').value);
    let dddDestino = Number(document.getElementById('dddDestino').value);
    let nomePlano = document.getElementById('tipoPlano').value;
    let minutosSolicitados = Number(document.getElementById('tempoLigacao').value);
    if (!minutosSolicitados || minutosSolicitados == 0 || minutosSolicitados == "") {
        minutosSolicitados.value = " ";
        alert("Não é possível fazer a consulta com o valor solicitado")
    } else {
        axios.defaults.baseURL = 'http://localhost';
        axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.get['Access-Control-Allow-Methods'] = '*';
        axios.defaults.headers.get['Access-Control-Allow-Headers'] = '*';
        axios.get('https://telecomaramo.glitch.me/tarifaLocal')
            .then(response => {
                let franquiaLocal = response.data.filter(item => item.origem == dddOrigem && item.destino == dddDestino)[0];
                if (franquiaLocal && franquiaLocal.origem && franquiaLocal.destino) {
                    axios.get('https://telecomaramo.glitch.me/planosFaleMais')
                        .then(response => {
                            let franquiaFalemais = response.data.filter(item => item.nome == nomePlano)[0];
                            valorLigacaoConvencional = franquiaLocal.valor * minutosSolicitados;
                            valorLigacaoFranquiada = 0;
                            for (i = 0; i < (minutosSolicitados - franquiaFalemais.minutosFranquia); i++) {
                                valorLigacaoFranquiada += franquiaLocal.valor + (franquiaLocal.valor * 0.1)
                            }
                            baseTarifaPlano.style.display = "block";
                            baseTarifaNormal.style.display = "block";
                            baseMagFim.style.display = "block";
                            rstBtn.style.display = "inline";
                            baseTarifaInex.style.display = "none";
                            tarifaNormal.innerText = "O valor de uma ligação sem o plano " + franquiaFalemais.nome + " é de " + valorLigacaoConvencional.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL'
                            });
                            tarifaPlano.innerText = "O valor de uma ligação com o plano " + franquiaFalemais.nome + " é de " + valorLigacaoFranquiada.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL'
                            });
                            msgFim.innerText = "Viu só com a Aramo Telecom você só tem a ganhar, se liga com a gente! 😉"
                        });
                } else {
                    baseTarifaInex.style.display = "block";
                    rstBtn.style.display = "inline";
                    baseTarifaPlano.style.display = "none";
                    baseTarifaNormal.style.display = "none";
                    baseMagFim.style.display = "none";
                    tarifaIndisp.innerText = "Esses DDDs de origem e destino não são atendidos pela Aramo Telecom nesse momento. 😔 \nMas não será por muito tempo! A Aramo Telecom está expandindo sua rede! 🤩\nFique Ligado!"
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

};

const limparValores = () => {
    let minutosSolicitados = document.getElementById("tempoLigacao");
    let dddOrigem = document.getElementById('dddOrigem');
    let dddDestino = document.getElementById('dddDestino');
    let nomePlano = document.getElementById('tipoPlano');

    dddOrigem.value = "11";
    dddDestino.value = "11";
    nomePlano.value = "FaleMais 30";
    minutosSolicitados.value = " ";
    baseTarifaInex.style.display = "none";
    rstBtn.style.display = "none";
    baseTarifaPlano.style.display = "none";
    baseTarifaNormal.style.display = "none";
    baseMagFim.style.display = "none";

};

rstBtn.addEventListener("click", limparValores);
calcBtn.addEventListener('click', calcularTarifas);