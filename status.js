const params = new URLSearchParams(window.location.search);
const status = params.get('status');
const name = params.get('email');
const fullEmail = `${name}@mohammad-omidi.ir`;

const titleEl = document.getElementById('title');
const descEl = document.getElementById('description');
const messageBox = document.getElementById('messageBox');
const reserveButton = document.querySelector('.reserve-button');

if (status === 'reserved') {
  titleEl.textContent = 'Email is available!';
  descEl.textContent = `${fullEmail} has been successfully registered.`;
  messageBox.classList.add('success');
  reserveButton.style.display = 'none';
}
else if (status === 'duplicate' || status === 'already_reserved') {
  titleEl.textContent = 'Email has already been registered!';
  descEl.textContent = `${fullEmail} is taken. Please try another name.`;
  messageBox.classList.add('duplicate');
  reserveButton.style.display = 'none';
}
else if (status === 'available') {
  titleEl.textContent = 'Email is available!';
  descEl.textContent = `Would you like to reserve ${fullEmail}?`;
  messageBox.classList.add('available');
  reserveButton.style.display = 'inline-block';
}
else {
  titleEl.textContent = 'An error occurred.';
  descEl.textContent = `There was a problem checking ${fullEmail}. Please try again.`;
  messageBox.classList.add('error');
  reserveButton.style.display = 'none';
}

function goHome() {
  window.location.href = 'index.html';
}

async function reserveEmail() {
  if (!name) {
    alert("Invalid email.");
    return;
  }

  reserveButton.disabled = true;
  reserveButton.textContent = "Sending...";

  try {
    const formData = new URLSearchParams({ name });

    const response = await fetch("https://aland-learning.darkube.app/webhook/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    });

    if (!response.ok) throw new Error("Server connection error");

    const data = await response.json();
    if (data.status === "reserved") {
      alert(data.body || "Reservation successful.");
      reserveButton.textContent = "Reserved ✅";
      reserveButton.disabled = true;    
      window.location.href = "contact.html";

    } else {
      alert(data.body || ("Problem during reservation: " + data.status));
      reserveButton.disabled = false;
      reserveButton.textContent = "Reserve This Email";
    }
  } catch (err) {
    alert("An error occurred during reservation.");
    console.error(err);
    reserveButton.disabled = false;
    reserveButton.textContent = "Reserve This Email";
  }
}
