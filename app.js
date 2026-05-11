// --- SIGNUP LOGIC ---
const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // This is the most important line!

        const name = document.getElementById('sName').value;
        const email = document.getElementById('sEmail').value;
        const password = document.getElementById('sPass').value;

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                alert("Account Created Successfully! Please login now.");
                window.location.href = "login.html";
            } else {
                const errorData = await response.json();
                alert("Error: " + (errorData.message || "Email already exists"));
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert("Could not connect to the server. Check if node server.js is running.");
        }
    });
}