import readline from "node:readline";
import type { Interface } from "node:readline"; // Här importeras bara typer

const rl: Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Question {
    question: string;
    answer: string | number | boolean;
    help: string
}
const questions: Question[] = [
    { question: "hur ofta spelar bajen i Allsvenskan?",
    answer: "en gång i veckan",
    help:""},
    {question: "Vilka kommer vinna Allsvenskan 2025?",
        answer: "hammarby",
        help:"Kolla 2an i tabellen!"
    },
     {question: "Vilket lag har bäst fans i Sverige?",
        answer: "hammarby",
        help:"Vilka dricker mest bärs?"
    },
     {question: "Vilket lag i Stockholm har ett så kallat derbyspöke",
        answer: "hyrgården",
        help:"Ingen egen arena och spelar hemmamatcher i bajenland"
    },
    {question: "Hur många SM-guld har hammarbys herrlag?",
        answer: 1,
        help:"kanske inte så skrytsamt... men inte sämst"
    },
    {question: "Är bajen bäst i stan enligt tabellen? (Ja/Nej)",
        answer: true,
        help:"Bajen är alltid bäst i stan"
    }
]




// Fråga användaren och returnera svaret som Promise<string>
function ask(rl: readline.Interface, prompt: string): Promise<string> {
  return new Promise((resolve) => rl.question(prompt + " ", resolve));
}

async function main(){
let score = 0;

for(let i = 0; i < questions.length; i ++){

if(typeof questions[i].answer ==  "string"){
 const answer = await ask(rl, questions[i].question + " hint: " + questions[i].help );
 let response = ""; 

 if(answer.toLocaleLowerCase() == questions[i].answer){
response = "Rätt!";
score = score + 2
 } else {
   response = "Fel! Rätt svar: " + questions[i].answer
   score = score - 1
 }
 console.log(response);

} 

else if (typeof questions[i].answer ==  "number"){
 const answer = await ask(rl, questions[i].question + " hint: " + questions[i].help );
let response = ""; 
 if(answer == questions[i].answer){
response = "Rätt!";
score = score + 2
 } else {
   response = "Fel! Rätt svar: " + questions[i].answer
   score = score - 1
 }
 console.log(response);
}

else if (typeof questions[i].answer ==  "boolean"){
 const answer = await ask(rl, questions[i].question + " hint: " + questions[i].help );
let response = ""; 
 if(answer.toLocaleLowerCase() == "ja" && questions[i].answer == true){
response = "Rätt!";
score = score + 2
 } else if (answer == "nej" && questions[i].answer == false){
   response = "Fel! Rätt svar: " + questions[i].answer
   score = score - 1
 }
 console.log(response);
}
}
console.log("Game over! Score: " + score + "/" + (questions.length + 1) )
 rl.close()
}

console.log("Välkommen till quizet! Rätt svar ger 2 poäng, fel svar ger -1 poäng!")
main();
