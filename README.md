# DiceBot

###### Dicebot is a simple Twitch.tv chatbot for handling dice roll commands. Dicebot is a nodejs app that uses [node-twitchbot](https://www.npmjs.com/package/node-twitchbot)

#### Setup

After you have downloaded/cloned Dicebot you will need to enter your twitch credentials in the index.js file.

The easiest way to obtain a Twitch oauth token is to use https://twitchapps.com/tmi/

Find the following block of code in index.js and enter your info.

```
const Bot = new TwitchBot({
  username : 'twitch-username-here',
  oauth    : 'oauth:your-oauth-here',
  channel  : 'your-channel-here'
});
```


Make sure you have [Node](https://nodejs.org) installed. Run the following commands in your project directory to install dependencies and start the app.

```
npm install
node index.js
```

#### Usage
Dicebot supports up to 36 sided die with a maxium of 36 die. Dicebot will output the outcome of each dice being rolled as well as the sum of all dice rolled.

Use: !`dice amount`d`number of sides`

##### Example:
Roll three dice that are six sided
```
!3d6
```

Output:
```
Dicebot: AwesomeUser123's 3d6: 2 5 3 Sum: 10
```

#### Make an executable

You can use [pkg](https://www.npmjs.com/package/pkg) or node-webkit to make your project into an exe file to easily run on your streaming box. In this example we will use pkg.

After you have setup your bot and it works, install pkg.
```
npm install -g pkg
```

Then use the following to create the exe:
```
pkg injdex.js
```
