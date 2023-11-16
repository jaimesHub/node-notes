# Node.js, Express, MongoDB & More: The Complete Bootcamp 2023
## Using Modules 1: Core Modules

## Using Modules 2: Our Own Modules

## Using Module 3: 3rd Party Modules
### How we include a third-party modules
- we will treat `slugify` module as `a dependency of our code` because without it, our code no longer works or now our code depends on having the `slugify` package installed in the project
- index.js
    ```
        const slugify = require("slugify);
        const slugName = slugify("Hello World", {
            lower: true,
        });
        console.log(slugName); // output: hello-world
    ```
- what is a slugify ?
- create an array of all the slugify

## Package versioning and Updating
- the version numbers of our packages
    - Most of them (on npm) follow the semantic version notation: 
    `major-verion`.`minor-version`.`patch-version`
    - patch-version: is only intented to fix bugs
    - minor-version: introduces some new features into the package, but it does not include breaking changes. All the changes that are done in a new version number will always be backward-compatible. For exmpale, if `nodemon` team release a new `minor-version`, there are some `new features` and there `will not` be any breaking changes your code.
    - major-verion: which is only bumped up whenever it is a huge new release which can have breaking changes.
- update packages
    - `^` comes in front of the version number is what specifies which updates we accept for each of the packages. It means npm specifies here by default means that we accept `patch` and `minor` releases.
    - how do we update packages ?
        + Check if there are any outdated packages: `npm outdated` -> a table of outdated packages
        + (Optional) Installing a package with a specificed version: `npm i slugify@1.0.0`
        + `npm install slugify`
    - `~` means this will then only accept `patch` releases
    - `^` means this accepts `minor` and `patch` releases
    - `*` means it will bump our version up to version 2 from 1 (update `major`)
- delete packages
    - npm i express
    - npm uninstall express
- node_modules
    - contains all the dependencies of our project
    - never share node_modules to Github, or Dropbox folder... because all modules will download from `package.json`
    - `package-lock.json`: this one makes sure if all our dependencies will be same version when this project is shared to others

## Setting up Prettier in VSCode
- DotENV
- ESLint
- Prettier - Code formatter
- Pug beautify
- TabNine
- .prettierrc