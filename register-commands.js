import { REST, Routes, SlashCommandBuilder } from "discord.js";
import "dotenv/config";

const commands = [
  new SlashCommandBuilder()
    .setName("roast")
    .setDescription("Get a roast")
    .addUserOption(opt =>
      opt.setName("target").setDescription("Who to roast")),

  new SlashCommandBuilder()
    .setName("optin")
    .setDescription("Allow people to roast you"),

  new SlashCommandBuilder()
    .setName("optout")
    .setDescription("Stop people from roasting you")
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

async function deploy() {
  try {
    console.log("Deploying commands...");
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log("Commands deployed.");
  } catch (err) {
    console.error(err);
  }
}

deploy();
