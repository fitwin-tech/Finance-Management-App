const fs = require('fs');
const path = require('path');
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const buildPath = path.join(__dirname, 'build'); // Path to your build directory

// Color codes
const resetColor = '\x1b[0m';
const greenColor = '\x1b[32m';
// const cyanColor = '\x1b[36m';

if (fs.existsSync(buildPath)) {
  const config = {
    user: "finance@finance.naveenportfolio.site",
    password: "n9C@dXG5N8bKGQLp5#*78LS7f",
    host: "ftp.naveenportfolio.site",
    port: 21,
    localRoot: buildPath,
    remoteRoot: '/',
    include: ['*', '**/*', '.htaccess'],
    exclude: [],
    deleteRemote: true,
  };

  // Listen to the "progress" event
  ftpDeploy.on('uploading', data => {
    const percentComplete = Math.round((data.transferredFileCount / data.totalFilesCount) * 100);
    console.log(`Uploading: ${percentComplete}% - ${data.filename}`);
  });

  // Deploy with progress tracking
  ftpDeploy.deploy(config, err => {
    if (err) console.error(err);
    else console.log(`${greenColor}Deployment successful!${resetColor}`);
  });
} else {
  console.log('Build directory not found. Run "npm run build" to generate the build files.');
}