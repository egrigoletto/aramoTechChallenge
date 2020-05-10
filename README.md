# aramoTechChallenge

Este reprositório contém uma prova feita para um processo seletivo, ele se baseia no seguinte quadro:

* Uma companhia telefônica vai criar uma página web onde uma pessoa vai escolher o DDD na qual está ligando, o DDD para qual fará a ligação, qual plano se deseja usar e a quantidade de minutos na qual será feita a ligação.
* Há duas modalidades de cobrança, a cobrança sem o plano e a cobrança com o plano
* Sem plano um valor fixo por minuto é aplicado a tarifa em questão pela quantidade de tempo da ligação
* Todos os planos tem uma franquia, a franquia em minutos onde até aquela minutagem, a tarifa é gratuita, passando desse valor a minutagem excedente é calculada com um acréscimo de 10% sobre a tarifa sem plano, apenas minutos excedentes são cobrados.

Para ser executado cálculo, foram criadas apis que recuperam os valors fixos de tarifas locais e o valor de minutos gratuitos que cada plano pode ter como benefício. Com esses valores como base os minutos adicionais, se aplicável, serão calculados com o acréscimo e são exibidos numa página HTML está estática .

## Como usar

Clone o repositório e execute o index.
