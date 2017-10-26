/* json js quest
var people = {
  "prof":[
    {
      "firstname":"Han",
      "lastname": "Solo",
    },
    {
      "firstname":"Chew",
      "lastname": "Bacca",
    }
  ],
  "student":[
    {
      "firstname":"Marty",
      "lastname": "McFly",
    },
    {
      "firstname":"Doc",
      "lastname": "Brown",
    }
  ]
};

console.log(people.student[0].firstname);
console.log(people["student"][0]["firstname"]);
*/

//open a file
let openFile = function(event) {
  let input = event.target;

  let reader = new FileReader();
  reader.onload = function (){
    let text = reader.result;
    console.log(text);
    /*
    //split by line into an array
    let array = text.split("\n");
    let node = document.getElementById('output');
    // Text to the DOM
    text.split("\n").forEach(function(line){
      // to be replaced with DOM functions
      document.getElementById('output').innerHTML += '';
    });
    */
  };
  reader.readAsText(input.files[0]);
}

//write a file
