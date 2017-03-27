/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'Monaco Franze';

const languageStrings = {
    'de-DE': {
        translation: {
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
            GET_FACT_MESSAGE: 'Da Franze sagt ',
            HELP_MESSAGE: 'Du kannst an Franze fragen. Wie wars? „Sag was“, oder du kannst „Pfiade“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Servus!'
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'WieWarsIntent': function () {
        this.emit('GetFact');
       // image
       const imageObj = {
            smallImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Monacofranze.jpg',
            largeImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Monacofranze.jpg'
        };

        const speechOutput = ''
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact, imageObj);

    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        
        // image
       const imageObj = {
            smallImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Monacofranze.jpg',
            largeImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Monacofranze.jpg'
        };
        
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact, imageObj);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
