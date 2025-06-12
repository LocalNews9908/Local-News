const db = firebase.database();

function filterByDistrict(district) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';
  db.ref('news').orderByChild('district').equalTo(district).once('value', snapshot => {
    snapshot.forEach(child => {
      const data = child.val();
      const div = document.createElement('div');
      div.innerHTML = `<h3>${data.title}</h3><p>${data.content}</p>`;
      newsContainer.appendChild(div);
    });
  });
}
