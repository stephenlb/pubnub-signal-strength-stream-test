(async ()=>{

const testChannel = '123-testing';
const pubnub = PubNub({
    origin:       'toxi-demo.pubnub.com',
    publishKey:   'demo-36',
    subscribeKey: 'demo-36',
});

// Publish Loop
setInterval( async () => log(await publish()), 1000 );

// Start Subscribe
subscribe(testChannel);

// Subscribe Messaage Receiver
function receiver(message) {
    log({Rx: new Date(message.timestamp)});
}

// Log output
log.count = 1;
function log(out) {
    console.log(out);
    document.querySelector('#out').innerHTML +=
        `<div>${log.count++}: ${JSON.stringify(out)}</div>`;
}

async function subscribe(channel) {
    const subscription = PubNub.subscribe({channel: channel});
    for await (let message of subscription()) receiver(message);
}

async function publish() {
    let message = { timestamp: +new Date() };
    return await pubnub.publish({
        channel:  testChannel,
        message:  message,
        metadata: message,
    }) ? {Tx: new Date(message.timestamp)} : false;
}

})();
