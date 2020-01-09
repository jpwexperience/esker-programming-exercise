const fs = require('fs');
const readline = require('readline');
const path = require('path');

let totalLines = 0;
let totalWords = 0;
let totalChars = 0;
let totalLetters = 0;
let totalFigures = 0;
let totalOthers = 0;
let wordLengths = {};

main(process.argv);

function main(entryArgs){
	let argV = entryArgs;
	if(argV.length > 3 || argV.length <= 2){
		console.log("Usage: $ node coding-exercise.js <path-to-input-file>");
		return;
	}
	let filePath = entryArgs.slice(2);
	filePath = path.resolve(filePath[0]);
	if(fs.existsSync(filePath)){
		let fileInterface = readline.createInterface({
			input: fs.createReadStream(filePath)
		});
		fileInterface.on('line', function(line){
			lineParse(line);
		});
		fileInterface.on('close', function(line){
			infoOutput(filePath);
		});
	} else{
		console.log("Input: " + filePath + " does not exist.");
		return;
	}

}

function lineParse(line){
	totalLines++;
	let letterRegex = /[a-zA-Z]/;
	let wordRegex = /^[a-zA-Z]+$/;
	let digitRegex = /[0-9]/;
	let figureRegex = /^[0-9]+$/;
	let whiteSpaceReg = /[ ,]+/;
	lineWords = line.split(whiteSpaceReg);
	for(var i = 0; i < lineWords.length; i++){
		let tempWord = lineWords[i];
		totalChars += tempWord.length;
		let wordLength = tempWord.length;
		if(tempWord.match(wordRegex)){
			totalWords++;
			if(wordLengths[wordLength] === undefined){
				wordLengths[wordLength] = 1;
			} else {
				wordLengths[wordLength]++;
			}
		}
		let figures = tempWord.match(figureRegex);
		if(figures != null){
			totalFigures += figures.length;
		}
		for(var j = 0; j < wordLength; j++){
			let tempChar = tempWord[j];
			if(tempChar.match(letterRegex)){
				totalLetters++;
			} else {
				if(!tempChar.match(digitRegex)){
					totalOthers++;
				}
			}
		}
	}
}

function infoOutput(path){
	console.log("File name: " + path);
	console.log("Number of lines: " + totalLines);
	console.log("Number of characters (total): " + totalChars);
	console.log("Number of letters: " + totalLetters);
	console.log("Number of figures: " + totalFigures);
	console.log("Number of other characters: " + totalOthers);
	console.log("Number of words: " + totalWords);
	let sortedWords = [];
	for(var len in wordLengths){
		sortedWords.push([len, wordLengths[len]]);
	}
	sortedWords.sort(function(a, b){
		return b[1] - a[1];
	});
	for(var i = 0; i < sortedWords.length; i++){
		let outString = "Number of " + sortedWords[i][0];
		if(parseInt(sortedWords[i][0]) > 1){
			outString += " letters ";
		} else {
			outString += " letter ";
		}
		outString += "words: " + sortedWords[i][1];
		console.log(outString);
	}
}
