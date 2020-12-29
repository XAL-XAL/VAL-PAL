require('dotenv').config();
const Discord = require ('discord.js');
const client = new Discord.Client();
const PREFIX = "*"

const request = require('request');
const cheerio = require('cheerio');
var countStats = 0;
var countRank = 0;
var countKDA = 0;

client.on('ready', () =>{
    console.log(`${client.user.tag} has logged in`);
    client.user.setActivity(`Your stats!`, { type: 'WATCHING' });
});


client.on('message', (message) =>{
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    
    const args = message.content.slice(PREFIX.length).trim().split(' ');
    const command = args.shift();

    
    if (command === 'stats'){
        try{
        countStats++;
        const [user_name, tag_number] = args.join(' ').split('#'); //Splitting argument Ex: XAL#XAL [XAL, XAL]
     
        
      if (!args.length) {
        return message.channel.send(`You didn't provide a username and tag, ${message.author}!`);
    }
    
    console.log(`Command name: ${command}\nArgument(s): ${args}`)
    console.log(user_name);
    console.log(tag_number);
    console.log("\n");

    request(`https://tracker.gg/valorant/profile/riot/${encodeURI(user_name)}%23${encodeURI(tag_number)}/overview?playlist=competitive`, function(err, resp, body){
        if(!err && resp.statusCode == 200)
        {
             const $ = cheerio.load(body); 
            
             //GET RANK
            const rank = $('.valorant-rank-icon').attr('src');

            //GET STATS
            var stats = [];
            $('.numbers').each((i, el) =>{ // for each 'i' in each 'element'
                const item = $(el).text();
                stats.push(item); //Push each stat into array element
            });

            //GET TOP 3 AGENTS
            var agents = [];
            $('.agent__name').each((i, el) =>{ // for each 'i' in each 'element'
            const agent = $(el).text();
            agents.push(agent); //Push each stat into array element
        });


            
        const printStats = new Discord.MessageEmbed()    
            .setTitle('RANK') //RANK
            .setDescription($('.valorant-highlighted-stat__value').first().text().toUpperCase()) //RANK NAME
            .setAuthor( $('.trn-ign__username').first().text() + $('.trn-ign__discriminator').first().text(),//USERNAME & TAG
             'https://files.cults3d.com/uploaders/15024335/illustration-file/a86d53e4-2bd9-4a8f-9550-986686c3131a/gi0mAjIh_400x400_large.png') //VALORANT LOGO
            .setThumbnail($('.valorant-rank-icon').first().attr('src'))//RANK ICON

            
            //DISPLAY ALL STATS
                 for (const stat of $('.numbers').toArray()) 
                {
                    printStats.fields.push({ name: $(stat).children('.name').text(), value: $(stat).children('.value').text(), inline: true })
                }
                
           //DISPLAY TOP AGENT
            switch(agents[0]){
             case "Breach":
             printStats.setImage('https://i.imgur.com/TiB6rB7.png').setColor('#FF8633')
                 break;
            
             case "Brimstone":
             printStats.setImage('https://i.imgur.com/QDftK5L.png').setColor('#6C2F05')
                break;

             case "Cypher":
             printStats.setImage('https://i.imgur.com/xV2kRai.png').setColor('#C0B8B2')
                break;
            
             case "Jett":
             printStats.setImage('https://i.imgur.com/lST9Ufw.png').setColor('#00D1FF')
                break;
            
             case "Killjoy":
             printStats.setImage('https://i.imgur.com/sK6cCmG.png').setColor('#FFFF00')
                break;
            
             case "Omen":
             printStats.setImage('https://i.imgur.com/UKXLu6G.png').setColor('#6C00FF')
                break;

            case "Phoenix":
             printStats.setImage('https://i.imgur.com/laPBZW2.png').setColor('#FF5D00')
                 break;
            
             case "Raze":
             printStats.setImage('https://i.imgur.com/T0KEwrQ.png').setColor('#FF6800')
                break;

             case "Reyna":
             printStats.setImage('https://i.imgur.com/IYdtD48.png').setColor('#AE00FF')
                break;
            
             case "Sage":
             printStats.setImage('https://i.imgur.com/UPm3i3V.png').setColor('#06EC9F')
                break;
            
             case "Skye":
             printStats.setImage('https://i.imgur.com/Lx1EfBU.png').setColor('#0DDF40')
                break;
            
             case "Sova":
             printStats.setImage('https://i.imgur.com/GH2xy0A.png').setColor('#064DFC')
                break;

            case "Viper":
             printStats.setImage('https://i.imgur.com/cIQmfHs.png').setColor('#06FC2B')
                break;
            }
            
            
            printStats.setTimestamp()
	        .setFooter('BOT INVITES ARE CAPPED! READ HELP!' , 'https://lh5.googleusercontent.com/7j8XeYBmyh2FbnYNmr3Ktenb8iYwj1_ZmT-RBq_DpGOG0_gN2X8K26MGqjL8WxxLyznyyD4j=w1280');//XAL LOGO
            
            
            message.channel.send(printStats);//Print Embed
            
        }
        else    
        message.reply('Your profile is private. Please use *help to resolve this issue');

    });
    }
    catch{
        message.reply("something went wrong(devs will look into this)");
        console.log("something went wrong(devs will look into this)");
    }
}
//---------------------------------------------------------------------------------------------------------------------
    else if(command === "help"){// *help command

    const printHelp = new Discord.MessageEmbed()
    
    .setColor('#0099ff')
	.setTitle('How to use VAL PAL')
	//.setURL('https://discord.js.org/')
	.setAuthor('*help', 'https://files.cults3d.com/uploaders/15024335/illustration-file/a86d53e4-2bd9-4a8f-9550-986686c3131a/gi0mAjIh_400x400_large.png')
    .setDescription(`In order for this BOT to access and display your stats...
     1. Go to https://tracker.gg/valorant,

     2. Search for your profile,

     3. Check the acknowledgment and sign in with your Riot ID

     4. Authorize your account for public access

     5. MAKE SURE THE BOT HAS THE PERMS IT ASKS FOR!!!
     ---------------------------------------------------------------------`)

	.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/200px-Question_mark_%28black%29.svg.png')

    .addFields(
       // { name: '\u200B', value: '\u200B' },
        { name: ':robot:  BOT Commands', value: '\u200B' },
        { name: '*stats Name#Tag', value: 'Displays All Competitive Stats and TOP AGENT', inline: true },
        { name: '*rank Name#Tag',  value: 'Displays Rank', inline: true },
        { name: '*kda Name#Tag',   value: 'Displays K/DA info', inline: true },
        { name: '*countStats',  value: 'See how many times players checked their stats!', inline: true },
        { name: '*servers',  value: 'See how many servers VAL PAL is serving!', inline: true },
        { name: '*invite',  value: 'Get an invite link for this BOT!', inline: true },
        { name: '*help',  value: 'Displays BOT Commands', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: ':warning:  Ongoing fixes', value: `I HAVE REACHED A CAP OF 250 SERVERS FOR THIS BOT. THE SUPPORT AND REQUESTS FOR THIS BOT ARE INSANE AND VERY APPRECIATED.
                UNFORTUNATELY, I WILL HAVE TO WAIT A COUPLE WEEKS BEFORE DISCORD OPENS UP MORE SERVER SLOTS FOR YOU GUYS. PLEASE LET EVERYONE KNOW. I WILL TRY AND KEEP YOU ALL UPDATED.
                  FOR THOSE OF YOU WHO HAVE THE BOT, THANK YOU FOR THE TREMENDOUS SUPPORT. ONCE DISCORD GETS BACK TO ME I WILL NOTIFY ALL OF YOU OF OPEN SLOTS!! THANK YOU GUYS SO MUCH` },
        { name: '\u200B', value: '\u200B' }
	    )
//	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Please contact XAL#7777 if there any other issues ', 'https://lh5.googleusercontent.com/7j8XeYBmyh2FbnYNmr3Ktenb8iYwj1_ZmT-RBq_DpGOG0_gN2X8K26MGqjL8WxxLyznyyD4j=w1280');

    message.channel.send(printHelp);

    }

//-------------------------------------------------------------------------------------------------------------------
    else if(command === "rank"){
        try{
            countRank++;
            const [user_name, tag_number] = args.join(' ').split('#'); //Splitting argument Ex: XAL#XAL [XAL, XAL]

            if (!args.length) {
                return message.channel.send(`You didn't provide a username and tag, ${message.author}!`);
            }
            
        console.log(`Command name: ${command}\nArgument(s): ${args}`)
        console.log(user_name);
        console.log(tag_number);

    request(`https://tracker.gg/valorant/profile/riot/${user_name}%23${tag_number}/overview?playlist=competitive`, function(err, resp, body){
        if(!err && resp.statusCode == 200)
        {
             const $ = cheerio.load(body); 
            
             //GET RANK
            const rank = $('.valorant-rank-icon').attr('src');
    
            const printRank = new Discord.MessageEmbed()
            .setTitle('RANK') //RANK
            .setDescription($('.valorant-highlighted-stat__value').first().text().toUpperCase()) //RANK NAME
            .setAuthor( $('.trn-ign__username').first().text() + $('.trn-ign__discriminator').first().text(),//USERNAME & TAG
             'https://files.cults3d.com/uploaders/15024335/illustration-file/a86d53e4-2bd9-4a8f-9550-986686c3131a/gi0mAjIh_400x400_large.png') //VALORANT LOGO
            .setThumbnail($('.valorant-rank-icon').first().attr('src'))//RANK ICON

            printRank.setTimestamp()
            .setFooter('BOT INVITES ARE CAPPED! READ HELP!' , 'https://lh5.googleusercontent.com/7j8XeYBmyh2FbnYNmr3Ktenb8iYwj1_ZmT-RBq_DpGOG0_gN2X8K26MGqjL8WxxLyznyyD4j=w1280');//XAL LOGO
            message.channel.send(printRank);
    
        }
        else
        message.reply('Your profile is private. Please use *help to resolve this issue');
    });
    }
    catch{
        message.reply("something went wrong(devs will look into this)");
        console.log("something went wrong(devs will look into this)");
    }
}
//-------------------------------------------------------------------------------------------------------------------
    else if(command === "kda"){
        try{
            countKDA++;
            const [user_name, tag_number] = args.join(' ').split('#'); //Splitting argument Ex: XAL#XAL [XAL, XAL]
     
        
      if (!args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    
    console.log(`Command name: ${command}\nArgument(s): ${args}`)
    console.log(user_name);
    console.log(tag_number);
    console.log("\n");

    request(`https://tracker.gg/valorant/profile/riot/${user_name}%23${tag_number}/overview?playlist=competitive`, function(err, resp, body){
        if(!err && resp.statusCode == 200)
        {
             const $ = cheerio.load(body); 
            
             //GET RANK
            const rank = $('.valorant-rank-icon').attr('src');

            //GET STATS
            var stats = [];
            $('.numbers').each((i, el) =>{ // for each 'i' in each 'element'
                const item = $(el).text();
                stats.push(item); //Push each stat into array element
            });

            const printKDA = new Discord.MessageEmbed()
            .setTitle('RANK') //RANK
            .setDescription($('.valorant-highlighted-stat__value').first().text().toUpperCase()) //RANK NAME
            .setAuthor( $('.trn-ign__username').first().text() + $('.trn-ign__discriminator').first().text(),//USERNAME & TAG
             'https://files.cults3d.com/uploaders/15024335/illustration-file/a86d53e4-2bd9-4a8f-9550-986686c3131a/gi0mAjIh_400x400_large.png') //VALORANT LOGO
            .setThumbnail($('.valorant-rank-icon').first().attr('src'))//RANK ICON
            .addFields(
                 { name: '\u200B', value: '\u200B' },
                 { name: 'K/D Ratio', value: stats[1] },
                 { name: 'Kills', value: stats[5], inline: true },
                 { name: 'Deaths', value: stats[7], inline: true },
                 { name: 'Assists', value: stats[8], inline: true },
                 { name: '\u200B', value: '\u200B' }
                 )

                 printKDA.setTimestamp()
                 .setFooter('BOT INVITES ARE CAPPED! READ *HELP !' , 'https://lh5.googleusercontent.com/7j8XeYBmyh2FbnYNmr3Ktenb8iYwj1_ZmT-RBq_DpGOG0_gN2X8K26MGqjL8WxxLyznyyD4j=w1280');//XAL LOGO
                
                 message.channel.send(printKDA);


        }
        else
        message.reply('Your profile is private. Please use *help to resolve this issue');
    });
    }
    catch{
        message.reply("something went wrong(devs will look into this)");
        console.log("something went wrong(devs will look into this)");
    }
}


//-------------------------------------------------------------------------------------------------------------------
else if(command === "about"){

    const printAbout = new Discord.MessageEmbed()
    
    .setColor('#0099ff')
	.setTitle('About VAL PAL and the Developers')
	.setURL('https://discord.gg/46XQpv78')
	.setAuthor('*about', 'https://files.cults3d.com/uploaders/15024335/illustration-file/a86d53e4-2bd9-4a8f-9550-986686c3131a/gi0mAjIh_400x400_large.png')
    .setDescription(`VAL PAL was created by XAL#7777 with an insane amount of help from my friend jtsshieh. After constantly opening up a web browser
    to check my stats and screenshot it to show my friends, I decided that I wanted to create a bot where stats would be easily accessible and sharable to your Discord friends. And this is the result!
     This is the first bot I have ever created so there might be
    a couple bumps and hiccups along the road. Feel free to criticize it and let me know what you think!

    Here is a link to the VAL PAL Discord: https://discord.gg/46XQpv78
    - XAL `)
	.setThumbnail('https://i.imgur.com/JOB50TZ.jpg')
	.setTimestamp()
	.setFooter('Please contact XAL#7777 if there any other issues ', 'https://lh5.googleusercontent.com/7j8XeYBmyh2FbnYNmr3Ktenb8iYwj1_ZmT-RBq_DpGOG0_gN2X8K26MGqjL8WxxLyznyyD4j=w1280');

    message.channel.send(printAbout);
}
//-------------------------------------------------------------------------------------------------------------------

else if(command === "countStats")
{
    message.channel.send("The stats command has been used " + countStats + " times since the last update!");
}
//-------------------------------------------------------------------------------------------------------------------
else if(command === "countRank")
{
    message.channel.send("The stats command has been used " + countRank + " times since the last update!");
}
//-------------------------------------------------------------------------------------------------------------------
else if(command === "countKDA")
{
    message.channel.send("The stats command has been used " + countKDA + " times since the last update!");
}
//-------------------------------------------------------------------------------------------------------------------
else if(command === "invite")
{
    message.reply("Here is your invite link: https://discord.com/oauth2/authorize?client_id=789320714955522068&scope=bot&permissions=183296")
}
//-------------------------------------------------------------------------------------------------------------------
else if(command === "servers")
{
    message.channel.send(`This bot is currently serving ${client.guilds.cache.size} servers! MAX CAPACITY!! Will update you guys when more server slots are availiable :)`);
}
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
else if (command === "checkservers"){
    let serverlist = ''
    client.guilds.cache.forEach((guild) => {
        serverlist = serverlist.concat(" - " + guild.name + ": ID: " + guild.id + "\n")
    });
        console.log(serverlist);
}
//-------------------------------------------------------------------------------------------------------------------
else{
    message.reply("That is an invalid command");
 }

});

client.login(process.env.DISCORDJS_BOT_TOKEN);
