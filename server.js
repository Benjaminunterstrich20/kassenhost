const express = require('express');
const app = express();

app.use(express.json());

const orders = [];

app.post('/bestellung', (req, res) => {
  const { order, timestamp } = req.body;
  if (!order || !timestamp) {
    return res.status(400).send('Fehlende Bestellung oder Zeitstempel');
  }
  orders.push({ order, timestamp });
  console.log('Neue Bestellung:', order);
  res.status(200).send('Bestellung gespeichert');
});

app.get('/', (req, res) => {
  let html = '<h1>Bestellungen auf kassenhost.onrender.com</h1><ul>';
  for (const o of orders) {
    html += `<li><strong>${new Date(o.timestamp).toLocaleString()}</strong>:<br>${o.order.replace(/\n/g, '<br>')}</li><hr>`;
  }
  html += '</ul>';
  res.send(html);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
