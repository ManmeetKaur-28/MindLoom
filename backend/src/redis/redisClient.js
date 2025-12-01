import { createClient } from "redis";

const client = createClient();

client.on("error", (err) =>
    console.log("Error occured on redis client ::", err)
);

async function redisConnect() {
    try {
        await client.connect();
        console.log("redis client connected successfully");
    } catch (error) {
        console.log("error occured while connecting to redis client");
    }
}
redisConnect();

export default client;
