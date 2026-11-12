# PCP Weslei
Sistema em HTML, CSS e JavaScript, com sincronização em nuvem via Firebase (Firestore).

## Executar
Abra dist/index.html no navegador. Para endereço estável local, execute na pasta dist: python -m http.server 8080 e acesse http://localhost:8080.

## Publicar atualizações no GitHub
Execute `npm run deploy` na raiz do projeto para enviar (git add + commit + push) as alterações para https://github.com/worldinovabr/pcpm. Um workflow do GitHub Actions publica automaticamente dist/ na branch `gh-pages` a cada push na branch principal.

Na primeira vez, é necessário um passo manual (restrição do próprio GitHub: só o dono do repositório pode ativar o Pages, não é possível via token automático): acesse Settings > Pages do repositório, em "Source" escolha "Deploy from a branch", selecione a branch `gh-pages` e a pasta `/ (root)`, depois salve. A partir daí, o site fica disponível em https://worldinovabr.github.io/pcpm/ e se atualiza sozinho a cada `npm run deploy`.

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
Dados sincronizados em tempo real pelo Firebase (Firestore, projeto pcpm-98551), com cópia local no navegador (localStorage) usada como cache offline. Não há autenticação de usuário: quem tiver a URL do app lê/grava o mesmo documento. Veja firestore.rules para as Regras de Segurança aplicadas no Firestore e recomendações de reforço (App Check, restrição de chave de API, autenticação). Backup JSON continua recomendado como proteção adicional e para transferir dados entre instalações. A planilha original não é alterada; alterações futuras no Excel não são importadas automaticamente.
Carga = saldo / produtividade + setup. Toda carga do item ocupa a data informada. Não calcula distribuição automática em múltiplos dias, estoque, consumo de componentes, MRP, dependências entre operações ou feriados. Divida lotes em itens separados para programação em vários dias. Montagem, dobras, subprodutos e componentes são campos descritivos.
As 8 horas iniciais por centro são uma configuração padrão editável, não um dado da planilha.

## Arquivos
- dist/index.html: estrutura
- dist/style.css: aparência responsiva e impressão
- dist/firebase-config.js: inicialização do Firebase/Firestore (chaves públicas do app web; segurança real nas Regras do Firestore)
- dist/app.js: regras, interações e sincronização com o Firestore
- dist/seed.js: carteira inicial
- source.json: registros originais extraídos das abas visíveis
- firestore.rules: Regras de Segurança do Firestore e instruções de aplicação
- package.json / deploy.js: comando `npm run deploy` para enviar atualizações ao GitHub
- check.cjs: verificação dos cálculos com Node.js (execute node check.cjs na raiz, ou npm test)
