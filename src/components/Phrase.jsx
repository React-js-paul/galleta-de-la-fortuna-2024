import DecryptedText from './DecryptedText';

const Phrase = ({ phraseSelected, decryptTrigger }) => {
	return (
		<p className="phrase-text px-2 min-h-[3.5rem]">
			<DecryptedText
				text={phraseSelected.phrase}
				speed={10}
				maxIterations={2}
				revealDirection="start"
				animateOn="trigger"
				trigger={decryptTrigger}
				characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*!?✦★☽"
				className="phrase-text"
				encryptedClassName="text-amber-500/50"
			/>
		</p>
	);
};

export default Phrase;
