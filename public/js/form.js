document.onreadystatechange = function () {
  document.getElementById("envoi").onclick = sendmessage;
  function sendmessage(event){
    //
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
    console.log(name, subject, email, message);

    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:3000/sendamail?name="+name+"&subject="+subject+"&email="+email+"&message="+message, true);
    xhr.send(null);
    //xhr.send("body : name="+name+"&subject="+subject+"&email="+email+"&message="+message);
    console.log(xhr);

    //voir pour un res.end ou autre.
    xhr.onreadystatechange = function() {
      console.log("test reponse xhr");
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Typical action to be performed when the document is ready:
        var response = JSON.parse(xhr.responseText);
        console.log(response.list[0], "coucou");
        document.getElementById("statut").innerHTML = "Message envoyé";
      } else {
        console.log("Statut de la réponse: %d (%s)", xhr.status, xhr.statusText);
      }
    }
  }
}
