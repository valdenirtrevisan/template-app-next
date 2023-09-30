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
  plop.setGenerator('crud', {
    description: 'Cria um crud',
    prompts: [
      {
        type: 'input',
        name: 'nome',
        message: 'qual é o nome do CRUD?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/app/api/{{dashCase nome}}s/route.ts',
        templateFile: 'templates/CrudServer/api/Route.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/app/api/{{dashCase nome}}s/[id]/route.ts',
        templateFile: 'templates/CrudServer/api/id/Route.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/server/controller/{{camelCase nome}}.ts',
        templateFile: 'templates/CrudServer/controller/Controller.ts.hbs',
      },
      {
        type: 'modify',
        path: '../src/server/controller/index.ts',
        pattern: /(\/\/ IMPORT MODULE FILES)/g,
        template: "$1\nexport * from './{{camelCase nome}}';",
      },
      {
        type: 'add',
        path: '../src/server/repository/{{camelCase nome}}.ts',
        templateFile: 'templates/CrudServer/repository/Repository.ts.hbs',
      },
      {
        type: 'modify',
        path: '../src/server/repository/index.ts',
        pattern: /(\/\/ IMPORT MODULE FILES)/g,
        template: "$1\nexport * from './{{camelCase nome}}';",
      },
      {
        type: 'add',
        path: '../src/server/schemas/{{camelCase nome}}.ts',
        templateFile: 'templates/CrudServer/schema/Schema.ts.hbs',
      },
      {
        type: 'modify',
        path: '../src/server/schemas/index.ts',
        pattern: /(\/\/ IMPORT MODULE FILES)/g,
        template: "$1\nexport * from './{{camelCase nome}}';",
      },

      {
        type: 'add',
        path: '../src/server/types/{{camelCase nome}}.ts',
        templateFile: 'templates/CrudServer/types/Type.ts.hbs',
      },
      {
        type: 'modify',
        path: '../src/server/types/index.ts',
        pattern: /(\/\/ IMPORT MODULE FILES)/g,
        template: "$1\nexport * from './{{camelCase nome}}';",
      },
    ],
  });
};
