# Obsess Web Store Container

Modules Federation Container to orchestrate modules from Obsess' component library. 

<hr/>

## Framework References 

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/docs/en/v6/api)
- [React Bootstrap](https://react-bootstrap.github.io/components/alerts/)
- [React Redux](https://redux.js.org/api/api-reference)
- [Redux Thunk](https://redux-toolkit.js.org/api/configureStore)
- [Redux Localize](https://ryandrewjohnson.github.io/react-localize-redux-docs/#api-reference)
- [Webpack Configuration](https://webpack.js.org/api/)

<hr/>



## Developer setup

### Install npm packages
```shell
npm install
```

### Run 
```shell
npm start
```

### Code Quality

#### ESLint
[Eslint](https://www.npmjs.com/package/eslint) is configured for the project and uses airbnb style guide as base with additional rules for react.

##### To Run ESLint checks
```shell
npm run lint
```

##### To apply automatic ESLint fixes
```shell
npm run lint-fix
```


#### Prettier
[Prettier](https://www.npmjs.com/package/prettier) is configured as a standard formatter for the project.

##### To Run Prettier checks
```shell
npm run prettier
```

##### To automatically format using prettier
```shell
npm run format
```

You can of course configure your choice of IDE/Editors to use prettier to automatically format files using prettier config for the project. 
<p>**Make sure the editor does not apply any of it's own rules for formatting.**</p>


### Pre Commit Hooks
Pre commit hooks are setup using [husky](https://www.npmjs.com/package/husky). 
Please refer `.husky` directory for configs.
Pre commit hooks run
- `npm run lint` 
- `npm run prettier`


### Misc
To check the bundle sizes run `npm run analyze` to view source map for all the bundles emitted during a static build.

# _All the best!!!_
