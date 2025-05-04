const API_URL = "https://enot.onrender.com/enots";

// Load all Enots when page loads
window.onload = () => {
  loadEnots();

  document.getElementById("enot-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    await addEnot();
  });
};

async function loadEnots() {
  const response = await fetch(API_URL);
  const enots = await response.json();

  const list = document.getElementById("enot-list");
  list.innerHTML = "";

  enots.forEach(enot => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${enot.originalName}</h3>
      <p>Age: ${enot.age}</p>
      <p>Favorite Food: ${enot.favoriteFood}</p>
      <img src="${enot.photoUrl}" alt="${enot.originalName}" width="200">
      <p>User Name: ${enot.userGivenName || "None"}</p>
      <input type="text" id="name-${enot.id}" placeholder="Give a name">
      <button onclick="renameEnot(${enot.id})">Save Name</button>
      <hr>
    `;
    list.appendChild(div);
  });
}


async function addEnot() {
  const originalName = document.getElementById("originalName").value;
  const age = document.getElementById("age").value;
  const favoriteFood = document.getElementById("favoriteFood").value;
  const photoFile = document.getElementById("photoFile").files[0];

  const formData = new FormData();
  formData.append("originalName", originalName);
  formData.append("age", age);
  formData.append("favoriteFood", favoriteFood);
  formData.append("photo", photoFile);

  await fetch("https://enot.onrender.com/upload", {
    method: "POST",
    body: formData
  });

  document.getElementById("enot-form").reset();
  await loadEnots();
}



  async function renameEnot(id) {
    const input = document.getElementById(`name-${id}`);
    const userGivenName = input.value;

    await fetch(`${API_URL}/${id}/name`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userGivenName)
    });

    loadEnots();
  }
