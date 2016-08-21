var payload = {
    name: null,
    resourceGroup: "rg1"
}

payload.forEach(function (parameter) {
    if (!parameter){
        builder.Prompts.text(session, "which "+parameter+"?");

    }
});

AzureRM.createVM(payload);