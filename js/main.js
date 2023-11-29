/* Code snippet re-used from Brad Traversy */
// Sticky menu background
window.addEventListener("scroll", function () {
  if (window.scrollY > 150) {
    document.querySelector("#navbar").style.opacity = 0.9;
  } else {
    document.querySelector("#navbar").style.opacity = 1;
  }
});

const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const loader = document.getElementById("loadingConversation");
const loadingConversation = document.querySelector(".loadingConversation");

function appendMessage(sender, message, senderClass) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(senderClass);
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbox.appendChild(messageElement);
}

function sendMessage() {
  const message = userInput.value;
  chatbox.style.display = "flex";
  appendMessage("You", message, "user-message");
  chatbox.appendChild(loader);
  loader.style.display = "inline-flex";
  userInput.value = "";
  const userMessageObj = {
    userMessage: message,
  };

  fetch("https://faqappservice.azurewebsites.net/api/FAQ", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(userMessageObj),
  })
    .then((response) => response.text())
    .then((data) => {
      loader.style.display = "none";
      const botMessage = data || "Sorry, I don't have an answer for that.";
      appendMessage("TheManeAllureGPT", botMessage, "bot-message");
    })
    .catch((err) => {
      const botMessage =
        "Oops, something went wrong 😭, let's try again later!";
      loader.style.display = "none";
      appendMessage("TheManeAllureGPT", botMessage, "bot-message");
    });
}

// Smooth Scrolling
// $("#navbar a, .btn").on("click", function (event) {
//   if (this.hash !== "") {
//     event.preventDefault();

//     const hash = this.hash;

//     $("html, body").animate(
//       {
//         scrollTop: $(hash).offset()
//       },
//       800
//     );
//   }
// });
