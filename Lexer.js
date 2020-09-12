class Lexer {
    static isNumber(symbol) {
        return !!Number(symbol);
    }

    static isString(symbol) {
        return /"|'|`/.test(symbol);
    }

    static isKeyword(symbol) {
        return symbol === 'Log';
    }

    static isIdentifier(symbol) {
        return /[A-Z]*/.test(symbol);
    }

    static isOperator(symbol) {
        return /O|U|\?/.test(symbol);
    }

    static evaluate(line) {
        console.log(line);
        const symbols = [];
        let str = "";
        let strType = "";
        for (let word of line.split(' ')) {
            let endPunctuation = false;
            if (word[0] === '(') {
                symbols.push({ type: 'punctuation', value: '(' });
                word = word.substr(1, word.length);
            }
            if (word[word.length-1] === ')') {
                endPunctuation = true;
                word = word.substr(0, word.length-1);
            }

            if (this.isNumber(word)) {
                symbols.push({ type: 'number', value: word });
            } else if (this.isOperator(word)) {
                symbols.push({ type: 'operator', value: word });
            } else if (this.isIdentifier(word)) {
                if (this.isString(word[0]) || this.isString(word[word.length-1])) {
                    if (word === strType) {
                        str += ' ';
                        symbols.push({ type: 'string', value: str});
                        strType = '';
                        str = '';
                    } else if (word.length > 1 && word[0] === word[word.length-1]) {
                        symbols.push({ type: 'string', value: word.substr(1, word.length-1) });
                    } else if (this.isString(word[0])) {
                        strType = word[0];
                        if (word.length > 1) {
                            str += word.substr(1, word.length);
                        }
                    } else if (word[word.length-1] === strType) {
                        str += ` ${word.substr(0, word.length-1)}`;
                        symbols.push({ type: 'string', value: str });
                        strType = '';
                        str = '';
                    } else {
                        str += ` ${word}`;
                    }
                } else if (strType) {
                    str += ` ${word}`;
                } else {
                    if (this.isKeyword(word)) {
                        symbols.push({ type: 'keyword', value: word });
                    } else {
                        symbols.push({ type: 'identifier', value: word });
                    }
                }
            }

            if (endPunctuation) {
                symbols.push({ type: 'punctuation', value: ')' })
            }
            
        }
        return symbols;
    }
}

module.exports = Lexer;