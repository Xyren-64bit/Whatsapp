const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Membuat aplikasi Express
const app = express();
const port = process.env.PORT || 3000;

// Membuat instance dari client WhatsApp
const client = new Client({
  authStrategy: new LocalAuth()
});

// Event ketika client siap digunakan
client.on('ready', () => {
  console.log('Bot WhatsApp sudah siap!');
});

// Event untuk menampilkan QR code
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

// Event untuk menerima pesan
client.on('message', message => {
  console.log(message.body);
  // Balas pesan secara otomatis
  if (message.body.toLowerCase() === 'hi') {
    message.reply('Hello! Saya bot WhatsApp.');
  }
});

// Menjalankan client
client.initialize();

// Membuat endpoint di Express untuk mengakses bot
app.get('/', (req, res) => {
  res.send('Bot WhatsApp berjalan');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
