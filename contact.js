const form = document.getElementById("finalForm");
const input = document.getElementById("userEmail");
const button = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // جلوگیری از رفتار پیش‌فرض فرم

  const email = input.value.trim();
  if (!email) return;

  button.disabled = true;
  button.textContent = "Sending...";

  try {
    const formData = new URLSearchParams({ email });

    const response = await fetch("https://aland-learning.darkube.app/webhook-test/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    });

    const data = await response.json();

    if (data.success) {
      // ✅ انتقال به صفحه تشکر در صورت موفقیت
      window.location.href = "thank-you.html";
    } else {
      alert("Failed to submit email.");
      button.disabled = false;
      button.textContent = "Try Again";
    }
  } catch (err) {
    alert("Something went wrong.");
    console.error(err);
    button.disabled = false;
    button.textContent = "Try Again";
  }
});
