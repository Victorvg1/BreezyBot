const fs = require('fs');

module.exports = (client, discord, message, arguments) => {
    fs.readdir("./commands/", (err, files) => {

        if (err) console.log(err);

        var jsFiles = files.filter(f => f.split(".").pop() === "js");

        if (jsFiles.length <= 0) {
            console.log("Kon geen files vinden");
            return;
        }

        jsFiles.forEach((f, i) => {

            var fileGet = require(`../commands/${f}`);


            client.commands.set(fileGet.help.name, fileGet);
            fileGet.help.aliases.forEach(alias => {
                client.aliases.set(alias, fileGet.help.name);
            });
        })
    })
}
