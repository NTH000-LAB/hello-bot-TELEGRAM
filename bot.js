require("dotenv").config();
const { Telegraf } = require("telegraf");

// Vérifie que ton BOT_TOKEN est correct dans .env
if (!process.env.BOT_TOKEN) {
  console.error("❌ Erreur : BOT_TOKEN manquant dans le fichier .env");
  process.exit(1);
}

const bot = new Telegraf(process.env.BOT_TOKEN);

// Commande /start
bot.start((ctx) => {
  ctx.reply(
    "👋 Bonjour ! Je suis un bot Telegram minimaliste.\n" +
    "Je peux te saluer et te présenter mes commandes.\n" +
    "Tape /help pour voir ce que je sais faire."
  );
});

// Commande /hello
bot.command("hello", (ctx) => {
  ctx.reply("Bonjour à toi ! 😄");
});

// Commande /help
bot.command("help", (ctx) => {
  ctx.reply(
    "📌 Commandes disponibles :\n" +
    "/start - Présentation du bot\n" +
    "/hello - Je te salue\n" +
    "/help - Affiche cette aide"
  );
});

// Répond à tout autre message
bot.on("text", (ctx) => {
  ctx.reply("Je suis un bot minimaliste. Tape /help pour voir mes commandes !");
});

// Lancer le bot
bot.launch()
  .then(() => console.log("🤖 Bot lancé avec succès !"))
  .catch((err) => console.error("❌ Erreur lors du lancement :", err));

// Arrêt propre du bot avec CTRL+C
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
