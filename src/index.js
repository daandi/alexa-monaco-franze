/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');

var APP_ID = 'Monaco Franze';

const answers = {
    FACTS: [
        'Immer des Gschiess mit der Elli! ',
        'Aber Fräulein, ich muss ihnen glei sagen, ich bin zu nix geeignet. Ich bin furchtbar faul, des einzige was ich bin ist vergnügungssüchtig. ',
        'Sie sind jetzt wirklich wahnsinnig nett zu mir gwesn, Fräulein. Ich weiß gar nicht, wie lange das schon her ist, dass ein so hübsches Fräulein wie Sie so nett zu mir gwesn is. ',
        'Aa, des war bestimmt da Tierpark Toni!',
        'A Hund bist scho, Franze. ',
        'Spinna tuast fei scho, Franze. ',
        'A rechte Sternstunde wars, oder Spatzl?',
        'Ehrlich gesagt, ich interessiere mich wahnsinnig für Frauen!',
        'Franze, des is doch a gmahde Wiesn! ',
        'Spatzl - Bussi!',
        'Bussi, Uschi',
        'Wer Rheingold nicht gesehen hat, der versteht den ganzen Ring nicht mehr!',
        'Glaubstas, Waltraud. Dass du so gemein sein kannst!',
        'A bissel was geht immer!',
        'Während Sie Ihr Halleluja singen, ist bei uns der Deifi los.',
        'Geh Spatzl, schau wie I schau!',
        'Aus is und gar is, und schad is, dass s wahr is. ',
    ],
    SKILL_NAME: 'Monacco Franze Sprüche',
    GET_FACT_MESSAGE: 'Da <phoneme alphabet="ipa" ph="frandsɛ">Franz</phoneme> sagt ',
    HELP_MESSAGE: 'Du kannst an Franze fragen. Wie wars? „Sag was“, oder du kannst „Pfiade“ sagen... Wie kann ich dir helfen?',
    HELP_REPROMPT: 'Wie kann ich dir helfen?',
    STOP_MESSAGE: 'Servus!'
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('FranzeIntent');
    },
    'GetNewFactIntent': function () {
        this.emit('FranzeIntent');
    },
    'WieWarsIntent': function () {
       // image
       const imageObj = {
            smallImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Monacofranze.jpg',
            largeImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Monacofranze.jpg'
        };

        const speechOutput = '<audio src="https://s3-eu-west-1.amazonaws.com/monaco-franze/ein-rechter.mp3" />';
        this.emit(':tellWithCard', speechOutput, answers.SKILL_NAME, speechOutput, imageObj);

    },
    'FranzeIntent': function () {
        // Get a random bonmot
        const factArr = answers.FACTS;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = answers.GET_FACT_MESSAGE + randomFact;
        
        // image
       const imageObj = {
            smallImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Monacofranze.jpg',
            largeImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Monacofranze.jpg'
        };
        
        this.emit(':tellWithCard', speechOutput, answers.SKILL_NAME, randomFact, imageObj);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', answers.HELP_MESSAGE, answers.HELP_MESSAGE);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', answers.STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', answers.STOP_MESSAGE);
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', answers.STOP_MESSAGE);
    },
};

exports.handler = function(event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
