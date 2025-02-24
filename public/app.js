let socket;

document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const token = document.getElementById("tokenInput").value;
    if (!token) {
        console.log("Please enter a token.");
        return;
    }

    // Conectar con el servidor enviando el token
    socket = io("/chat", { auth: { token } });

    socket.on("connect", () => {
        console.log("Connected to server");

        // Mostrar el contenedor del chat y ocultar el formulario de login
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("chatContainer").style.display = "block";

        // Esperar lista de usuarios y buscar el actual
        socket.on("users", (users) => {
            console.log("Users list:", users);
            const currentUser = users.find((user) => user.id === socket.id);
            if (currentUser) {
                document.getElementById("username").innerText = currentUser.username;
                console.log(`Logged in as: ${currentUser.username}`);
            }
        });
    });

    socket.on("connect_error", (err) => {
        alert("Authentication error: Invalid token.");
        console.error("Connection error:", err.message);
    });

    // Unirse a una sala
    document.getElementById("joinRoom").addEventListener("click", () => {
        const room = document.getElementById("roomSelect").value;
        socket.emit("joinRoom", room);
        console.log(`Joined room: ${room}`);

        document.getElementById("messageInput").disabled = false;
        document.getElementById("sendMessage").disabled = false;
    });

    // Enviar mensaje
    document.getElementById("sendMessage").addEventListener("click", () => {
        const message = document.getElementById("messageInput").value;
        const room = document.getElementById("roomSelect").value;

        if (message.trim() === "") return;

        socket.emit("sendMessage", { room, message });
        document.getElementById("messageInput").value = "";
    });

    // Mostrar mensajes recibidos
    socket.on("receiveMessage", (data) => {
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML += `<p><strong>${data.username}:</strong> ${data.message}</p>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll
    });

    // Mensajes del sistema (ej. usuario entrando o saliendo)
    socket.on("systemMessage", (message) => {
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML += `<p style="color: gray;"><em>${message}</em></p>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
});
