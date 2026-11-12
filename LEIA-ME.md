# PCP Weslei
Sistema em HTML, CSS e JavaScript, sem dependências externas.

## Executar
Abra dist/index.html no navegador. Para endereço estável local, execute na pasta dist: python -m http.server 8080 e acesse http://localhost:8080.

## Fluxo
1. Confira os 245 itens importados (A conferir).
2. Valide centro de produção e quantidades; cadastre novos pedidos.
3. Informe datas, sequência, produtividade em unidades/hora e setup por lote.
4. Ajuste a capacidade líquida diária por centro e consulte sobrecargas.
5. Registre peças boas, perdas, horas e operador. Peças boas reduzem o saldo. Ao atingir o previsto, o pedido é concluído.
6. Exporte relatórios e backup JSON diariamente.

## Premissas da importação
Apenas as 7 abas visíveis foram lidas. 343 registros com produto foram consolidados em 245 itens; somente registros com valores originais idênticos foram unidos, com origens preservadas. Linhas filtradas foram mantidas. O centro utiliza a primeira ocorrência consolidada e deve ser conferido, pois as abas contêm visões repetidas da carteira.
PEDIDO é o número; PEDIDO2 foi interpretado como quantidade do pedido; PREVISTO como quantidade planejada. Quantidade boa inicial é zero porque não há evidência de produção realizada. O status original é preservado nos dados de origem, e os itens iniciam A conferir. Datas seriais Excel foram convertidas no sistema 1900.

## Limites
Dados em localStorage, separados por navegador/endereço/dispositivo. Não há servidor de dados, colaboração simultânea ou sincronização. Backup JSON transfere os dados entre instalações. A planilha original não é alterada; alterações futuras no Excel não são importadas automaticamente.
Carga = saldo / produtividade + setup. Toda carga do item ocupa a data informada. Não calcula distribuição automática em múltiplos dias, estoque, consumo de componentes, MRP, dependências entre operações ou feriados. Divida lotes em itens separados para programação em vários dias. Montagem, dobras, subprodutos e componentes são campos descritivos.
As 8 horas iniciais por centro são uma configuração padrão editável, não um dado da planilha.

## Arquivos
- dist/index.html: estrutura
- dist/style.css: aparência responsiva e impressão
- dist/app.js: regras e interações
- dist/seed.js: carteira inicial
- source.json: registros originais extraídos das abas visíveis
- check.cjs: verificação dos cálculos com Node.js (execute node check.cjs na raiz)
