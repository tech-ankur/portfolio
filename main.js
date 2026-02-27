//For mobile view sidebar
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const sidebarClose = document.getElementById("sidebar-close");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.remove("-translate-x-full");
});

sidebarClose.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
});

document.querySelectorAll("#sidebar a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
  });
});


// Now initialize AOS
AOS.init({
  duration: 650,
  offset: 120,
  once: false
});


//For app icons
lucide.createIcons();


//For colored link of navbar
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelectorAll(`.nav-link[href="#${id}"]`);

        if (entry.isIntersecting) {
          link.forEach((el) => el.classList.add("active-link"));
        } else {
          link.forEach((el) => el.classList.remove("active-link"));
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});


//For toggling between dark and light mode
const root = document.documentElement;
const toggleDesktop = document.getElementById('theme-toggle-desktop');
const toggleMobile = document.getElementById('theme-toggle-mobile');
const iconDesktop = document.getElementById('mode-icon-desktop');
const iconMobile = document.getElementById('mode-icon-mobile');

const savedTheme = localStorage.getItem("dark");
const isDark = savedTheme !== "dark"; // default to dark

applyTheme(isDark);

toggleDesktop.addEventListener("change", () => {
  applyTheme(toggleDesktop.checked);
});

toggleMobile.addEventListener("change", () => {
  applyTheme(toggleMobile.checked);
});

function applyTheme(isDark) {
  root.classList.toggle("dark", isDark);

  toggleDesktop.checked = isDark;
  toggleMobile.checked = isDark;

  iconDesktop.textContent = isDark ? "🌙" : "☀️";
  iconMobile.textContent = isDark ? "🌙" : "☀️";

  localStorage.setItem("theme", isDark ? "dark" : "light");
}


//for sending message through contact form
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  try {
    const response = await fetch("https://portfolio-backend-olhh.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ Message sent successfully!");
      form.reset();
    } else {
      alert("❌ Failed to send message.");
    }
  } catch (err) {
    alert("❌ An error occurred while sending the message.");
    console.error(err);
  }
});


// Wait for full page load including images, styles, etc.
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");

  // Optional: fade out effect
  preloader.style.opacity = "0";
  preloader.style.transition = "opacity 0.8s ease";

  setTimeout(() => {
    preloader.style.display = "none";
    content.style.display = "block";
  }, 800); // Match transition time
});


//ChatBot
function toggleChat() {
  const container = document.getElementById("chatbot-container");
  container.style.display = container.style.display === "none" ? "block" : "none";
}

const input = document.getElementById("chat-input");
const chatbox = document.getElementById("chatbox");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && input.value.trim() !== "") {
    const userMessage = input.value.trim();
    chatbox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
    input.value = "";

    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    })
      .then(res => res.json())
      .then(data => {
        chatbox.innerHTML += `<div><strong>Bot:</strong> ${data.reply}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;
      })
      .catch(err => {
        chatbox.innerHTML += `<div style="color:red;">⚠️ Error contacting bot.</div>`;
      });
  }
});


function toggleChat() {
  const bot = document.getElementById("chatbot-container");
  bot.classList.toggle("hidden");
}


//letter-by-letter animation effect for name
const nameText = "Ankur Singh";
const nameElement = document.getElementById("typingName");
let i = 0;

function typeName() {
  if (i < nameText.length) {
    nameElement.textContent += nameText.charAt(i);
    i++;
    setTimeout(typeName, 200); // typing speed (ms)
  }
}
typeName();