var fs = require('fs');

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
  const regex = /\/CLO[^\n\/]*[\n\/]/gi;
  let m;

  while ((m = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      console.log(`Found match at ${regex.lastIndex}, group ${groupIndex}: ${match}`);
    });
  }

  const result = text.replace(regex, '');

  return result;
}