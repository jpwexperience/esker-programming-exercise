# Esker Programming Excercise
## Usage
`$ node coding-excercise.js \<path-to-input-file\>`

## Assumptions
* Whitespace is not counted as a character.
* A figure is any string of digits 0-9.
	* example: 1, 123, and 0949843578 are counted as 1 figure each.
* 'other characters' represent any character that is not a-z, A-Z, or 0-9.
* A word is any string of characters between a-z and A-Z.
	* example: abc, Time, LsEgJ are each counted as 1 word. A2D, fds^gfd, 987ljvbnm^ are not counted as words.
* If there are 0 words of a given length, it is not displayed in the output.
