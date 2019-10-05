# RestServer

let resp = pm.response.json();

if(resp.ok){
    let token = resp.token;
   
pm.environment.set("token", token);
}else{
console.log("Not update token");
}
