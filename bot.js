const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const prefix = 'gt';
const ytpl = require('ytpl');
const ytdl = require('ytdl-core');
const talkedRecently = new Set();
const talkedRecentlyFds = new Set();
const talkedRecentlyJuuj = new Set();
const talkedRecentlyMattok = new Set();
const talkedRecentlyPrino = new Set();
const talkedRecentlySoriin = new Set();
const talkedRecentlyRafa = new Set();
const talkedRecentlyGabriel = new Set();
const cron = require('cron');
const { networkInterfaces } = require('os');
const { get } = require('http');
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const bomdia = new cron.CronJob('00 30 09 * * *', () => {
  const channel = client.channels.cache.get('689095691188043805')
  channel.send('BOM DIA GRUPOR! ☀ @everyone')
    .then(function (msg) {
      msg.react('☀')
    }).catch(function () {
      //Something
    });

}); // fires every day, at 09:30:00
const queue = new Map();
require('events').EventEmitter.defaultMaxListeners = 40;
require("dotenv").config();
client.login(process.env.TOKEN);

// -----+----- -----+----- -----+----- -----+----- -----+----- STATUS -----+----- -----+----- -----+----- -----+----- -----+-----

client.on('ready', () => {
  console.log(`Ta on pai ${client.user.tag}!`);
  // client.user.setPresence({ game: { name: 'Paciência spider' }, status: 'online' });
  client.user.setActivity('Sermão', { type: 'LISTENING' });
  bomdia.start();
});
client.on('reconnecting', () => {
  console.log('ME DERRUBARRAM AQUI!');
});
client.on('disconnect', () => {
  console.log('TA NA HORA DE DAR XAU!');
});
// -----+----- -----+----- -----+----- -----+----- -----+----- STATUS -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- MEMBER ADD/REMOVE -----+----- -----+----- -----+----- -----+----- -----+-----

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'check-in' || ch.name === 'geral-🌎');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Salve, ${member}`);
});

// // Create an event listener for new guild members
client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'check-in' || ch.name === 'geral-🌎');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Foi tarde, ${member}`);
});
// -----+----- -----+----- -----+----- -----+----- -----+----- MEMBER ADD/REMOVE -----+----- -----+----- -----+----- -----+----- -----+-----

// COLOCAR TODOS OS COMANDOS DENTRO DE UM UNICO  client.on('message', async msg => {

// -----+----- -----+----- -----+----- -----+----- -----+----- MUSICA -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', async msg => {

  // if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;


  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // if (msg.author.bot) return;

  const serverQueue = queue.get(msg.guild.id);

  if (command === 'play') {
    execute(msg, serverQueue);
    return;
  }
  if (command === 'skip') {
    skip(msg, serverQueue);
    return;
  }
  if (command === 'stop') {
    stop(msg, serverQueue);
    return;
  }
  // else {
  //   msg.channel.send('Você precisa inserir um comando valido!');
  // }
});

