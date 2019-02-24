var rawFile = new XMLHttpRequest();
rawFile.open("GET", "jsonheart.json", false);
rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4) {
        if(rawFile.status === 200 || rawFile.status == 0) {
            firebase.database().ref('/frames/' + mac + '/display').set(rawFile.responseText);
        }
    }
}
rawFile.send(null);