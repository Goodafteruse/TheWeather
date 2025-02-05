<script type="module">
  // Import fungsi yang diperlukan dari Firebase SDK
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
  import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

  // Konfigurasi Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyCqMqlS99QqH2xo4oairOBkBICkHIvWpts",
    authDomain: "ayangs-7b698.firebaseapp.com",
    projectId: "ayangs-7b698",
    storageBucket: "ayangs-7b698.firebasestorage.app",
    messagingSenderId: "121761992286",
    appId: "1:121761992286:web:ec61b4832c52017175aecf"
  };

  // Inisialisasi Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app); // Inisialisasi Firestore

  // Elemen DOM
  const messagesDiv = document.getElementById('messages');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');

  // Kirim pesan
  sendButton.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (message !== "") {
      try {
        // Tambahkan pesan ke Firestore
        await addDoc(collection(db, 'messages'), {
          text: message,
          timestamp: serverTimestamp() // Tambahkan timestamp
        });
        messageInput.value = ""; // Kosongkan input
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  });

  // Tampilkan pesan
  const q = query(collection(db, 'messages'), orderBy('timestamp')); // Query pesan berdasarkan timestamp
  onSnapshot(q, (snapshot) => {
    messagesDiv.innerHTML = ""; // Kosongkan pesan sebelumnya
    snapshot.forEach((doc) => {
      const message = doc.data().text;
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      messageElement.classList.add('message'); // Tambahkan class untuk styling
      messagesDiv.appendChild(messageElement);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll ke bawah
  });
</script>