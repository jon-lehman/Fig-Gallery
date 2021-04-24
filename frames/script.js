// Firebase Configuration
var firebaseConfig = {
  apiKey: "AIzaSyAiCQby9fgvoDefSRHKpPc2Qe4vzIfJaRU",
  authDomain: "office-figallery.firebaseapp.com",
  projectId: "office-figallery",
  storageBucket: "office-figallery.appspot.com",
  messagingSenderId: "629005007950",
  appId: "1:629005007950:web:3b1170cc6b96f424c0171f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set Figma API defaults
const figmaApiKey = "52858-877a7444-a96c-4d42-af87-f3ace5984cf2"
var figmaId = ""
var globalImageId = ""

function getImage(imageId) {
  var globalImageId = imageId
  // Look in Firebase for set Figma File
  var figmaFileRef = firebase.database().ref("figmafile")
  figmaFileRef.on("value", function(snapshot) {

    console.log(snapshot.val());

    if (snapshot.val() === "public1") {var figmaId = "LWtmUmFrIK40eNQ5hUmlGG"}
    else if (snapshot.val() === "public2") {var figmaId = "SJ8BCokNHOkNVHZLXDVWTR"}
    else if (snapshot.val() === "private1") {var figmaId = "UEhvAqV0cJxo5KmfwXlsIx"}
    else if (snapshot.val() === "private2") {var figmaId = "vona8hJ5C08si3tTez8NtH"}
    else if (snapshot.val() === "customURL") {}

    retrieveImageFromFigma(imageId)

    // Get figma frame image based on file id
    async function retrieveImageFromFigma(imageId) {
      let result = await fetch('https://api.figma.com/v1/images/' + figmaId + '?ids=' + imageId + '&scale=4', {
        method: 'GET',
        headers: {
          'X-Figma-Token': figmaApiKey
        }
      })
      let imageData = await result.json()
      document.getElementById('frame').style.backgroundImage = "url('"+imageData.images[imageId];+"')";
    };
  }); 
}

firebase.database().ref("refresh").on("value", function(snapshot) {
  retrieveImageFromFigma(globalImageId)
  async function retrieveImageFromFigma(globalImageId) {
    let result = await fetch('https://api.figma.com/v1/images/' + figmaId + '?ids=' + globalImageId + '&scale=4', {
      method: 'GET',
      headers: {
        'X-Figma-Token': figmaApiKey
      }
    })
    let imageData = await result.json()
    document.getElementById('frame').style.backgroundImage = "url('"+imageData.images[globalImageId];+"')";
  };
})