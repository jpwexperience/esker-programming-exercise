/*
* Assumptions:
* Whitespace not counted as a characters.
* A figure is any string of digits 0-9 and only digits.
* 	example: 1, 123, and 0949843578 are counted as 1 figure each. 123% and 2b45 would not be considered figures.
* 'other characters' represent any character that is not a-z, A-Z, or 0-9 and are counted no matter where they appear.
* A word is any string of characters between a-z and A-Z.
* 	example: abc, Time, LsEgJ are each counted as 1 word. A2D, fds^gfd, 987ljvbnm^ are not counted as words.
* If there are 0 words of a given length, it is not displayed in the output.
* Output is written to console standard out.
*/

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

/*
 * Handles command line argument verification.
 * Reads input file line by line and starts output once file is completley read.
 */ 
function main(entryArgs){
	let argV = entryArgs;
	//verify proper formatting
	if(argV.length > 3 || argV.length <= 2){
		console.log("Usage: $ node coding-exercise.js <path-to-input-file>");
		return;
	}
	let filePath = entryArgs.slice(2);
	filePath = path.resolve(filePath[0]);
	//verify file exists and read line by line
	if(fs.existsSync(filePath)){
		let fileInterface = readline.createInterface({
			input: fs.createReadStream(filePath)
		});
		fileInterface.on('line', function(line){
			lineParse(line);
		});
		//show file information once it has been completley read
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
	let whiteSpaceReg = /[\s]+/;
	//splits line into pieces based on whitespace
	linePieces = line.split(whiteSpaceReg);
	for(var i = 0; i < linePieces.length; i++){
		let tempPiece = linePieces[i];
		totalChars += tempPiece.length;
		let pieceLength = tempPiece.length;
		if(tempPiece.match(wordRegex)){
			totalWords++;
			//check whether a words length matches another length in object
			//increment accordingly
			if(wordLengths[pieceLength] === undefined){
				wordLengths[pieceLength] = 1;
			} else {
				wordLengths[pieceLength]++;
			}
		}
		//check whether any figures appear on the line according to assumption
		let figures = tempPiece.match(figureRegex);
		if(figures != null){
			totalFigures += figures.length;
		}
		//iterate through each pieces characters and increment accordingly
		for(var j = 0; j < pieceLength; j++){
			let tempChar = tempPiece[j];
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
	//moves object key:value pairs into an array to be sorted
	let sortedWords = [];
	for(var len in wordLengths){
		sortedWords.push([len, wordLengths[len]]);
	}
	sortedWords.sort(function(a, b){
		return a - b;
	});
	//properly formats output string based on key:value pair
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
