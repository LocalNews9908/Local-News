
// Your Firebase config here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

if (document.getElementById("newsForm")) {
  document.getElementById("newsForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const district = document.getElementById("district").value;

    firebase.database().ref("posts").push({
      title,
      content,
      district
    }).then(() => {
      alert("News posted!");
      document.getElementById("newsForm").reset();
    });
  });
}

function filterByDistrict(districtName) {
  const container = document.getElementById("newsContainer");
  container.innerHTML = "Loading news for " + districtName + "...";

  firebase.database().ref("posts").orderByChild("district").equalTo(districtName).once("value", function(snapshot) {
    container.innerHTML = "";
    if (!snapshot.exists()) {
      container.innerHTML = "No news found for " + districtName;
      return;
    }

    snapshot.forEach(function(childSnapshot) {
      const post = childSnapshot.val();
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>${post.district}</small>
        <hr>
      `;
      container.appendChild(div);
    });
  });
}
