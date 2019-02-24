firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        firebase.database().ref('/users/' + user.uid).set(true);
        console.log(user.uid);
        managePage(user);
    }
});

function managePage(user) {
    var listref = firebase.database().ref('/framesOf/' + user.uid);
    listref.on('value', function(snapshot) {
    var list = document.getElementById("framesList");
    list.innerHTML = '';
    snapshot.forEach(element => {
        var node = document.createElement('li');
        node.className = "mdl-list__item"
        var textnode = document.createElement('a');
        textnode.innerText = element.key;
        textnode.href= "/controller?key=" + element.key;
        textnode.className = "mdl-list__item-primary-content"
        node.appendChild(textnode);
        list.appendChild(node);
    });
});            
}
