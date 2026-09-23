import "dotenv/config";

import { Client, Events, GatewayIntentBits } from "discord.js";

import connectDB from "./config/db.js";
import URL from "./models/url.js";
import shortid from "shortid";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1].trim();

    const shortId = shortid.generate();

    await URL.create({
      shortId,
      redirectURL: url,
      visitHistory: [],
    });

    return message.reply({
      content: `Short ID generated: ${shortId}`,
    });
  }

  message.reply({
    content: "Bot says hello!",
  });
});

client.on("interactionCreate", (interaction) => {
  console.log(interaction);

  interaction.reply("Pong!!");
});

await connectDB();

client.login(process.env.DISCORD_TOKEN);
