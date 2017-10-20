document.onreadystatechange = function () {
  document.getElementById("envoi").onclick = sendmessage;
  function sendmessage(){
    let name = document.getElementById("name").value;
    let subject = document.getElementById("subject").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    console.log(name, subject, email, message);

    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:3000/contact", true);
    xhr.send(null);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Typical action to be performed when the document is ready:
        var response = JSON.parse(xhr.responseText);
        document.getElementById("statut").innerHTML = "Message bien envoye";
      } else {
        document.getElementById("statut").innerHTML = "Erreur envoi";
        console.log(name, subject, email, message);
        console.log("Statut de la réponse: %d (%s)", xhr.status, xhr.statusText);
      }
    }
  }
}
