# Esker Programming Excercise

## Prerequisite
Node.js must be installed to run script. This is to help facilitate system file reading.

## Usage
`$ node coding-excercise.js <path-to-input-file>`

## Assumptions
* Whitespace not counted as a characters.
* A figure is any string of digits 0-9 and only digits.
	* example: 1, 123, and 0949843578 are counted as 1 figure each. 123% and 2b45 would not be considered figures.
* 'other characters' represent any character that is not a-z, A-Z, or 0-9 and are counted no matter where they appear.
* A word is any string of characters between a-z and A-Z.
	* example: abc, Time, LsEgJ are each counted as 1 word. A2D, fds^gfd, 987ljvbnm^ are not counted as words.
* If there are 0 words of a given length, it is not displayed in the output.
* Output is written to console's standard out
