// conversionRulesList1, 2
//<select id="mode" onchange="modeSelect()">
//    <option value="mode1">Mode 1</option>
//    <option value="mode2">Mode 2</option>
//</select>
document.getElementById('inputArea').addEventListener('input', function() { function applyConversion(input, rules) { let result = ''; let i = 0; while (i < input.length) { let matched = false; for (let length = Math.min(Object.keys(rules).reduce((max, key) => Math.max(max, key.length), 0), input.length - i); length > 0; length--) { let substring = input.slice(i, i + length); if (substring in rules) { result += rules[substring]; i += length; matched = true; break; } } if (!matched) { result += input[i]; i++; } } return result; } const inputText = this.value; const inputWords = inputText.split(' '); const outputWords = inputWords.map(word => { let convertedWord = word; for (const rules of conversionRulesList) { convertedWord = applyConversion(convertedWord, rules); } return convertedWord; }); document.getElementById('outputArea').value = outputWords.join(' '); });
