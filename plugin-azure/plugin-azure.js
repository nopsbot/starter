var pluginAzure = function () {
    var builder = require('botbuilder');
    var settings = {
        luisModelUrl: "https://api.projectoxford.ai/luis/v1/application?id=2a0d5057-2904-4ce1-bc90-d51177cc7a3c&subscription-key=d59ea1bf908f4ae29313e70b05ae78c9"
    };
    var recognizer = new builder.LuisRecognizer(settings.luisModelUrl);

    var configure = function (intents) {
        intents.matches('StopVm', [
            function (session, args, next) {
                var name = builder.EntityRecognizer.findEntity(args.entities, 'Name');
                var resourceGroup = builder.EntityRecognizer.findEntity(args.entities, 'ResourceGroup');
                var payload = session.dialogData.payload = {
                    name: name ? name.entity : null,
                    resourceGroup: resourceGroup ? resourceGroup.entity : null
                }
                if (!payload.name) {
                    builder.Prompts.text(session, "which VM?");
                } else {
                    next();
                }
            },
            function (session, results, next) {
                var payload = session.dialogData.payload;
                if (results.response) {
                    payload.name = results.response;
                }

                if (payload.name && !payload.resourceGroup) {
                    builder.Prompts.text(session, "Resource Group?");
                } else {
                    next();
                }
            },
            function (session, results) {
                var payload = session.dialogData.payload;
                if (results.response) {
                    payload.resourceGroup = results.response;
                }

                if (payload.name && payload.resourceGroup) {
                    session.send('OK. name is ' + payload.name + ' resourceGroup is ' + payload.resourceGroup);
                }
            }
        ]);

        intents.onDefault(builder.DialogAction.send("I'm sorry. I didn't understand."));
    }

    return {
        configure: configure,
        getRecognizer: function () { return recognizer; }
    };
}

module.exports = pluginAzure;