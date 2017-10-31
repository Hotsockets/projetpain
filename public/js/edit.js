document.onreadystatechange = function () {
  document.getElementById("madescription").addEventListener("click", editor_on);
  function editor_on(){
    var descr = document.getElementById("madescription");
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
      oldtext = descr.innerHTML;
      descr.innerHTML = '<textarea id="newtext" name="" rows="10" cols="80">'+oldtext+'</textarea>';
      document.getElementById("validation").innerHTML = '<button id="produit1" type="button" name="submit">Modifier</button>';
    }
  }
  document.getElementById("submit").onclick = editor_off;

  function editor_off(){
  }
}
