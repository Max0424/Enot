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
      <button onclick="deleteEnot(${enot.id})">Delete</button>
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

  // Step 1: Upload the image
  const formData = new FormData();
  formData.append("file", photoFile);

  const uploadResponse = await fetch("https://enot.onrender.com/upload", {
    method: "POST",
    body: formData
  });

  const photoUrl = await uploadResponse.text(); // response is the URL as plain text

  // Step 2: Create the enot using the uploaded photo URL
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      originalName,
      age,
      favoriteFood,
      photoUrl
    })
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

  async function deleteEnot(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    await loadEnots();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("sendBtn");
    const userInput = document.getElementById("userInput");
    const messages = document.getElementById("messages");

    if (!sendBtn || !userInput || !messages) return;

    sendBtn.addEventListener("click", async () => {
      const message = userInput.value.trim();
      if (!message) return;

      messages.innerHTML += `<div class="message user">${message}</div>`;
      userInput.value = "";

      // Show thinking message
      const thinkingId = `thinking-${Date.now()}`;
      messages.innerHTML += `
        <div class="message bot" id="${thinkingId}">
          <span class="typing-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
      `;
      messages.scrollTop = messages.scrollHeight;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message })
        });

        const reply = await res.text();

        // Replace "thinking" message with actual reply
        const thinkingDiv = document.getElementById(thinkingId);
        if (thinkingDiv) thinkingDiv.textContent = reply;
      } catch (err) {
        const thinkingDiv = document.getElementById(thinkingId);
        if (thinkingDiv) thinkingDiv.textContent = "Error contacting raccoon HQ 🦝";
      }
    });
  });

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("messages").innerHTML = "";
});


