// app.js
import ApiKey from "./util.js";
console.log(ApiKey); //util.js에서 export 한 ApiKey를 import 해서 사
document.querySelector("#keyInfo").innerHTML = ApiKey;
