// imports

const { execute } = require("./dadjoke")

const headers = { 

}
/**
 * 1. Pull phone number to call
 * 2. Validate phone number
 * 3. Place call from server
 * 4. Send audio to channel
 * 5. Record audio form users
 * 6. Send audio to call
 * 7. Wait for hangup or command to stop? 
 */

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


module.exports = { 
    name: 'call',
    description: 'Calls a selected phone number in the United States',
    async execute(m, args) {
        // Get phone number to call
        // Place call from server
        // Send audio from call to channel
        // Record audio from users
        // Send audio from users
        // Listen for command to exit? 
        const receivingNumber = args[0];
        client.calls.create({
            twiml: '<Response><Say>Hello Alexis, you smell like complete shit.</Say></Response>',
            to: receivingNumber,
            from: process.env.TWILIO_PHONE
        }).then((call) => {
            console.log(call);
        }).catch((e) => {
            console.error(e);
        });
    }
}