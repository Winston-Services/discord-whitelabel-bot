# Winston discord-whitelabel-bot
Create a Discord bot in minutes with Winston Whitelabel bot Wrapper.


## How to use

## Example 

```JavaScript

const wait = require("node:timers/promises").setTimeout;
const {
  GatewayIntentBits,
  SlashCommandBuilder,
  Collection,
  Routes,
} = require("discord.js");

const botCommands = [
  {
    type: undefined, // 1 | 2 | 3
    application_id: "",
    guild_id: undefined,
    name: "ping",
    description: "ping pong!",
    options: undefined,
    dm_permission: null,
    default_permission: null,
    exec: async (interaction) => {
      if (interaction.commandName === "ping") {
        await interaction.reply({ content: "Pong!", ephemeral: true });
        await wait(2000);
        await interaction.editReply("Pong again!");
      }
    },
  },];


const { WinstonDiscordConnect } = require("./WinstonDiscordConnect");

const testOptions = {
  applicationId: "",
  token: "", //discord access token
};

WinstonDiscordConnect.instance.options = testOptions;
WinstonDiscordConnect.instance.intents = [
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.GuildInvites,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildScheduledEvents,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildWebhooks,
];
WinstonDiscordConnect.instance.login();

WinstonDiscordConnect.instance.on("ready", async () => {
  console.log("Started Bot.");
  console.log(
    "Started Client ID : ",
    "992899086195892305",
    WinstonDiscordConnect.instance.client.application.id
  );
  
  const globalCommands = new Collection();
  const guildCommands = new Collection();
  
  for (const interaction of botCommands) {
    const structuredCommand = new SlashCommandBuilder();
    structuredCommand.name = interaction.name;
    structuredCommand.description = interaction.description;
    structuredCommand.setDMPermission(interaction.dm_permission);
    structuredCommand.setDefaultMemberPermissions(interaction.default_permission);

    if (interaction.commands) {
      try {
        WinstonDiscordConnect.instance.commandBuilder(
          structuredCommand,
          interaction.commands
        );
      } catch (error) {
        console.error(error);
        throw Error("Command Initialization Error.");
      }
    }
    if (interaction.options) {
      try {
        WinstonDiscordConnect.instance.optionBuilder(
          structuredCommand,
          interaction.options
        );
      } catch (error) {
        console.error(error);
        throw Error("Command Option Initialization Error.");
      }
    }
    if (interaction.guild_id) {
      guildCommands.set(interaction.name, structuredCommand);
    } else {
      globalCommands.set(interaction.name, structuredCommand);
    }
  }
  // console.log(guildCommands.values());
  await WinstonDiscordConnect.instance.client.rest.put(
    Routes.applicationGuildCommands(
      WinstonDiscordConnect.instance.client.application.id,
      "897546129108008960"
    ),
    { body: guildCommands.mapValues((c) => c.toJSON()) }
  );
  await WinstonDiscordConnect.instance.client.rest.put(
    Routes.applicationCommands(
      WinstonDiscordConnect.instance.client.application.id
    ),
    { body: globalCommands.mapValues((c) => c.toJSON()) }
  );
});

WinstonDiscordConnect.instance.on("interactionCreate", async (interaction) => {
  console.log("Interaction Started : ", interaction.commandName);
  const command = botCommands.find(
    (command) => command.name === interaction.commandName
  );
  console.log("Interaction Found : ", command.name);
  if (command.exec) return command.exec(interaction);
  await interaction.reply(
    "Slash command interations are being developed. Please be patient."
  );
});

WinstonDiscordConnect.instance.on("messageCreate", async (interaction) => {
  console.log(interaction);
});

WinstonDiscordConnect.instance.on("guildMemberAdd", async (interaction) => {
  console.log(interaction);
});

WinstonDiscordConnect.instance.on("guildMemberRemove", async (interaction) => {
  console.log(interaction);
});

WinstonDiscordConnect.instance.on(
  "guildIntegrationsUpdate",
  async (interaction) => {
    console.log(interaction);
  }
);

WinstonDiscordConnect.instance.on("error", async (interaction) => {
  console.log(interaction);
});

WinstonDiscordConnect.instance.on("disconnect", async (interaction) => {
  console.log(interaction);
});

```
