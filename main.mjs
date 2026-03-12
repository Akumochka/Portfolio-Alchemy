const baseURL = "https://alchemy-kd0l.onrender.com";
const startURL = `${baseURL}/start`;
const statusURL = `${baseURL}/status`;
const submitURL = `${baseURL}/submit`;
const clueURL = `${baseURL}/clue`;

//Start
const userConfig = { 
    "email": "evgeniiae@uia.no", 
    "nick": "Akuma", 
    "pin": "8811"
};

let response = await (await fetch(startURL, {
    body: JSON.stringify(userConfig), 
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
})).json();

console.log(response);

//Token 
let token = response.token;

console.log(token);

response = await (await fetch(statusURL,{
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Authorization": token,
        "Content-Type": "application/json"
    }
})).json();

console.log(response);

//Answer 1
const answerResponse = await (await fetch(submitURL, {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": token
    },
    body: JSON.stringify({ answer: "4" }) 
})).json();

// console.log(answerResponse);

//Answer 2

const secondAnswerResponse = await (await fetch(submitURL, {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": token
    },
    body: JSON.stringify({ answer: "PI" }) 
})).json();

console.log(secondAnswerResponse);