async function execute(msg, serverQueue) {
  const args = msg.content.split(" ");
  let songInfo;
  let song;
  const voiceChannel = msg.member.voice.channel;
  if (!voiceChannel)
    return msg.channel.send(
      "Você precisa estar em um canal de voz para tocar uma musica!"
    );
  const permissions = voiceChannel.permissionsFor(msg.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return msg.channel.send(
      "Eu preciso de permissão para entrar no seu canal de voz!"
    );
  }
  if (msg.content.includes('https://www.youtube.com/playlist?list=')) {
    const id = msg.content.slice(45);
    ytpl(id).then(playlist => {
      const result = playlist.items.map(a => (

        a.shortUrl

      ));
      console.log(result, 'ARROMBADOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
      voiceChannel.join()
      // for (let i = 0; i < result.length; i++) {
      //   // setTimeout(() => {
      //   //   msg.channel.send('gtplay ' + result[i] );
      //   // }, 5000);
      //   delay(i)

      // }
      // function delay(i) {
      //   setTimeout(() => {
      //     msg.channel.send('gtplay ' + result[{i}] );}, 1000);
      // }
      const doSomething = async () => {
        for (let i = 0; i < result.length; i++) {
          await sleep(5000)
          msg.channel.send('gtplay ' + result[i]);
        }
      }

      doSomething()
      return
      //   song = result;

      //   if (!serverQueue) {
      //     const queueContruct = {
      //       textChannel: msg.channel,
      //       voiceChannel: voiceChannel,
      //       connection: null,
      //       songs: [],
      //       volume: 5,
      //       playing: true
      //     };

      //     console.log('TESTASTANSFAUSENFAISUEHBFUYIHAF #&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&¨%$¨$%#$%$#%', result)


      //     queue.set(msg.guild.id, queueContruct);

      //     queueContruct.songs = result

      //     try {
      //       var connection = voiceChannel.join();
      //       queueContruct.connection = connection;
      //       console.log('CONECTIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON', queueContruct.connection)
      //       play(msg.guild, queueContruct.songs[0]);
      //     } catch (err) {
      //       console.log(err);
      //       queue.delete(msg.guild.id);
      //       return msg.channel.send(err);
      //     }
      //   } else {
      //     serverQueue.songs = result;
      //     console.log('CONECTIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON', serverQueue.connection)

      //     return msg.channel.send(`${song.title} foi adicionada a fila!`);
      //   }

    }).catch(err => {
      console.error(err);
    });

  } else {
    songInfo = await ytdl.getInfo(args[1]);
    song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url
    };
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', song)

    console.log('TESTASTANSFAUSENFAISUEHBFUYIHAF #%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', song)

    if (!serverQueue) {
      const queueContruct = {
        textChannel: msg.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };

      console.log('TESTASTANSFAUSENFAISUEHBFUYIHAF ##########################', song)


      queue.set(msg.guild.id, queueContruct);

      queueContruct.songs.push(song)

      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;

        play(msg.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(msg.guild.id);
        return msg.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return msg.channel.send(`${song.title} foi adicionada a fila!`);
    }
  }
}

function skip(msg, serverQueue) {
  if (!msg.member.voice.channel)
    return msg.channel.send(
      "Você precisa estar em um canal de voz para pular a musica!"
    );
  if (!serverQueue)
    return msg.channel.send("Sem musica para pular!");
  serverQueue.connection.dispatcher.end();
}


function stop(msg, serverQueue) {
  if (!msg.member.voice.channel)
    return msg.channel.send(
      "Parando de reproduzir!"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      console.log(song.url);
      console.log(serverQueue.connection, 'SERASE APARECEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Tocando: **${song.title}**`);
}

// -----+----- -----+----- -----+----- -----+----- -----+----- MUSICA -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- API'S DE ANIMAIS-----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', async msg => {

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'cat') {
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

    msg.channel.send(file);
  }

  if (command === 'dog') {
    const { message } = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json());

    msg.channel.send(message);
  }
  if (command === 'corgi') {
    const { message } = await fetch('https://dog.ceo/api/breed/corgi/images/random').then(response => response.json());

    msg.channel.send(message);
  }

  if (command === 'duck') {
    const { url } = await fetch('https://random-d.uk/api/random').then(response => response.json());

    msg.channel.send(url);
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- API'S -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- API DE PREVISÃO DO TEMPO -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', async msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (command === 'clima') {
    const cidade = capitalizeFirstLetter(msg.content.slice(8));

    console.log(cidade);
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt_br&units=metric&APPID=566c2312c3571a3066ed6a8dd303fb3b`).then(response => response.json());
    console.log(response);

    // msg.channel.send(cidade + ': ' + response.weather[0].description + + ', a temperatura é de ' + response.main.temp.toString().slice(0, 2) +  '° com sensação térmica de ' + response.main.feels_like.toString().slice(0, 2) + '°.');


    var temperatura
    if (response.main.temp < 0) {
      temperatura = response.main.temp.toString().slice(0, 3).replace('.', '');

    } else if (response.main.temp >= 0 && response.main.temp < 10) {
      temperatura = response.main.temp.toString().slice(0, 2).replace('.', '');

    } else if (response.main.temp > 9) {
      temperatura = response.main.temp.toString().slice(0, 3).replace('.', '');

    }

    var min
    if (response.main.temp_min < 0) {
      min = response.main.temp_min.toString().slice(0, 3).replace('.', '');

    } else if (response.main.temp_min >= 0 && response.main.temp_min < 10) {
      min = response.main.temp_min.toString().slice(0, 2).replace('.', '');

    } else if (response.main.temp_min > 9) {
      min = response.main.temp_min.toString().slice(0, 3).replace('.', '');

    }

    var max
    if (response.main.temp_max < 0) {
      max = response.main.temp_max.toString().slice(0, 3).replace('.', '');

    } else if (response.main.temp_max >= 0 && response.main.temp_max < 10) {
      max = response.main.temp_max.toString().slice(0, 2).replace('.', '');

    } else if (response.main.temp_max > 9) {
      max = response.main.temp_max.toString().slice(0, 3).replace('.', '');

    }

    var feels
    if (response.main.feels_like < 0) {
      feels = response.main.feels_like.toString().slice(0, 3).replace('.', '');

    } else if (response.main.feels_like >= 0 && response.main.feels_like < 10) {
      feels = response.main.feels_like.toString().slice(0, 2).replace('.', '');

    } else if (response.main.feels_like > 9) {
      feels = response.main.feels_like.toString().slice(0, 3).replace('.', '');

    }

    var currentdate = new Date();
    var hora;
    var minuto;
    var tempo;

    if (response.timezone == -10800) {
      currentdate.setHours(currentdate.getHours());
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == -7200) {
      currentdate.setHours(currentdate.getHours() + 1);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == -3600) {
      currentdate.setHours(currentdate.getHours() + 2);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 0) {
      currentdate.setHours(currentdate.getHours() + 3);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 3600) {
      currentdate.setHours(currentdate.getHours() + 4);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 7200) {
      currentdate.setHours(currentdate.getHours() + 5);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 10800) {
      currentdate.setHours(currentdate.getHours() + 6);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 14400) {
      currentdate.setHours(currentdate.getHours() + 7);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 18000) {
      currentdate.setHours(currentdate.getHours() + 8);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 19800) {
      currentdate.setHours(currentdate.getHours() + 8);
      currentdate.setMinutes(currentdate.getMinutes() + 30);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 21600) {
      currentdate.setHours(currentdate.getHours() + 9);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 25200) {
      currentdate.setHours(currentdate.getHours() + 10);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 28800) {
      currentdate.setHours(currentdate.getHours() + 11);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 32400) {
      currentdate.setHours(currentdate.getHours() + 12);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 36000) {
      currentdate.setHours(currentdate.getHours() + 13);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 39600) {
      currentdate.setHours(currentdate.getHours() + 14);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 43200) {
      currentdate.setHours(currentdate.getHours() + 15);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 46800) {
      currentdate.setHours(currentdate.getHours() + 16);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == 50400) {
      currentdate.setHours(currentdate.getHours() + 17);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == -14400) {
      currentdate.setHours(currentdate.getHours() + 23);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == -18000) {
      currentdate.setHours(currentdate.getHours() + 22);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == -21600) {
      currentdate.setHours(currentdate.getHours() + 21);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == -25200) {
      currentdate.setHours(currentdate.getHours() + 20);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == -28800) {
      currentdate.setHours(currentdate.getHours() + 19);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == -32400) {
      currentdate.setHours(currentdate.getHours() + 18);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == -36000) {
      currentdate.setHours(currentdate.getHours() + 17);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    } else if (response.timezone == -39600) {
      currentdate.setHours(currentdate.getHours() + 16);
      hora = currentdate.getHours();
      minuto = currentdate.getMinutes();

      if (hora < 10) {
        hora = '0' + hora;

      }
      if (minuto < 10) {
        minuto = '0' + minuto;

      }

      tempo = hora + ':' + minuto;

    }

    var cor = ''

    if (response.weather[0].main === 'Clouds' && response.weather[0].description == 'algumas nuvens') {
      cor = '#f8ff2e'

    } else if (response.weather[0].main === 'Clouds' && response.weather[0].description == 'nuvens dispersas') {
      cor = '#f8ff2e'

    } else if (response.weather[0].main === 'Clouds') {
      cor = '#c7c7c7'

    } else if (response.weather[0].main === 'Clear' && hora > 5 && hora < 18) {
      cor = '#f8ff2e'

    } else if (response.weather[0].main === 'Clear') {
      cor = '#000000'

    } else if (response.weather[0].main === 'Thunderstorm') {
      cor = '#2b2b2b'

    } else if (response.weather[0].main === 'Rain') {
      cor = '#001157'

    } else if (response.weather[0].main === 'Drizzle') {
      cor = '#004bb5'

    } else if (response.weather[0].main === 'Snow') {
      cor = '#fcfcfc'

    }

    console.log(hora, 'HORAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    var gif = '';

    if (response.weather[0].main === 'Clouds' && response.weather[0].description == 'algumas nuvens' && hora > 5 && hora < 18) {
      gif = 'https://i.gifer.com/DM9.gif'

    } else if (response.weather[0].main === 'Clouds' && response.weather[0].description == 'algumas nuvens') {
      gif = 'https://i.pinimg.com/originals/8e/ef/14/8eef14e2ddc2b67af55e07961e570c7e.gif'

    } else if (response.weather[0].main === 'Clouds' && response.weather[0].description == 'nuvens dispersas' && hora > 5 && hora < 18) {
      gif = 'https://i.gifer.com/DM9.gif'

    } else if (response.weather[0].main === 'Clouds' && response.weather[0].description == 'nuvens dispersas') {
      gif = 'https://i.pinimg.com/originals/8e/ef/14/8eef14e2ddc2b67af55e07961e570c7e.gif'

    } else if (response.weather[0].main === 'Clouds' && hora > 5 && hora < 18) {
      gif = 'https://media1.tenor.com/images/76b9715af5ab9de56dd262b871dfc738/tenor.gif?itemid=4768563'

    } else if (response.weather[0].main === 'Clouds') {
      gif = 'https://i.pinimg.com/originals/81/70/7e/81707ecdf1a6ee67570f16b066ae3268.gif'

    } else if (response.weather[0].main === 'Clear' && hora > 5 && hora < 18) {
      gif = 'https://i.pinimg.com/originals/1b/db/fa/1bdbfa09a2b20fc92fb035ccd963df0e.gif'

    } else if (response.weather[0].main === 'Clear') {
      gif = 'https://i.imgur.com/QsQ4tSg.gif'

    } else if (response.weather[0].main === 'Thunderstorm' || response.weather[0].main === 'Squall') {
      gif = 'https://4.bp.blogspot.com/-RLxMKDbwlTI/WBTN_fTf2qI/AAAAAAAANXM/_nwzz5nltZkxCCxyZy7hT1ANjbQnABfdACLcB/s400/weather%2Bphenomena%2Bgif%2Blightning%2Bstrike%252C%2Bextreme%2Bthunderstorm.gif'

    } else if (response.weather[0].main === 'Rain') {
      gif = 'https://uploads.spiritfanfiction.com/fanfics/historias/202006/rain-days-jeonglix-19562759-090620200637.gif'

    } else if (response.weather[0].main === 'Drizzle') {
      gif = 'https://64.media.tumblr.com/5f969cbc97cb057ce192028144c578f5/tumblr_nt32quzRru1uckjo7o1_500.gif'

    } else if (response.weather[0].main === 'Snow') {
      gif = 'https://i.pinimg.com/originals/57/3b/68/573b688fbac605dde5807bf57b725bd5.gif'

    } else if (response.weather[0].main === 'Mist') {
      gif = 'https://i.pinimg.com/originals/02/8f/c0/028fc0f58b6d275812336e90c6ba4251.gif'

    } else if (response.weather[0].main === 'Smoke') {
      gif = 'https://thumbs.gfycat.com/InfantileEarnestArgentinehornedfrog-size_restricted.gif'

    } else if (response.weather[0].main === 'Haze' && response.weather[0].description == 'neblina') {
      gif = 'https://i.pinimg.com/originals/02/8f/c0/028fc0f58b6d275812336e90c6ba4251.gif'

    } else if (response.weather[0].main === 'Haze') {
      gif = 'https://i.makeagif.com/media/8-31-2016/3KHUii.gif'

    } else if (response.weather[0].main === 'Dust' || response.weather[0].main === 'Sand') {
      gif = 'https://media1.tenor.com/images/13e5bd4eddf990a275f30a0cc3c7a7c9/tenor.gif?itemid=9186467'

    } else if (response.weather[0].main === 'Fog') {
      gif = 'https://media1.tenor.com/images/43758ca10e8ed2e77e70969e63056bd0/tenor.gif?itemid=6214607'

    } else if (response.weather[0].main === 'Ash') {
      gif = 'https://i.pinimg.com/originals/b4/f4/ad/b4f4ada3a65b8e281cfe10beb83c9ae6.gif'

    } else if (response.weather[0].main === 'Tornado') {
      gif = 'https://media.giphy.com/media/MXvDhlmD0eB5qNvvjZ/giphy.gif'

    }


    const arrayImage = gif;
    const corImage = cor;
    const cidadeNome = response.name;
    const exampleEmbed = new Discord.MessageEmbed()

      .setColor(corImage)
      .setTitle(cidadeNome)
      .setDescription(capitalizeFirstLetter(response.weather[0].description))
      .addFields(
        {
          name: 'Temperatura:', value: temperatura
            + '° (Min: ' + min + '° -  Máx: '
            + max + '°)', inline: true
        },
        { name: 'Sensação Térmica:', value: feels + '°', inline: true },
        { name: 'Hora:', value: hora + ':' + minuto, inline: true }
      )
      .setImage(arrayImage)
      .setTimestamp()
    console.log(exampleEmbed);
    msg.channel.send(exampleEmbed)
      .then(function (msg) {

        if (response.weather[0].main === 'Clouds' && response.weather[0].description === 'algumas nuvens') {
          msg.react('🌥');

        } else if (response.weather[0].main === 'Clouds' && response.weather[0].description === 'nuvens dispersas') {
          msg.react('🌥');

        } else if (response.weather[0].main === 'Clouds') {
          msg.react('☁');

        } else if (response.weather[0].main === 'Clear') {
          msg.react('☀');

        } else if (response.weather[0].main === 'Thunderstorm') {
          msg.react('⛈');

        } else if (response.weather[0].main === 'Rain') {
          msg.react('🌧');

        } else if (response.weather[0].main === 'Drizzle') {
          msg.react('🌦');

        } else if (response.weather[0].main === 'Snow') {
          msg.react('❄');

        }
        if (response.weather[0].main === 'Rain') {
          msg.channel.send('<@645456403632488479>, chuva né. 🌧');

        }
      }).catch(function () {
        //Something
      });
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- API DE PREVISÃO DO TEMPO -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- MARILIA ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (talkedRecently.has(msg.author.id)) {
  } else {
    // the user can type the command ... your command code goes here :)
    if (msg.author.id === '689100496321118398') {
      msg.channel.send('OLHA A MARAAAAAAAILIAAAAAA! ');
    }
    // Adds the user to the set so that they can't talk for a minute
    talkedRecently.add(msg.author.id);
    const doSomething = async () => {
      await sleep(90000000)
      talkedRecently.delete(msg.author.id);
    }
    doSomething();
    return
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- MARILIA ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- JUUJ ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (talkedRecentlyJuuj.has(msg.author.id)) {
  } else {
    // the user can type the command ... your command code goes here :)
    if (msg.author.id === '645456403632488479') {
      msg.channel.send('Oi juuj! 👋🏼 <@645456403632488479> ');
    }
    // Adds the user to the set so that they can't talk for a minute
    talkedRecentlyJuuj.add(msg.author.id);
    const doSomething = async () => {
      await sleep(90000000)
      talkedRecentlyJuuj.delete(msg.author.id);
    }
    doSomething();
    return
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- JUUJ ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- MATTOK ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (talkedRecentlyMattok.has(msg.author.id)) {
  } else {
    // the user can type the command ... your command code goes here :)
    if (msg.author.id === '107921995953393664') {
      msg.channel.send('AOBA Macarronada! 😎 <@107921995953393664> ');
    }
    // Adds the user to the set so that they can't talk for a minute
    talkedRecentlyMattok.add(msg.author.id);
    const doSomething = async () => {
      await sleep(90000000)
      talkedRecentlyMattok.delete(msg.author.id);
    }
    doSomething();
    return
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- MATTOK ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- LUCAS ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (talkedRecentlyPrino.has(msg.author.id)) {
  } else {
    // the user can type the command ... your command code goes here :)
    if (msg.author.id === '713360781688963113') {
      msg.channel.send('E ae Prino, quanto ta o bolo? 🍰 <@713360781688963113> ');
    }
    // Adds the user to the set so that they can't talk for a minute
    talkedRecentlyPrino.add(msg.author.id);
    const doSomething = async () => {
      await sleep(90000000)
      talkedRecentlyPrino.delete(msg.author.id);
    }
    doSomething();
    return
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- LUCAS ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- SORIIN ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (talkedRecentlySoriin.has(msg.author.id)) {
  } else {
    // the user can type the command ... your command code goes here :)
    if (msg.author.id === '276642440373338112') {
      msg.channel.send('Oi Pai! 🤩 <@276642440373338112> ');
    }
    // Adds the user to the set so that they can't talk for a minute
    talkedRecentlySoriin.add(msg.author.id);
    const doSomething = async () => {
      await sleep(90000000)
      talkedRecentlySoriin.delete(msg.author.id);
    }
    doSomething();
    return
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- SORIIN ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- RAFOR ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (talkedRecentlyRafa.has(msg.author.id)) {
  } else {
    // the user can type the command ... your command code goes here :)
    if (msg.author.id === '667847649793409104') {
      msg.channel.send('Hey Rafor, almoçou macarrãozinho hoje? 🤔 <@667847649793409104> ');
    }
    // Adds the user to the set so that they can't talk for a minute
    talkedRecentlyRafa.add(msg.author.id);
    const doSomething = async () => {
      await sleep(90000000)
      talkedRecentlyRafa.delete(msg.author.id);
    }
    doSomething();
    return
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- RAFOR ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- GABRIEL ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (talkedRecentlyGabriel.has(msg.author.id)) {
  } else {
    // the user can type the command ... your command code goes here :)
    if (msg.author.id === '363000539140849674') {
      msg.channel.send('Não <@363000539140849674>, você não vai mais comprar monster girl! 😡');
    }
    // Adds the user to the set so that they can't talk for a minute
    talkedRecentlyGabriel.add(msg.author.id);
    const doSomething = async () => {
      await sleep(90000000)
      talkedRecentlyGabriel.delete(msg.author.id);
    }
    doSomething();
    return
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- GABRIEL ENTRAR NO SERVER -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- SALVE -----+----- -----+----- -----+----- -----+----- -----+-----
// client.on('message', msg => {
//   if (msg.content === 'gtsalve') {
//     const arrayOn = 'https://i.imgur.com/zjG0oZn.gif'
//     const on = new Discord.MessageAttachment(arrayOn)
//     msg.channel.send('Pai ta on! 😎', on);
//   }
// });

client.on('message', msg => {
  if (msg.content === 'gtsalve') {
    const arrayImage = 'https://i.imgur.com/zjG0oZn.gif'
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#22ff00')
      .setTitle('Pai ta on! 😎')
      .setImage(arrayImage)
      .setTimestamp()
    console.log(exampleEmbed);
    msg.channel.send(exampleEmbed)
      .then(function (msg) {
        msg.react("😎")
      }).catch(function () {
        //Something
      });
  }
});

// -----+----- -----+----- -----+----- -----+----- -----+----- SALVE -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- PRINTS -----+----- -----+----- -----+----- -----+----- -----+-----

client.on('message', msg => {
  if (msg.content === 'gtprint') {
    const arrayImage = (Math.floor(Math.random() * 45) + 1).toString();
    const randomImage = new Discord.MessageAttachment(`./print/${arrayImage}.png`, `${arrayImage}.png`);
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#204ac8')
      .setTitle('Jamais será esquecido! 👁️')
      .attachFiles(randomImage)
      .setImage(`attachment://${arrayImage}.png`)
      .setTimestamp()
    console.log(exampleEmbed);
    msg.channel.send(exampleEmbed)
      .then(function (msg) {
        msg.react("👁️")
      }).catch(function () {
        //Something
      });
  }
});

