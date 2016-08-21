var builder = require('botbuilder');
var connector = new builder.ConsoleConnector();
var bot = new builder.UniversalBot(connector.listen());
var azurePlugin = require('./plugin-azure/plugin-azure.js')()
var azureRecognizer = azurePlugin.getRecognizer();
//var awsRecognizer = awsPlugin.getRecognizer();
var intents = new builder.IntentDialog({ recognizers: [azureRecognizer/* ,awsRecognizer */] });
azurePlugin.configure(intents);
//awsplugin.configure(intents);
bot.dialog('/',intents);