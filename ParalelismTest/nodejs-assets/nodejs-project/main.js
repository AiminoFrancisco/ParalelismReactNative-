var rn_bridge = require('rn-bridge');
const axios = require('axios');
const url = 'https://webhook.site/63055785-a1d2-42ed-b6a0-f701847ad480'; // cambiar url por una Activa
//EN ESPERA
/* const express = require('express')
const app = express()
app.listen(3001,()=>{
  rn_bridge.channel.send("PUERTO 3001 abierto!!")
})
app.get('/', (req,res)=>{
  res.send('<h1>Hello World</h1>')
}) */
//EN ESPERA
// Echo every message received from react-native.
rn_bridge.channel.on('message', msg => { //
  setTimeout(()=>rn_bridge.channel.send(msg),10000)
});

// Inform react-native node is initialized.
rn_bridge.channel.on('node-echo', msg => { //POST desde el 2do HILO
  axios({
    method: 'post',
    url: url,
    data: msg,
  });
});
rn_bridge.channel.send('Hola3');