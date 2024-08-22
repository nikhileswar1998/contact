const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});


// client.on('qr', (qr) => {
//     console.log('QR RECEIVED', qr);
// });





// let contacts = [{
//     "phone": "15129545778",
//     "name": "Dharahas"
// },
// {
//     "phone": "12482251239",
//     "name": "Mallik"
// },
// {
//     "phone": "12488398234",
//     "name": "Sai Santhosh"
// },
// {
//     "phone": "12488857867",
//     "name": "Shiva"
// }]

let contacts = [{
    "phone": "15129545778",
    "name": "Dharahas"
}]

let sample_texts_func = (name) => `Hi ${name}, how are you? this is a sample test message. Please ignore - DT`


client.on('ready', () => {
    console.log('Client is ready!');
    console.log('`n Sending message now')
    for (let contact of contacts) {
        let msg = sample_texts_func(contact['name'])
        client.sendMessage(`${contact['phone']}@c.us`, msg)
        console.log(`Message sent to ${contact['name']}`)
        // break
    }
    console.log('\n\n All messages successfully sent!!!!!')
});

client.on('message', (message) => {
    console.log(message.body);
});


client.initialize();
