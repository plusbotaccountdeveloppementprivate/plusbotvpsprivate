const Discord = require ('discord.js');
const low = require ('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json')
const db = low(adapter);

db.defaults({ bug:[], xp:[]})
    .write();

var bot = new Discord.Client();
var prefix = ("p.");
var randnum = 0;

bot.on('ready',() =>{
    
    var memberNumber = bot.users.size;
    var serverNumber = bot.guilds.size;
    
    function jeux() {
        
        
          var answers = ['p.help by ZrefiXiord', 'Désoler des incidents', `être sur ${serverNumber} serveurs`, `avec ${memberNumber} membres`];
        
        
            return answers[Math.floor(Math.random()*answers.length)];
        }
        
        setInterval(() => {
        bot.user.setGame(jeux())     }, 10000) 
    
    
    console.log("Le bot est prêt");
    console.log("PlusBot online\nNombre de serveurs: " + serverNumber + "\navec\n" + memberNumber + " utilisateurs");    
});

bot.login(process.env.TOKEN);

bot.on("guildMemberAdd", member => {
const channel = member.guild.channels.find('name', 'bienvenue');
if(!channel) {
return;
}
channel.send(`**${member.user.username}** a rejoint ${member.guild.name}`);
});
bot.on("guildMemberRemove", member => {
const channel = member.guild.channels.find('name', 'bienvenue');
if(!channel) {
return;
}
channel.send(`**${member.user.username}** a quitté ${member.guild.name}`);
});

bot.on('message', message => {
 
    if (message.content === prefix + "bonjour"){
        message.reply("aurevoir");
        console.log('bonjouraurevoir');
    }
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            .setTitle('Liste des commandes')
            .setColor('#F40101')
            .addField("Commandes utiles", "p.help : pour afficher la liste des commandes\np.bonjour : pour que le bot te dises au revoir\np.avatar : pour qu'il envoie le lien de ton avatar\np.ping : pour savoir le ping du bot \np.cv : il te diras son humeur !\np.bug pour envoyer le bug que tu as vu")
            .addField("Administration", "p.kick + [mention] pour kicker la personne mentionné . Vous devez avoir les permissions.\np.ban + [mention] pour ban la personne mentionné nécessaires . Vous devez avoir les permissions nécessaires.\nLes messages de bienvenues et d'au revoir s'envoie dans un channel se nommant : `bienvenue` donc créer un channel `bienvenue`")
            .addField("Créateur du bot seulement", "p.status [idle,dnd] pour changer le statut du bot")
            .addField("Divers", "p.onme : pour tout savoir sur moi")
            .setFooter("Bot by ZrefiXiord")
        message.channel.sendEmbed(help_embed)
        console.log("help demandé");
    }
    if (message.content === prefix + "onme"){
        var onme_embed = new Discord.RichEmbed()
            .setTitle('Tout savoir sur moi')
            .setColor('#00E910')
            .addField("Sur moi", "Pour m'ajouter à ton serveur discord : https://discordapp.com/oauth2/authorize?client_id=374622953834283028&scope=bot&permissions=201354310 \nPour venir faire un tour sur mon serveur discord : https://discord.gg/2Ab5856 \nJe suis développé en node.js")
            .setFooter("Je suis développé par ZrefiXiord#3677")
        message.channel.sendEmbed(onme_embed)
        console.log("onme envoye");
    }
    if (message.content === prefix + "avatar"){
        message.reply(message.author.avatarURL);
        console.log('avatar effectué')
    }
    if (message.content === prefix + "ping"){
        message.reply("Mon ping est de " + bot.ping + "ms  :ping_pong:")
        console.log("ping envoyé")
    }
    if (message.content === prefix + "status idle") {
        
             if(message.author.id == "317603352592777227"){
        
                bot.user.setStatus("idle")
                message.reply("Mon cher maître , j'ai mis mon statut en idle")
                console.log('idle ');
        
            } else {
        
              message.channel.send("**Petit fou** ! Tu n'es pas l'owner")
        
            }
          }
          if (message.content === prefix + "status dnd") {
            
                 if(message.author.id == "317603352592777227"){
            
                    bot.user.setStatus("dnd")
                    message.reply("Mon cher maître , je mis mon statut en dnd")
                    console.log('dnd');
            
                } else {
            
                  message.channel.send("**Petit fou** ! Tu n'es pas l'owner")
            
                }
              }
    if (message.content === prefix + "cv"){
        random();

        if (randnum == 0){
            message.reply("Je vais mal , c'est à cause de toi ! ;:;");
            console.log('cv r0')
        }

        if (randnum == 1){
            message.reply("Je vais bien !");
            console.log('cv r1');
        }

        if (randnum == 2){
            message.reply("TU TE SOUCIS DE MOI ? T'es gentil , je vais plutôt bien ! :p");
            console.log('cv r2');
        }
        if (randnum == 3){
            message.reply("Je vais moyennement bien ... ");
            console.log('cv r3');
        }
    }
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(' ');

    switch (args[0].toLowerCase()){
        case "bug":
        var value = message.content.substr(5);
        var author = message.author.id;
        var number = db.get('bug').map('id').value();
        console.log(value);
        message.reply("Ah ! Tu as trouvé un bug merci de l'avoir signalé !")
        
        db.get('bug')
            .push({ id: number + 1, story_value: value, story_author: author})
            .write();

        break;

        case "kick":

        if(!message.channel.permissionsFor(message.author).hasPermission("KICK_MEMBERS")){
            message.reply("Tu n'as pas le droit de kick des gens u.u !")
        }else{
            var member = message.mentions.members.first();
            if(!member){
                message.reply("L'utilisateur est introuvable , sorry !");
            }else{
                if(!member.kickable){
                    message.reply("Tu ne peux pas kick ton supérieur ! -.-");
                }else{
                    member.kick().then((member) => {
                    message.channel.send(`${member.displayName} a été kick ...`);
                    }).catch(() => {
                        message.channel.send("Kick refusé")
                    })
                }
            }
            }
        break;
        case "ban":
        
                if(!message.channel.permissionsFor(message.author).hasPermission("BAN_MEMBERS")){
                    message.reply("Tu n'as pas le droit de ban des gens u.u !")
                }else{
                    var member = message.mentions.members.first();
                    if(!member){
                        message.reply("L'utilisateur est introuvable , sorry !");
                    }else{
                        if(!member.bannable){
                            message.reply("Tu ne peux pas ban ton supérieur ! -.-");
                        }else{
                            member.ban().then((member) => {
                            message.channel.send(`${member.displayName} a été ban ...`);
                            }).catch(() => {
                                message.channel.send("Ban refusé")
                            })
                        }
                    }
                    }
                break;
    }
    
});


function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(3);
    randnum = Math.floor(Math.random() * (max - min +1) +min);
}
