const { Client, Storage, Account } = require("appwrite");

const client = new Client();

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT);

const storage = new Storage(client);
const account = new Account(client);

module.exports = { storage, account }