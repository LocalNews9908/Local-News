
document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");
  const categories = document.querySelectorAll("#main-nav li");

  categories.forEach(item => {
    item.addEventListener("click", () => {
      const category = item.textContent.trim().split("•")[1].trim();
      loadCategoryNews(category);
    });
  });

  function loadCategoryNews(category) {
    const dbRef = firebase.database().ref("posts");
    dbRef.orderByChild("category").equalTo(category).once("value", snapshot => {
      newsContainer.innerHTML = "";
      snapshot.forEach(child => {
        const post = child.val();
        const div = document.createElement("div");
        div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        newsContainer.appendChild(div);
      });
    });
  }
});
