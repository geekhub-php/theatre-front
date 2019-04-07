const fs = require('fs');
const exec = require('child_process').exec;
fs.watch(__dirname, () => {
  exec('systemctl reload nginx');
});
