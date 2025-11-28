import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const optedIn = new Set();

const lightRoasts = [
  "You're like a software update. Nobody asked for you but we deal with you anyway.",
  "You have the energy of a loading screen that never hits 100%.",
  "You’re not useless. You could serve as a cautionary tale."
];

function getRoast() {
  return lightRoasts[Math.floor(Math.random() * lightRoasts.length)];
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "optin") {
    optedIn.add(interaction.user.id);
    return interaction.reply("You’re now roastable.");
  }

  if (interaction.commandName === "optout") {
    optedIn.delete(interaction.user.id);
    return interaction.reply("You’re safe now.");
  }

  if (interaction.commandName === "roast") {
    const target = interaction.options.getUser("target");

    if (!target) {
      return interaction.reply(getRoast());
    }

    if (!optedIn.has(target.id)) {
      return interaction.reply(`They didn’t opt in, so you get roasted instead.
${getRoast()}`);
    }

    return interaction.reply(`${target}: ${getRoast()}`);
  }
});

client.login(process.env.TOKEN);
