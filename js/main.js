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

function appendMessage(sender, message, senderClass) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(senderClass);
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbox.appendChild(messageElement);
}

function sendMessage() {
  const message = userInput.value;
  appendMessage("You", message, "user-message");
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
      const botMessage = data || "Sorry, I don't have an answer for that.";
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
