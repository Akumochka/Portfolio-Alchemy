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

const answers = {
    1: "4",
    2: "PI",
    3: "Gold,Quicksilver,Silver,Iron,Gold",
    4: "Silver"
};

const solvedChallenges = {};

async function startSession() {

    const response = await fetch(startURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userConfig)
    });

    const data = await response.json();
    return data.token;
}

async function getStatus(token) {

    const response = await fetch(statusURL, {
        method: "GET",
        headers: {
            "Authorization": token,
            "Accept": "application/json"
        }
    });

    return response.json();
}

async function submitAnswer(token, answer) {

    const response = await fetch(submitURL, {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ answer: answer })
    });

    return response.json();
}

async function solveChallenge(token) {

    const status = await getStatus(token);

    console.log("Challenge:", status.challengeId);
    console.log("Prompt:", status.prompt);
    console.log("Score:", status.currentScore);

    const id = status.challengeId;

    if (solvedChallenges[id]) {
        console.log("Already solved");
        return;
    }

    const answer = answers[id];

    if (!answer) {
        console.log("Answer not known yet.");
        return;
    }

    const result = await submitAnswer(token, answer);

    console.log("Result:", result);

    if (result.correct) {

        solvedChallenges[id] = true;

        await solveChallenge(token);
    } else {
        console.log("Wrong answer");
    }
}

async function main() {

    const token = await startSession();

    console.log("Session started");

    await solveChallenge(token);
}

main();
