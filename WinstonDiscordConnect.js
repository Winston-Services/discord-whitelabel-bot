const moment = require("moment");
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
} = require("discord.js");

class WinstonDiscordConnect {
  _options = {
    applicationId: "",
    token: "", //discord access token
  };
  _name = "Whitelabel Winston";
  _partials = ["CHANNEL"];
  _intents = new IntentsBitField();
  _client = new Client({ partials: this._partials, intents: this._intents });
  _messageHandler = {};
  static _instance = new WinstonDiscordConnect();
  _guildId = "";
  _channelId = "";
  get options() {
    return this._options;
  }

  set options(value) {
    this._options = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get client() {
    return this._client;
  }

  set client(value) {
    this._client = value;
  }

  get partials() {
    return this._partials;
  }
  set partials(value) {
    this._partials = value;
  }

  get intents() {
    return this._intents;
  }

  set intents(value) {
    const botIntents = new IntentsBitField();
    botIntents.add(...value);
    this._intents = botIntents;
  }

  addIntent(value) {
    this._intents.add(value);
  }

  get guildId() {
    return this._guildId;
  }

  set guildId(value) {
    this._guildId = value;
  }

  get messageHandler() {
    return this._messageHandler;
  }

  set messageHandler(value) {
    this._messageHandler = value;
  }

  static get instance() {
    return WinstonDiscordConnect._instance;
  }

  static set instance(value) {
    WinstonDiscordConnect._instance = value;
  }

  login = () => {
    this.client.login(this.options.token);
  };
  once = async (event, cb) => {
    this.client.once(event, cb);
  };
  on = async (event, cb) => {
    this.client.on(event, cb);
  };
  setBotPresence(presence) {
    this.client.user.setPresence(presence);
  }
  setBotStatus(status) {
    this.client.user.setStatus(status);
  }

  setBotUsername() {
    this.client.user.setUsername(username);
  }

  setBotActivity(activity) {
    this.client.user.setActivity(activity);
  }

  async setNickname(gid, nickname, uid = null) {
    const guild = await this.client.guilds.fetch(gid);
    let m;
    if (!uid) m = await guild.members.fetch(this.client.user.id);
    else m = await guild.members.fetch(uid);
    await m.setNickname(nickname);
  }
  buildEmbed({
    author,
    color,
    title,
    description,
    fields,
    image,
    thumbnail,
    url,
  }) {
    const embed = new EmbedBuilder();
    if (author) embed.setAuthor(author);
    if (color) embed.setColor(color);
    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (fields) embed.setFields(fields);
    if (image) embed.setImage(image);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (url) embed.setURL(url);
    return embed;
  }
  
  sendAsEmbed({ embeds }) {
    this.messageHandler.send({ embeds });
  }
  sendAsText(text) {
    this.messageHandler.send(text);
  }
  replyAsEmbed({ embeds }) {
    this.messageHandler.reply({ embeds });
  }
  replyAsText(text) {
    this.messageHandler.reply(text);
  }

  sendAuthorAsEmbed({ embeds }) {
    this.messageHandler.author.send({ embeds });
  }
  sendAuthorAsText(text) {
    this.messageHandler.author.send(text);
  }

  replyAuthorAsEmbed({ embeds }) {
    this.messageHandler.author.reply({ embeds });
  }
  replyAuthorAsText(text) {
    this.messageHandler.author.reply(text);
  }
  commandBuilder(builder, commandArray) {
    let current = commandArray.shift();
    builder.addSubcommand((subcommand) => {
      subcommand.setName(current.name);
      subcommand.setDescription(current.description);
      if(current.options?.length) {
        this.optionBuilder(subcommand, current.options);
      }
      return subcommand;
    });
    if (commandArray.length) return this.commandBuilder(builder, commandArray);
  }
  optionBuilder(command, options) {
    const current = options.shift();
    if(current.type === 'StringOption')
    command.addStringOption((option) => {
      option.setName(current.name);
      option.setDescription(current.description);
      if(current.required) {
        option.setRequired(current.required);
      }
      return option;
    });
    if(current.type === 'NumberOption')
    command.addNumberOption((option) => {
      option.setName(current.name);
      option.setDescription(current.description);
      if(current.required) {
        option.setRequired(current.required);
      }
      return option;
    });
    if(current.type === 'UserOption')
    command.addUserOption((option) => {
      option.setName(current.name);
      option.setDescription(current.description);
      if(current.required) {
        option.setRequired(current.required);
      }
      return option;
    });
    if(current.type === 'BooleanOption')
    command.addBooleanOption((option) => {
      option.setName(current.name);
      option.setDescription(current.description);
      if(current.required) {
        option.setRequired(current.required);
      }
      return option;
    });
    if(current.type === 'RoleOption')
    command.addRoleOption((option) => {
      option.setName(current.name);
      option.setDescription(current.description);
      if(current.required) {
        option.setRequired(current.required);
      }
      return option;
    });
  }
}

module.exports = { WinstonDiscordConnect };
