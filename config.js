require("dotenv").config()
const id = 2000194659;
const password = "htPtqTeC";
const phone_num = 919999999999;
// const id = process.env.id;
// const password = process.env.password;
// const phone_num = process.env.phone_num;
const message = "Greeting, thanks you for ";
const encodedMsg = encodeURI(message);

const OPT_IN_API = `https://media.smsgupshup.com/GatewayAPI/rest?method=SendMessage&format=json&userid=${id}&password=${password}&send_to=${phone_num}&v=1.1&auth_scheme=plain&msg_type=HSM&msg=${encodedMsg}`;
const sendMessageAPI = `https://media.smsgupshup.com/GatewayAPI/rest?method=SendMessage&format=json&userid=${id}&password=${password}&send_to=${phone_num}&v=1.1&auth_scheme=plain&msg_type=HSM&msg=${encodedMsg}`;

module.exports = {
    OPT_IN_API,
    sendMessageAPI
}