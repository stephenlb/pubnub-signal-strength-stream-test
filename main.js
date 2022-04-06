(async ()=>{
'use strict';

const testChannel = '123-testing';
const pubnub = PubNub({
    origin:       'toxi-demo.pubnub.com',
    publishKey:   'demo-36',
    subscribeKey: 'demo-36',
});

// Publish Loop
setInterval( publish, 1000 );

// Start Subscribe
subscribe(testChannel);

// Subscribe Messaage Receiver
function receiver(message) {
    let string = JSON.stringify(message);
    console.log(message);
    document.querySelector('#out').innerHTML = string;
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
    });
}

})();
