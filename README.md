# icutoolshub

Portal das sete aplicações clínicas do ecossistema ICU Tools.

## Desenvolvimento e validação

Node.js22.18 ou posterior. Instalar com `npm ci`, iniciar com `npm run dev`.

`npm test` executa os testes de regressão. `npm run build` cria a distribuição em `dist`. As verificações de qualidade e vulnerabilidades estão definidas em GitHub Actions.

## Conteúdo e limites

O catálogo central em `src/catalog.js` mantém os destinos e ícones. O teste de integridade não confirma o conteúdo publicado em cada destino.

As aplicações clínicas apoiam aprendizagem e raciocínio de profissionais. A aprovação técnica não constitui validação clínica independente. Nunca incluir dados identificáveis de doentes em exemplos, testes ou repositório.

## Publicação

Rever diferenças, executar verificações e confirmar a identidade da aplicação e percursos clínicos no destino publicado. A compilação bem-sucedida não comprova que o domínio mostra o projeto correto.

Não foi atribuída uma licença nova nesta revisão; os direitos e a política de reutilização devem ser definidos pelo titular.
