module.exports = { 'content/dependencies.json': '{\n  "npm":{\n    "dependencies": {\n      "bulk-require": "^0.2.1",\n      "bulkify": "^1.0.2",\n      "deamdify": "^0.1.1",\n      "debowerify": "^1.2.0"\n    },\n    "devDependencies": {\n      "jasmine-core": "^2.1.3",\n      "karma-browserify": "^1.0.0",\n      "karma-chrome-launcher": "^0.1.7",\n      "karma-jasmine": "^0.3.2"\n    }\n  },\n  "bower":{\n    "dependencies": {\n      "angular-deferred-bootstrap": "~0.1.5",\n      "angular-mocks": "~1.3.5",\n      "angular": "~1.3.5"\n    },\n    "optional":{\n      "angular-route": "~1.3.6",\n      "angular-ui-router": "~0.2.13"\n    }\n  }\n}\n',
  'content/prompts.json': '[\n  {\n    "type": "input",\n    "name": "app_name",\n    "default": "angularApp",\n    "message": "Enter your angular app name"\n  },\n  {\n    "type": "list",\n    "name": "coding_style",\n    "message": "Select your language preference",\n    "choices": [\n      "CoffeeScript",\n      "Javascript"\n    ],\n    "default": "Javascript"\n  },\n  {\n    "type": "list",\n    "name": "dependencies",\n    "message": "Select list of dependencies you want to install",\n    "choices": "{{optionals}}",\n    "default": "angular-route"\n  }\n]\n',
  'content/structure.json': '{\n  "directories":[\n    "app/controllers",\n    "app/templates",\n    "app/hooks",\n    "app/validations",\n    "app/initializers",\n    "app/store",\n    "app/factories",\n    "app/directives",\n    "app/filters",\n    "app/assets",\n    "app/styles",\n    "dist",\n    "core",\n    "tests"\n  ],\n  "files":{\n    "app/constants.{{ext}}": "content/snippets/{{constants}}",\n    "app/routes.{{ext}}": "content/snippets/{{router}}",\n    "app/styles/app.css": "content/snippets/{{indexCss}}",\n    "app/app.{{ext}}": "content/snippets/{{appJs}}",\n    "ngconfig.json": "content/snippets/{{config}}",\n    "core/boot.{{ext}}": "content/snippets/{{boot}}",\n    ".editorconfig": "content/snippets/{{editorconfig}}",\n    ".gitignore": "content/snippets/{{gitignore}}",\n    "app/hooks/index.{{ext}}": "content/snippets/{{hooksIndex}}",\n    "app/controllers/welcomeCtrl.{{ext}}": "content/snippets/{{welcomeCtrl}}",\n    "app/hooks/config.{{ext}}": "content/snippets/{{hooksConfig}}",\n    "app/hooks/run.{{ext}}": "content/snippets/{{hooksRun}}",\n    "index.html": "content/snippets/{{indexFile}}",\n    "app/templates/welcome.html": "content/snippets/{{welcomeFile}}"\n  },\n  "snippets":{\n      "constants": "constantsCoffee",\n      "router" : "routerCoffee",\n      "appJs": "appCoffee",\n      "welcomeCtrl": "welcomeCtrlCoffee",\n      "config": "config",\n      "boot": "bootCoffee",\n      "editorconfig": "editorconfig",\n      "gitignore": "gitignore",\n      "hooksIndex": "hooksIndexCoffee",\n      "hooksConfig": "",\n      "hooksRun": "hooksRunCoffee",\n      "indexFile": "indexFile",\n      "indexCss": "indexCss",\n      "welcomeFile" : "welcomeFile"\n  },\n  "resolves":{\n    "angular-route": ["ngRoute"],\n    "angular-ui-router": ["ui.router"]\n  }\n}\n',
  'content/snippets/appCoffee': '###\n  Extends boot.js file inside core directory and initiates angular app\n  --------------------------------------------------------------------\n                            NOTICE\n  --------------------------------------------------------------------\n  To keep this file clean make sure you do not write any code inside\n  it , and use it your imports only\n###\n\nboot = require \'../core/boot\'\nboot()\n\n###\n  # Uncomment when you create validations\n  require(\'./validations\')\n###\n\n###\n  # Uncomment when you create filters\n  require(\'./filters\')\n###\n\n###\n  # Uncomment when you create factory\n  require(\'./factories\')\n###\n\n###\n  # Uncomment when you write services\n  require(\'./store\')\n###\n\n###\n  # Uncomment when you create directives\n  require(\'./directives\')\n###\n\nrequire(\'./templates\')\nrequire(\'./controllers\')\n',
  'content/snippets/bootCoffee': 'initAngularApp = (hash, dependencies) ->\n  angular.element(document).ready ->\n    deferredBootstrapper.bootstrap\n      element: document.body\n      module: "<%= app_name %>"\n      injectorModules: dependencies\n      resolve: hash\n\n    require "../app/hooks"\n    return\n\n  return\n\nrequire "angular"\nrequire "{{router}}"\nrequire "angular-deferred-bootstrap"\nbulk = require("bulk-require")\ninitializers = bulk(__dirname, ["../app/initializers/*.js"])\nboot = (dependencies) ->\n  app = undefined\n  deps = undefined\n  deps = ["{{modules}}"]\n  deps = deps.concat(dependencies)  if typeof dependencies is "object"\n  app = angular.module("<%= app_name %>", deps)\n  mapHash = {}\n  injectorDependencies = ["<%= app_name %>"]\n  if Object.keys(initializers).length > 0 and typeof (initializers[".."]) isnt "undefined" and typeof (initializers[".."]["app"]) isnt "undefined"\n    resolvesList = initializers[".."]["app"].initializers\n    objectKeys = Object.keys(resolvesList)\n    x = 0\n\n    while x < objectKeys.length\n      identifier = objectKeys[x]\n      name = resolvesList[identifier].provider\n      mapHash[name] = resolvesList[identifier].resolve\n      injectorDependencies = injectorDependencies.concat(resolvesList[identifier].dependencies)  if typeof (resolvesList[identifier].dependencies) isnt "undefined"\n      x++\n  initAngularApp mapHash, injectorDependencies\n  return\n\nmodule.exports = boot\n',
  'content/snippets/config': '{\n  "preffered_coding_style": "{{preferred_coding_style}}",\n  "css_preprocessor": "css",\n  "app_name": "angularApp",\n  "uglify_js": true,\n  "prefix_css": true,\n  "minify_css": true,\n  "port": 3080,\n  "liveReload": true,\n  "runServer": true,\n  "host": "127.0.0.1"\n}\n',
  'content/snippets/constantsCoffee': '###\n  Constants for your angular app, There are available globally\n  This file only contains constants not variables , so they cannot be changed\n\n    @example\n    baseUrl: \'http://www.address.com\'\n\n    $http.get({{LET.baseUrl}}).success(function(){\n\n    });\n\n    will produce\n\n    $http.get(\'http://www.address.com\').success(function(){\n\n    });\n\n    using multiple constants together\n\n    userPath: \'users\'\n\n    $http.get({{LET.baseUrl}}/{{LET.userPath}}).success(function(){\n    });\n\n    will produce\n\n    $http.get(\'http://www.address.com/user\').success(function(){\n\n    });\n###\n\nCONSTANTS = {}\nmodule.exports = CONSTANTS\n',
  'content/snippets/editorconfig': '',
  'content/snippets/gitignore': '',
  'content/snippets/hooksConfigCoffee': 'routeMap = require \'../routes.js\'\n\n### @ngInject###\nmodule.exports = ($routeProvider, $locationProvider) ->\n  angular.forEach routeMap, (route) ->\n    unless typeof (route.otherwise) is "undefined"\n      $routeProvider.otherwise redirectTo: route.otherwise\n    else\n      url = route.url\n      delete route.url\n      $routeProvider.when url, route\n    return\n  return\n',
  'content/snippets/hooksIndexCoffee': 'app = angular.module "<%= app_name %>"\n\napp.config require(\'./config\')\napp.run require(\'./run\')\n',
  'content/snippets/hooksRunCoffee': '### @ngInject###\nmodule.exports = ($rootScope) ->\n  return\n',
  'content/snippets/hooksUiConfigCoffee': 'routeMap = require \'../routes.js\'\n\n### @ngInject###\nmodule.exports = ($stateProvider, $urlRouterProvider) ->\n  angular.forEach routeMap, (route) ->\n    $urlRouterProvider.otherwise route.otherwise  unless typeof (route.otherwise) is "undefined"\n    state = route.url\n    if route.state\n      state = route.state\n      delete route.state\n    $stateProvider.state state, route\n    return\n  return\n',
  'content/snippets/indexCss': '*{\n  margin: 0;\n  padding: 0;\n}\nbody{\n  background: #f0f0f0;\n  font-family: "arial";\n}\n#intro{\n  background: #fff;\n  width: 500px;\n  padding: 40px;\n  margin: 100px auto 0px auto;\n  text-align:center;\n}\n#intro p{\n  font-size: 30px;\n  margin-bottom: 30px;\n}\ntable{\n  width: 100%;\n  border-collapse: collapse;\n}\ntable th,table td{\n  padding: 5px;\n  text-align:left;\n  border: 1px solid #e8e8e8;\n}\n',
  'content/snippets/indexFile': '<!DOCTYPE html>\n<html class="no-js">\n<head>\n  <meta charset="utf-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">\n  <title></title>\n  <meta name="description" content="">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <link rel="stylesheet" href="dist/app.css">\n\n  <!--[if lt IE 9]>\n  <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>\n  <script>window.html5 || document.write(\'<script src="js/vendor/html5shiv.js"><\\/script>\')</script>\n  <![endif]-->\n</head>\n<body>\n  <div ng-view>\n  </div>\n  <script src="dist/app.js"></script>\n</body>\n</html>\n',
  'content/snippets/routerCoffee': '###\n  ----------------------------------------------------------------------\n                            ROUTES\n  ----------------------------------------------------------------------\n  1. Define your routes here.\n  2. If your app does not have routes , simple export an empty object\n      @example\n        module.exports = {}\n###\n\nrouteMap = [\n  {\n    url: \'/\',\n    templateUrl: "welcome.html",\n    controller: \'welcomeCtrl\'\n  }\n]\nmodule.exports = routeMap\n',
  'content/snippets/welcomeCtrlCoffee': '### @ngInject###\n\nmodule.exports = ($scope) ->\n $scope.greeting = \'Hello world! This is ngCLI Boilerplate.\'\n',
  'content/snippets/welcomeFile': '<div id="intro">\n  <p>{{greeting}}</p>\n  <table>\n    <thead>\n      <tr>\n        <th>\n           Route\n        </th>\n        <th>\n          Controller\n        </th>\n        <th>\n          Template\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n        <tr>\n          <td>\n            /\n          </td>\n          <td>\n            welcomeCtrl\n          </td>\n          <td>\n            welcome.html\n          </td>\n        </tr>\n    </tbody>\n  </table>\n</div>\n' }