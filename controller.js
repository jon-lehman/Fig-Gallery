var firebaseRef = firebase.database().ref()

function changeFigmaFile(figmafile) {
  firebaseRef.update({
    "figmafile": figmafile
  });
}

function refresh() {
  firebase.database()
    .ref('refresh')
    .set(firebase.database.ServerValue.increment(1))
}