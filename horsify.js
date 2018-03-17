const WordPOS = require('wordpos');
const wordpos = new WordPOS();

module.exports = async function horsify(message) {
    let nouns = await new Promise(resolve => {
        wordpos.getNouns(message, resolve);
    });
    if (nouns.length === 0) {
        return message;
    }
    else {
        let randomIndex = Math.round(Math.random() * (nouns.length - 1));
        let selectedNoun = nouns[randomIndex];
        return message.replace(selectedNoun, '\u{1F434}');
    }
};