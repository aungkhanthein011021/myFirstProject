document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      // Re-run navbar.js after inserting
      const script = document.createElement("script");
      script.src = "./js/navbar.js";
      document.body.appendChild(script);
    });
});

document.addEventListener("DOMContentLoaded", async () => {
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const friendId = parseInt(localStorage.getItem("chatFriendId"), 10);
  const friendName = localStorage.getItem("chatFriendName"); // still a string

  const BASE_API = "https://two-connect-backend.onrender.com";

  if (!userId || !friendId) {
    alert("Missing user or friend ID. Please go back to the friends list.");
    window.location.href = "friends.html";
    return;
  }

  const chatBox = document.getElementById("chat-messages");
  const messageInput = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  const headerName = document.getElementById("chat-friend-name");

  if (headerName && friendName) {
    headerName.textContent = friendName;
  }

  // Render a single message
  function renderMessage(msg) {
    const div = document.createElement("div");
    div.classList.add("message");

    if (msg.senderId === userId) {
      div.classList.add("sent");
    } else {
      div.classList.add("received");
    }

    div.innerHTML = `
      <span>${msg.content}</span>
      <span class="timestamp">
        ${new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    `;

    return div;
  }

  // Load messages
  async function loadMessages() {
    try {
      const res = await fetch(`${BASE_API}/messages/${userId}/${friendId}`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      const messages = await res.json();

      chatBox.innerHTML = "";

      messages.forEach((msg) => {
        chatBox.appendChild(renderMessage(msg));
      });

      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
      console.error(error);
      alert("Could not load messages.");
    }
  }

  // Send a message
  async function sendMessage() {
    const content = messageInput.value.trim();
    if (!content) return;

    try {
      const res = await fetch(BASE_API + "/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: userId, // now INT
          receiverId: friendId, // now INT
          content,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      messageInput.value = "";
      await loadMessages();
    } catch (error) {
      console.error(error);
      alert("Message failed to send.");
    }
  }

  loadMessages();
  setInterval(loadMessages, 3000);

  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});
