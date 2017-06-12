const TwitchBot = require('node-twitchbot');

const Bot = new TwitchBot({
  username : 'twitch-username-here',
  oauth    : 'oauth:your-oauth-here',
  channel  : 'your-channel-here'
});

function rollDie(x, y){
  return Math.floor(Math.random() * ((y-x)+1) + x);
}

function getRoll(amount, max, user) {
  if(!amount || !max || !user) {
    return;
  }

  var rolls = [];

  for (var i = 0; i < amount; i++) {
    rolls.push(rollDie(1, max));
  }

  var outputText = user + '\'s ' + amount + 'd' + max + ': ';
  rolls.map(function(roll){
    outputText = outputText + roll + ' ';
  });

  var sum = rolls.reduce((a, b) => a + b, 0);
  return  outputText + '  Sum: ' + sum;
}

function parseRollCommand(msg) {
  var diceIndex = msg.indexOf('d');
  var diceAmount = msg.substring(1, diceIndex);
  var maxRoll = msg.substring(diceIndex + 1, msg.length);

  if(diceIndex === -1 || isNaN(maxRoll) || isNaN(diceAmount) || maxRoll > 36 || diceAmount > 36) {
    return;
  }

  return {'amount': diceAmount, 'max': maxRoll};
}

/* Connect bot to Twitch IRC */
Bot.connect()
.then(() => {
  console.log('Dice Bot Initialized');

  Bot.listen((err, chatter) => {
    if(err) {
      console.log(err)
    } else {
      var isCommand = chatter.msg.indexOf('!') === 0;

      if(isCommand){
        var rollData = parseRollCommand(chatter.msg);

        if(rollData){
          var outputText = getRoll(rollData.amount, rollData.max, chatter.user);

          if(outputText) {
            Bot.msg(outputText);
          }
        }
      }
    }
  });

  Bot.listenFor('!dice', (err, chatter) => {
    var roll = rollDie(1, 3);

    switch(roll) {
      case 1: Bot.msg('Random greeting or info here.');
              break;
      case 2: Bot.msg('Random greeting or info here.');
              break;
      case 3: Bot.msg('Random greeting or info here.');
              break;
      default: Bot.msg('Hello')
    }
  });

  /* Listen for raw IRC events */
  Bot.raw((err, event) => {
    //console.log(event)
  });
})
.catch(err => {
  console.log('Connection error!')
  console.log(err)
});
