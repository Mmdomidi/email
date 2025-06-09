async function submitName() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();

  if (!name) {
    alert("Please enter a name.");
    return;
  }

  try {
    const response = await fetch("https://aland-learning.darkube.app/webhook-test/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    if (!response.ok) throw new Error("Problem connecting to the server");

    const data = await response.json();
    const { status } = data;

    window.location.href = `status.html?status=${encodeURIComponent(status)}&email=${encodeURIComponent(name)}`;
  } catch (error) {
    alert("An error occurred. Please try again later.");
    console.error(error);
  }
}
