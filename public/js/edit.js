document.onreadystatechange = function () {

  document.getElementById("descr").onclick = editor_on;

  function editor_on(){
    var descr = document.getElementById("descr");
    /*
    */
    //.parentNode.removeChild(element);
    if (descr.firstElementChild != null) {
      let newtext = document.getElementById("newtext").value;
      var xhr = new XMLHttpRequest();
      xhr.open("post","http://localhost:3000/edit/modifproduit?newtext="+newtext, true);
      xhr.send(null);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          // Typical action to be performed when the document is ready:
          //var response = JSON.parse(xhr.responseText);
          console.log("Status de la réponse: %d (%s)", xhr.status, xhr.statusText);
        } else {
          console.log("Status de la réponse: %d (%s)", xhr.status, xhr.statusText);
        }
      }


    } else {
      descr.innerHTML = '<textarea id="newtext" name="" rows="10" cols="80">'+descr.innerHTML+'</textarea><button id="produit1" type="button" name="submit">Modifier</button>';
    }
  }

}

/*
*/
