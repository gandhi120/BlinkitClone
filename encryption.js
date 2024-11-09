const fs = require('fs');
const readline = require('readline');
//for get arguments
const args = process.argv;

// Check if .env.dev exists
if (!fs.existsSync(args[2])) {
  console.error('.env.dev file not found!');
  process.exit(1);
}

const envLineReader = readline.createInterface({
  input: fs.createReadStream(args[2]),
});

const outputToEnv = fs.createWriteStream('.env');
envLineReader.on('line', line => {
  if (line) {
    const keyValue = line.split('=');
    const key = keyValue[0];
    const value = keyValue[1];

    if (key !== 'API_HOST' && key !== 'APP_CONFIG') {
      var final = key.concat('=' + value);
      final += '\r\n';
      outputToEnv.write(final);
    } else {
      line += '\r\n';
      outputToEnv.write(line);
    }
  }
});

console.log('Successfully copied contents from .env.dev to .env');
