// Keep ES5-compatible: this must run under old Node versions to surface a clear error.

var match = /^v(\d+)/.exec(process.version);
var major = match ? parseInt(match[1], 10) : 0;

if (major < 18) {
  console.error("");
  console.error("This project requires Node.js 18.18 or newer.");
  console.error("Current version: " + process.version);
  console.error("");
  console.error('If you use nvm:  nvm install && nvm use');
  console.error('Or Homebrew:   export PATH="/opt/homebrew/bin:$PATH"');
  console.error("");
  process.exit(1);
}
