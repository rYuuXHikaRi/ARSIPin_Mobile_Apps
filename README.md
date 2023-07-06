# ARSIPin_Mobile_Apps

Note for Development :
- Node.js v18.15.0 [Download here](https://nodejs.org/dist/v18.15.0/node-v18.15.0-x64.msi)<br>
  Step uninstall previous Node version:
  - First, clear all npm cache using :
    ```
    npm cache clean -f
    ```

  - And then, install the Node.js that you have download before.
  
- Latest Expo GO App on Android
- Expo 48.0.18 SDK 

After clone this repo, you must run :
```
npx expo install
```

While developing this app, all node packages or expo packages must be install using command
```
npx expo install {name_package}
```

```/components/screens```   is directory for page that have different function (like: login,home, etc)
```/components/partials```   is directory for part of mobile have pages that have same function on every pages (like: navbar, header, etc)
```/components/middlerware```  is directory for middleware 

Rule of name :
- for '.js. file use this format ' homePage.js ' or ' sagas.js '
- for React Component use this format ' HomePage '  or ' App '