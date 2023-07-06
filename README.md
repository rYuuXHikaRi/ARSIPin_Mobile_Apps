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
npm install
```

While developing this app, all node packages or expo packages must be install using command
```
npx expo install {name_package}
```

```/assets/``` is directory used for store all assets file on this project, for icon and splash you can put on root of this directory<br>
```/components```  is directory for unsee component (like: AndroidSafeArea)<br>
```/components/screens```   is directory for page that have different function (like: login,home, etc) <br>
```/components/partials```   is directory for part of mobile have pages that have same function on every pages (like: navbar, header, etc)<br>
```/components/middlerware```  is directory for middleware <br>

Rule of name :
- for '.js. file use this format ' homePage.js ' or ' sagas.js '
- for React Component use this format ' HomePage '  or ' App '