// -----+----- -----+----- -----+----- -----+----- -----+----- PRINTS -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- PAR -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content === 'gtpar') {

    const arrayRoleta = (Math.floor(Math.random() * 10) + 1).toString();
    if (arrayRoleta === '2' || arrayRoleta === '4' || arrayRoleta === '6' || arrayRoleta === '8' || arrayRoleta === '10') {
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#39FF14')
        .setTitle('(' + arrayRoleta + ')' + ' - Você Ganhou!👏')
        .setImage('http://1.bp.blogspot.com/-fbbo0Wvy2Vc/U8U290QwBPI/AAAAAAAAJoM/xhOEe1zuOEY/s1600/applause+3.gif')
        .setTimestamp()
      console.log(exampleEmbed);
      msg.reply(exampleEmbed)
    } else {
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('(' + arrayRoleta + ')' + ' - Você Perdeu 😔')
        .setImage(`https://media.giphy.com/media/BEob5qwFkSJ7G/giphy.gif`)
        .setTimestamp()
      console.log(exampleEmbed);
      msg.reply(exampleEmbed)
    }
  }
});

// -----+----- -----+----- -----+----- -----+----- -----+----- PAR -----+----- -----+----- -----+----- -----+----- -----+-----


// -----+----- -----+----- -----+----- -----+----- -----+----- IMPAR -----+----- -----+----- -----+----- -----+----- -----+-----

