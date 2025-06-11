const API_URL = "/enots";

// Load all Raccoons when page loads
window.addEventListener("DOMContentLoaded", async () => {
  await checkLoginStatus();
  loadEnots();

  document.getElementById("enot-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        await addEnot();
      } catch (err) {
        console.error("Failed to add Raccoon:", err);
        alert("Failed to add Raccoon. Check the console for details.");
      }
  });

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

      userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          sendBtn.click();
        }
      });

      document.getElementById("clearBtn").addEventListener("click", () => {
        document.getElementById("messages").innerHTML = "";
      });

});


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
    `;

    // Add rename form only if logged in
    if (isLoggedIn) {
      div.innerHTML += `
        <input type="text" id="name-${enot.id}" placeholder="Give a name">
        <button onclick="renameEnot(${enot.id})">Save Name</button>
      `;
    }

    // Add delete button only if logged in and user is the creator
    if (isLoggedIn && (enot.createdBy === loggedInUsername || loggedInUsername === "admin")) {
      div.innerHTML += `
        <button onclick="deleteEnot(${enot.id})">Delete</button>
      `;
    }

    div.innerHTML += `<hr>`;
    list.appendChild(div);
  });
}



async function addEnot() {
  try {
    const originalName = document.getElementById("originalName").value;
    const age = document.getElementById("age").value;
    const favoriteFood = document.getElementById("favoriteFood").value;
    const photoFile = document.getElementById("photoFile").files[0];

    const formData = new FormData();
    formData.append("file", photoFile);

    const uploadResponse = await fetch("/upload", {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    if (!uploadResponse.ok) {
      throw new Error("Image upload failed with status " + uploadResponse.status);
    }

    const photoUrl = await uploadResponse.text();

    const createResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        originalName,
        age,
        favoriteFood,
        photoUrl
      })
    });

    if (!createResponse.ok) {
      throw new Error("Raccoon creation failed with status " + createResponse.status);
    }

    document.getElementById("enot-form").reset();
    await loadEnots();
  } catch (err) {
    console.error("Error in addEnot:", err);
    alert("Failed to add Raccoon. See console for details.");
  }
}



  async function renameEnot(id) {
    const input = document.getElementById(`name-${id}`);
    const userGivenName = input.value;

    await fetch(`${API_URL}/${id}/name`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(userGivenName)
    });

    loadEnots();
  }

  async function deleteEnot(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      credentials: "include"
    });
    await loadEnots();
  }

let isLoggedIn = false;
let loggedInUsername = null;

async function checkLoginStatus() {
  try {
    const res = await fetch("/me", { credentials: "include" });
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const form = document.getElementById("enot-form");
    const heading = document.getElementById("add-heading");

    if (!loginBtn || !signupBtn || !logoutBtn || !form) return;

    if (res.ok) {
      const username = await res.text();
      isLoggedIn = true;
      loggedInUsername = username;

      loginBtn.style.display = "none";
      signupBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
      form.style.display = "block";
      heading.style.display = "block";

    } else {
      isLoggedIn = false;
      loggedInUsername = null;

      loginBtn.style.display = "inline-block";
      signupBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
      form.style.display = "none";
      heading.style.display = "none";
    }
  } catch (e) {
      console.error("Login check failed:", e);
      document.getElementById("enot-form").style.display = "none";
      document.getElementById("logout-btn").style.display = "none";
      document.getElementById("add-heading").style.display = "none";
    }
}

document.getElementById("logout-btn").addEventListener("click", async () => {
  try {
    await fetch("/logout", {
      method: "POST",
      credentials: "include"
    });
    location.reload(); // Refresh the page to update UI
  } catch (err) {
    console.error("Logout failed:", err);
  }
});


