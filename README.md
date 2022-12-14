## From https://www.npmjs.com/package/eslint-config-airbnb

### installation

- npx create-react-app .
- npx install-peerdeps --dev eslint-config-airbnb
  **make ESLint and Prettier play nicely together**
- npm install --save-dev eslint-config-prettier eslint-plugin-prettier

### eslint config

**add "airbnb" to "extends" in eslintrc.json**
**to enable "airbnb/hooks" add to "extends" in eslintrc.json**
"extends": ["airbnb", "airbnb/hooks"] to your .eslintrc.

```
{
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": ["airbnb", "airbnb/hooks", "prettier"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "no-console": "off",
    "func-names": "off",
    "no-use-before-define": [
      "warn",
      {
        "functions": false,
        "classes": false,
        "variables": true,
        "allowNamedExports": true
      }
    ],
    "no-unused-vars": [
      "warn",
      { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
    ],
    "consistent-return": "off",
    "no-unused-expressions": [
      "warn",
      { "allowShortCircuit": true, "allowTernary": true }
    ],
    "no-return-assign": "off"
  }
}
```