client.on('message', msg => {
  if (msg.content === 'gtimpar') {

    const arrayRoleta = (Math.floor(Math.random() * 10) + 1).toString();
    if (arrayRoleta === '2' || arrayRoleta === '4' || arrayRoleta === '6' || arrayRoleta === '8' || arrayRoleta === '10') {
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('(' + arrayRoleta + ')' + ' - Você Perdeu 😔')
        .setImage(`https://media.giphy.com/media/BEob5qwFkSJ7G/giphy.gif`)
        .setTimestamp()
      console.log(exampleEmbed);
      msg.reply(exampleEmbed)
    } else {
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#39FF14')
        .setTitle('(' + arrayRoleta + ')' + ' - Você Ganhou!👏')
        .setImage('http://1.bp.blogspot.com/-fbbo0Wvy2Vc/U8U290QwBPI/AAAAAAAAJoM/xhOEe1zuOEY/s1600/applause+3.gif')
        .setTimestamp()
      console.log(exampleEmbed);
      msg.reply(exampleEmbed)
    }
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- IMPAR -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- PATCH NOTES -----+----- -----+----- -----+----- -----+----- -----+-----

client.on('message', msg => {

  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'patch') {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#fcad03')
      .setTitle('Patch Notes GTRN Bot v1.1 - (22/03/2021)')
      .addFields(
        { name: 'New Features', value: '- Foda-se feature added. \n - gtpatch feature added. \n - Perdemo feature added. \n - gtprint feature added.' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Changes', value: '- Changes on gtroleta' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Bug Fixes', value: '- Fixed a bug at gtclima where sometimes the minutes stamp was showing only 1 number (Ex: 16:5).' },
      ).setTimestamp()
    console.log(exampleEmbed);
    msg.channel.send(exampleEmbed)
  }
});

// -----+----- -----+----- -----+----- -----+----- -----+----- PATCH NOTES -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- JOTARO NO -----+----- -----+----- -----+----- -----+----- -----+-----

client.on('message', msg => {
  if (msg.content === 'no') {
    const randomImage = new Discord.MessageAttachment(`./gifs/no.gif`, `no.gif`);
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#993399')
      .setTitle('NO! NO! NO! NO! NO!')
      .attachFiles(randomImage)
      .setImage(`attachment://no.gif`)
      .setTimestamp()
    console.log(exampleEmbed);
    msg.channel.send(exampleEmbed)
  }
});

// -----+----- -----+----- -----+----- -----+----- -----+----- JOTARO NO -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- JOTARO YES -----+----- -----+----- -----+----- -----+----- -----+-----

client.on('message', msg => {
  if (msg.content === 'yes') {
    const randomImage = new Discord.MessageAttachment(`./gifs/yes.gif`, `yes.gif`);
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#993399')
      .setTitle('YES! YES! YES! YES! YES!')
      .attachFiles(randomImage)
      .setImage(`attachment://yes.gif`)
      .setTimestamp()
    console.log(exampleEmbed);
    msg.channel.send(exampleEmbed)
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- JOTARO YES -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- AJUDA -----+----- -----+----- -----+----- -----+----- -----+-----

client.on('message', msg => {
  if (msg.content === 'gtajuda') {
    const embed = new MessageEmbed()
      .setColor(0x9900FF)
      .setDescription('**Os comandos disponíveis são:**\n\n • gtclima (gtclima [cidade])\n • gtsalve\n • gtdroga\n • gtroleta\n • gtanao\n • gttmj\n • gtpergunta (Apenas perguntas "SIM" ou "NÃO")\n • gtmeme\n • gtdog\n • gtcat\n • gtduck\n • gtsoriin\n • gtmattok\n • gtclebin\n • gtsolblasi\n\n *Por enquanto...* 😉');
    msg.channel.send(embed);
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- AJUDA -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- DROGA -----+----- -----+----- -----+----- -----+----- -----+-----
//msg ¿DONDE ESTA MI DROGA? 😡
client.on('message', msg => {
  if (msg.content === 'gtdroga') {
    const arrayDroga = 'https://i.imgur.com/GtaK2vy.png'
    const droga = new Discord.MessageAttachment(arrayDroga)
    msg.channel.send('¿DONDE ESTA MI DROGA? 😡', droga);
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- DROGA -----+----- -----+----- -----+----- -----+----- -----+-----


// -----+----- -----+----- -----+----- -----+----- -----+----- ? -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content === '?') {
    msg.channel.send('? 🤨');
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- ? -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- GTCAMINHAO -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content === 'gtcaminhao') {
    const emoji = client.emojis.cache.find(emoji => emoji.name === "pepeOK");

    msg.channel.send(`███████ ${emoji}\n███████ ██ \n███████ ██ \n☻☻              ☻`);
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- GTCAMINHAO -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- REACT FAZ SENTIDO -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content === 'faz sentido') {
    const emoji = client.emojis.cache.find(emoji => emoji.name === "thonk");
    msg.react(emoji.id)
      .then(console.log)
      .catch(console.error);
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- REACT FAZ SENTIDO -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- REACT FAZ SENTIDO -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content.includes('messi careca')) {
    const emoji = client.emojis.cache.find(emoji => emoji.name === "messiCareca");
    msg.react(emoji.id)
      .then(console.log)
      .catch(console.error);
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- REACT FAZ SENTIDO -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- REACT FAZ SENTIDO -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content === 'stonks') {
    const emoji = client.emojis.cache.find(emoji => emoji.name === "stonks");
    msg.react(emoji.id)
      .then(console.log)
      .catch(console.error);
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- REACT FAZ SENTIDO -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- REACT ANÁLISE -----+----- -----+----- -----+----- -----+----- -----+-----

client.on('message', analise => {
  analiser = analise.content.replace(/\s/g, '').toLowerCase();
  // analise.content = analise.content.replace(/\s/g, '').toLowerCase();
  if (analiser.includes('analise') || analiser.includes('análise') || analiser.includes('anaiise')) {
    const emoji = client.emojis.cache.find(emoji => emoji.name === "thonk");
    const emoji2 = client.emojis.cache.find(emoji2 => emoji2.name === "6768_thonkfall");
    const emoji3 = client.emojis.cache.find(emoji3 => emoji3.name === "raforAnalise");
    const emoji4 = client.emojis.cache.find(emoji4 => emoji4.name === "diamondthonk");
    const emoji5 = client.emojis.cache.find(emoji5 => emoji5.name === "7354_cointhonk");
    const emoji6 = client.emojis.cache.find(emoji6 => emoji6.name === "3722_athinkingwithblobs");

    analise.react(emoji.id)
    analise.react(emoji2.id)
    analise.react(emoji3.id)
    analise.react(emoji4.id)
    analise.react(emoji5.id)
    analise.react(emoji6.id)


      .then(console.log)
      .catch(console.error);
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- REACT ANÁLISE -----+----- -----+----- -----+----- -----+----- -----+-----


// -----+----- -----+----- -----+----- -----+----- -----+----- REACT FAZ SENTIDO -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content === 'not stonks') {
    const emoji = client.emojis.cache.find(emoji => emoji.name === "notStonks");
    msg.react(emoji.id)
      .then(console.log)
      .catch(console.error);
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- REACT FAZ SENTIDO -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- REACT FAZ SENTIDO -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  // nicer = nice.content.replace(/\s/g, '').toLowerCase();

  if (msg.content.includes('eu fiz ') || msg.content.includes('EU FIZ ')) {
    const emoji = client.emojis.cache.find(emoji => emoji.name === "pepeOK");

    msg.react(emoji.id)
    msg.channel.send('nice')
    return
    //   .then(console.log)
    //  .catch(console.error);
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- REACT FAZ SENTIDO -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- REACT PERDEMO -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', perdemo => {
  perdemor = perdemo.content.replace(/\s/g, '').toLowerCase();

  if (perdemor.includes('perdemo') || perdemor.includes('perderam') || perdemor.includes('perdi') || perdemor.includes('perdeu')) {
    const emoji = client.emojis.cache.find(emoji => emoji.name === "perdemo");

    perdemo.react(emoji.id)
    // perdemo.channel.send('<:perdemo:784491333116624986>');
    return
    //   .then(console.log)
    //  .catch(console.error);
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- REACT PERDEMO -----+----- -----+----- -----+----- -----+----- -----+-----


// -----+----- -----+----- -----+----- -----+----- -----+----- ROLETA -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content === 'gtroleta') {
    // const array = [
    //   'https://i.imgur.com/Ico6DuU.gif',
    //   'https://i.imgur.com/2boMNpL.gif',
    //   'https://i.imgur.com/MFyaMit.gif',
    //   'https://i.imgur.com/8Vuj7MN.gif',
    //   'https://i.imgur.com/xDNYlV0.gif',
    //   'https://i.imgur.com/SREIxjb.gif'

    // ]
    const arrayRoleta = (Math.floor(Math.random() * 6) + 1).toString();
    const randomRoleta = new Discord.MessageAttachment(`./roleta/${arrayRoleta}.gif`, `${arrayRoleta}.gif`);
    if (arrayRoleta === '1') {
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('TA MORTO 💀')
        .setImage('https://i.imgur.com/Ico6DuU.gif')
        .setTimestamp()
      console.log(exampleEmbed);
      msg.reply(exampleEmbed)

    } else {
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#39FF14')
        .setTitle('SAFE! 😪')
        .attachFiles(randomRoleta)
        .setImage(`attachment://${arrayRoleta}.gif`)
        .setTimestamp()
      console.log(exampleEmbed);
      msg.reply(exampleEmbed)
    }
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- ROLETA -----+----- -----+----- -----+----- -----+----- -----+-----


// -----+----- -----+----- -----+----- -----+----- -----+----- ANÃO -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content === 'gtanao') {
    const array = [
      'https://i.imgur.com/ANLKrU6.jpg',
      'https://i.imgur.com/VWzwexw.jpg'
    ]
    const arrayImage = array[Math.floor(Math.random() * array.length)];
    const randomImage = new Discord.MessageAttachment(arrayImage);
    msg.channel.send('Anão', randomImage);
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- ANÃO -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- FODA-SE -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.channel.id == '689095691188043805') {
    if (talkedRecentlyFds.has(msg.channel.id)) {
    } else {
      const arrayFds = (Math.floor(Math.random() * 9) + 1);
      const numeroFds = arrayFds + '000000';
      msg.channel.send('Foda-se');
      // console.log(numeroFds, 'KAKAKAKKAKAKAKAKKA');
      console.log(arrayFds, 'Delay Fds');
      talkedRecentlyFds.add(msg.channel.id);
      const doSomething = async () => {
        await sleep(numeroFds)
        talkedRecentlyFds.delete(msg.channel.id);
      }
      doSomething();
      return
    }
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- FODA-SE by: Mariin -----+----- -----+----- -----+----- -----+----- -----+-----


// -----+----- -----+----- -----+----- -----+----- -----+----- RANDOM MEME -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content.includes('gtmeme')) {
    const arrayImage = (Math.floor(Math.random() * 74) + 1).toString();
    const randomImage = new Discord.MessageAttachment(`./memes/${arrayImage}.jpg`, `${arrayImage}.jpg`);
    msg.channel.send(randomImage)
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- RANDOM MEME -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- PARABÉNS -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content.includes('gtparabens')) {
    const emoji = client.emojis.cache.find(emoji => emoji.name === "messiCareca");
    const arrayImage = (Math.floor(Math.random() * 4) + 1).toString();
    const randomImage = new Discord.MessageAttachment(`./gifs/parabens/${arrayImage}.gif`, `${arrayImage}.gif`);
    msg.channel.send('PARABÉNS PRINOOOOOOOOOOOOOOOOOOO! <@713360781688963113>', randomImage)
      .then(function (msg) {
        msg.react(emoji.id)
      }).catch(function () {
        //Something
      });
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- PARABÉNS -----+----- -----+----- -----+----- -----+----- -----+-----


// -----+----- -----+----- -----+----- -----+----- -----+----- FBI LOLI -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content.includes('loli') || msg.content.includes('Loli') || msg.content.includes('l o l i') || msg.content.includes('LOLI') || msg.content.includes('LoLi') || msg.content.includes('l O l I') || msg.content.includes('lolí') || msg.content.includes('Lolí') || msg.content.includes('lo lí')) {
    const randomImage = new Discord.MessageAttachment(`./gifs/fbi.gif`, `fbi.gif`);
    msg.channel.send(randomImage)
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- FBI LOLI -----+----- -----+----- -----+----- -----+----- -----+-----


// -----+----- -----+----- -----+----- -----+----- -----+----- TMJ -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content.includes('gttmj')) {
    const randomImage = new Discord.MessageAttachment(`./tmj.jpg`, `tmj.jpg`);
    msg.channel.send(randomImage)
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- TMJ -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- PERGUNTA -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {

  if (msg.content === 'gtpergunta o mattok é gay?') {
    const mattok = new Discord.MessageAttachment(`./gifs/gay/gay.gif`, `gay.gif`);

    msg.reply(' PRA POHA! KKKKKKKKKKKKKKKKKKKKKKK', mattok);
    return

  } else if (msg.content.includes('gtpergunta')) {

    const arrayImage = (Math.floor(Math.random() * 10) + 1).toString();
    const randomPergunta = new Discord.MessageAttachment(`./gifs/pergunta/${arrayImage}.gif`, `${arrayImage}.gif`);

    console.log(randomPergunta);
    console.log(msg.content);


    if (randomPergunta.name === '1.gif' || randomPergunta.name === '3.gif' || randomPergunta.name === '5.gif' || randomPergunta.name === '7.gif' || randomPergunta.name === '9.gif') {
      if (msg.content.includes('eu devo me')) {
        msg.reply(' Sim! Você deve' + msg.content.slice(18).replace('?', '!').replace('me', 'se'), randomPergunta);
        return
      } else if (msg.content.includes('eu posso me')) {
        msg.reply(' Sim! Você pode' + msg.content.slice(19).replace('?', '!').replace('me', 'se'), randomPergunta);
        return
      } else if (msg.content.includes('eu consigo me')) {
        msg.reply(' Sim! Você consegue' + msg.content.slice(21).replace('?', '!').replace('me', 'se'), randomPergunta);
        return
      } else if (msg.content.includes('eu vou me')) {
        msg.reply(' Sim! Você vai' + msg.content.slice(17).replace('?', '!').replace('me', 'se'), randomPergunta);
        return
      } else if (msg.content.includes('eu irei me')) {
        msg.reply(' Sim! Você ira' + msg.content.slice(18).replace('?', '!').replace('me', 'se'), randomPergunta);
        return
      } else if (msg.content.includes('eu devo')) {
        msg.reply(' Sim! Você deve' + msg.content.slice(18).replace('?', '!'), randomPergunta);
        return
      } else if (msg.content.includes('eu posso')) {
        msg.reply(' Sim! Você pode' + msg.content.slice(19).replace('?', '!'), randomPergunta);
        return
      } else if (msg.content.includes('eu tenho')) {
        msg.reply(' Sim! Você tem' + msg.content.slice(19).replace('?', '!'), randomPergunta);
        return
      } else if (msg.content.includes('eu consigo')) {
        msg.reply(' Sim! Você consegue' + msg.content.slice(21).replace('?', '!'), randomPergunta);
        return
      } else if (msg.content.includes('eu vou')) {
        msg.reply(' Sim! Você vai' + msg.content.slice(17).replace('?', '!'), randomPergunta);
        return
      } else if (msg.content.includes('eu sou')) {
        msg.reply(' Sim! Você é' + msg.content.slice(17).replace('?', '!'), randomPergunta);
        return
      } else if (msg.content.includes('eu irei')) {
        msg.reply(' Sim! Você ira' + msg.content.slice(18).replace('?', '!'), randomPergunta);
        return
      } else {
        msg.reply(' Sim!', randomPergunta);
        return
      }
    } else if (randomPergunta.name === '2.gif' || randomPergunta.name === '4.gif' || randomPergunta.name === '6.gif' || randomPergunta.name === '8.gif' || randomPergunta.name === '10.gif') {
      if (msg.content.includes('eu devo me')) {
        msg.reply(' Não! Você não deve' + msg.content.slice(18).replace('?', '!').replace('me', 'se'), randomPergunta);
        return
      } else if (msg.content.includes('eu posso me')) {
        msg.reply(' Não! Você não pode' + msg.content.slice(19).replace('?', '!').replace('me', 'se'), randomPergunta);
        return
      } else if (msg.content.includes('eu consigo me')) {
        msg.reply(' Não! Você não consegue' + msg.content.slice(21).replace('?', '!').replace('me', 'se'), randomPergunta);
        return
      } else if (msg.content.includes('eu vou me')) {
        msg.reply(' Não! Você não vai' + msg.content.slice(17).replace('?', '!').replace('me', 'se'), randomPergunta);
        return
      } else if (msg.content.includes('eu irei me')) {
        msg.reply(' Não! Você não ira' + msg.content.slice(18).replace('?', '!').replace('me', 'se'), randomPergunta);
        return
      } else if (msg.content.includes('eu devo')) {
        msg.reply(' Não! Você não deve' + msg.content.slice(18).replace('?', '!'), randomPergunta);
        return
      } else if (msg.content.includes('eu posso')) {
        msg.reply(' Não! Você não pode' + msg.content.slice(19).replace('?', '!'), randomPergunta);
        return
      } else if (msg.content.includes('eu tenho')) {
        msg.reply(' Não! Você não tem' + msg.content.slice(19).replace('?', '!'), randomPergunta);
        return
      } else if (msg.content.includes('eu consigo')) {
        msg.reply(' Não! Você não consegue' + msg.content.slice(21).replace('?', '!'), randomPergunta);
        return
      } else if (msg.content.includes('eu vou')) {
        msg.reply(' Não! Você não vai' + msg.content.slice(17).replace('?', '!'), randomPergunta);
        return
      } else if (msg.content.includes('eu sou')) {
        msg.reply(' Não! Você não é' + msg.content.slice(17).replace('?', '!'), randomPergunta);
        return
      } else if (msg.content.includes('eu irei')) {
        msg.reply(' Não! Você não ira' + msg.content.slice(18).replace('?', '!'), randomPergunta);
        return
      } else
        msg.reply(' Não!', randomPergunta);
      return
    }
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- PERGUNTA -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- BEM-VINDO -----+----- -----+----- -----+----- -----+----- -----+-----
// client.on('guildMemberAdd', member => {
//   // Send the message to a designated channel on a server:
//   const channel = member.guild.channels.cache.find(ch => ch.name === 'check-in');
//   // Do nothing if the channel wasn't found on this server
//   if (!channel) return;
//   // Send the message, mentioning the member
//   channel.send(`Bem vindo meu consagrado, ${member}!`);
// });
// -----+----- -----+----- -----+----- -----+----- -----+----- BEM-VINDO -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- SORIIN -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content === 'gtsoriin') {
    const arrayImage = (Math.floor(Math.random() * 57) + 1).toString();
    const randomImage = new Discord.MessageAttachment(`./soriin/soriin${arrayImage}.jpeg`, `soriin${arrayImage}.jpeg`);
    const exampleEmbed = new Discord.MessageEmbed()

      .setColor('#22ff00')
      .setTitle('THE GOD SORIIN 🙌')
      .attachFiles(randomImage)
      .setDescription('<@276642440373338112>\n\n • GTRN Owner ™\n • Front-End Developer 💻\n • Criador do <@775843045945901126> BOT 🤖\n • https://www.twitch.tv/soriin7 🎥\n')
      .setImage(`attachment://soriin${arrayImage}.jpeg`)
      .setTimestamp()
    console.log(exampleEmbed);
    msg.channel.send(exampleEmbed)
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- SORIIN -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- MATTOK -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content === 'gtmattok') {
    const arrayImage = (Math.floor(Math.random() * 60) + 1).toString();
    const randomImage = new Discord.MessageAttachment(`./mattok/mattok${arrayImage}.jpeg`, `mattok${arrayImage}.jpeg`);
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#006ce8')
      .setTitle('Grande Macarronada!')
      .attachFiles(randomImage)
      .setDescription('<@107921995953393664>\n\n • Psicopata\n • 2,5 metros de altura\n • Joga de Yasuo 🤢\n • https://www.twitch.tv/mattok44 🎥\n')
      .setImage(`attachment://mattok${arrayImage}.jpeg`)
      .setTimestamp()
    console.log(exampleEmbed);
    msg.channel.send(exampleEmbed)
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- MATTOK -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- CLEBIN -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content === 'gtclebin') {
    const arrayImage = (Math.floor(Math.random() * 20) + 1).toString();
    const randomImage = new Discord.MessageAttachment(`./clebin/clebin${arrayImage}.jpeg`, `clebin${arrayImage}.jpeg`);
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#006ce8')
      .setTitle('Clebin Rei Delas!')
      .attachFiles(randomImage)
      .setDescription('<@294612418825420801>\n\n • 13 anos\n • Mlk Firmeza\n • Tiltado 🤬\n')
      .setImage(`attachment://clebin${arrayImage}.jpeg`)
      .setTimestamp()
    console.log(exampleEmbed);
    msg.channel.send(exampleEmbed)
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- CLEBIN -----+----- -----+----- -----+----- -----+----- -----+-----

// -----+----- -----+----- -----+----- -----+----- -----+----- SOLBLASI -----+----- -----+----- -----+----- -----+----- -----+-----
client.on('message', msg => {
  if (msg.content === 'gtsolblasi') {
    const arrayImage = (Math.floor(Math.random() * 8) + 1).toString();
    const randomImage = new Discord.MessageAttachment(`./solblasi/solblasi${arrayImage}.jpeg`, `solblasi${arrayImage}.jpeg`);
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#8c4b00')
      .setTitle('Solblasi o Corno! 🐮')
      .attachFiles(randomImage)
      .setDescription('<@272809978572570625>\n\n • Gatão da Mãe\n • Corno 🐮\n • Main Yasuo 🤮\n')
      .setImage(`attachment://solblasi${arrayImage}.jpeg`)
      .setTimestamp()
    console.log(exampleEmbed);
    msg.channel.send(exampleEmbed)
  }
});
// -----+----- -----+----- -----+----- -----+----- -----+----- SOLBLASI -----+----- -----+----- -----+----- -----+----- -----+-----

