// const conversionRulesList = [ ];

// const nonIgnoredRulesList = [ ];

// const ignoredWords = [];

function applyWildcardConversion(input, rules) { for (const [pattern, replacement] of Object.entries(rules)) { if (pattern.includes('*')) { const [start, end] = pattern.split('*'); const regex = new RegExp(`${start}(.*?)${end}`, 'g'); input = input.replace(regex, (_, middle) => { if (replacement.includes('*')) { const [repStart, repEnd] = replacement.split('*'); return `${repStart}${middle}${repEnd}`; } else { return replacement; } }); } } return input; } 

function applyConversion(input, rules) { let result = ''; let i = 0; while (i < input.length) { let matched = false; for (let length = Math.min(Object.keys(rules).reduce((max, key) => Math.max(max, key.length), 0), input.length - i); length > 0; length--) { let substring = input.slice(i, i + length); if (substring in rules) { result += rules[substring]; i += length; matched = true; break; } } if (!matched) { result += input[i]; i++; } } return result; } 

function ignoreCertainWords(input, wordsToIgnore) { let ignoreMap = []; wordsToIgnore.forEach(word => { let regex = new RegExp(word, 'g'); let match; while ((match = regex.exec(input)) !== null) { ignoreMap.push({ index: match.index, word }); } }); return ignoreMap; } 

function restoreIgnoredWords(convertedInput, ignoreMap) { ignoreMap.forEach(({ index, word }) => { let position = index; for (let i = 0; i < word.length; i++) { convertedInput = convertedInput.slice(0, position + i) + word[i] + convertedInput.slice(position + i); } }); return convertedInput; } 

function convertWithIgnore(input, rulesList, wordsToIgnore) { let ignoreMap = ignoreCertainWords(input, wordsToIgnore); let cleanedInput = input.split(''); ignoreMap.forEach(({ index, word }) => { for (let i = 0; i < word.length; i++) { cleanedInput[index + i] = ''; } }); cleanedInput = cleanedInput.join(''); let convertedInput = cleanedInput; for (const rules of rulesList) { convertedInput = applyConversion(convertedInput, rules); convertedInput = applyWildcardConversion(convertedInput, rules); } return restoreIgnoredWords(convertedInput, ignoreMap); } 

function convertWithoutIgnore(input, rulesList) { let convertedInput = input; for (const rules of rulesList) { convertedInput = applyConversion(convertedInput, rules); convertedInput = applyWildcardConversion(convertedInput, rules); } return convertedInput; } 

function updateOutput() { const inputText = document.getElementById('inputArea').value; const inputLines = inputText.split('\n'); const outputLines = inputLines.map(line => { const inputWords = line.split(' '); const outputWords = inputWords.map(word => { let convertedWord = convertWithIgnore(word, conversionRulesList, ignoredWords); convertedWord = convertWithoutIgnore(convertedWord, nonIgnoredRulesList); return convertedWord; }); return outputWords.join(' '); }); document.getElementById('outputArea').innerHTML = outputLines.join('<br>'); } 

document.getElementById('convertButton').addEventListener('click', updateOutput);
