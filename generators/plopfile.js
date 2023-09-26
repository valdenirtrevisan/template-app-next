// eslint-disable-next-line no-undef
module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Cria um componente',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'qual é o nome do componente?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/ui/components/{{pascalCase name}}.tsx',
        templateFile: 'templates/Component/Component.tsx.hbs',
      },
      {
        type: 'modify',
        path: '../src/ui/components/index.ts',
        pattern: /(\/\/ IMPORT MODULE FILES)/g,
        template: "$1\nexport * from './{{pascalCase name}}';",
      },
    ],
  });
};
