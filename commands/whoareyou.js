module.exports = {
	name: 'whoareyou',
	description: 'Ping',
	aliases: ['quiestu', 'botinfo', 'bot'],
	cooldown: 240,
	execute(message) {
		message.channel.send(`Je m'appelle **Ada Lovelace** et je suis une _assistante virtuelle_ conçue par **Loosha**.

D'après mon créateur, j'ai été nommée en l'honneur de la **première programmeuse au monde**. En effet, j'ai été principalement connue pour avoir réalisé le premier véritable programme informatique sur l'ancêtre de l'ordinateur: la **machine analytique** de _Charles Babbage_.
Mon histoire se trouve sur _Wikipédia_: <https://fr.wikipedia.org/wiki/Ada_Lovelace>

Mon code (et mon âme) se trouve sur _Github_ (mais ça je te laisse chercher 😜).
La _chaîne Twitch_ de mon créateur: <https://www.twitch.tv/imloosha>
Et par la même occasion, son _Twitter_: <https://twitter.com/imloosha>
		`);
	},
};
