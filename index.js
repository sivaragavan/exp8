var fs = require('fs');
var emoji = require('./commands/emoji')
var image = require('./commands/image')
var table = require('./commands/table')
var url = require('./commands/url')

var re = /\/(image|url|table|emoji)[^\n\/]*[\n\/]/i;


fs.readFile('sample/input.txt', 'utf8', function (err, contents) {
  result = executeCommands(contents);
  fs.writeFile("sample/output.html", result, function (err) {
    if (err) {
      return console.log("Error writing file");
    }
    console.log("The file was saved!");
  });
});

function executeCommands(text) {
  while (match = text.match(re)) {
    result = executeCommand(text, match[1], match[0], match.index);
    text = text.replace(re, result);
  }
  return text;
}

function executeCommand(text, command, fullCommand, lineno) {
  console.log("Executing Command : " + command);
  switch (command) {
    case "emoji":
      return emoji(text, fullCommand, lineno);
    case "image":
      return image(text, fullCommand, lineno);
    case "table":
      return table(text, fullCommand, lineno);
    case "url":
      return url(text, fullCommand, lineno);
    default:
      break;
  }
  
}