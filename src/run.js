const { join } = require('path');
const core = require('@actions/core');
const hemtt = require('./hemtt');
const getCwd = require('./input').getCwd;
const fs = require('fs');
const {setReleasePath, setZipName, setZipPath, setModName} = require('./output');

module.exports = async function run() {

    const cwd = getCwd();

    // log version
    await core.group('HEMTT Version', () => hemtt.getVersion());

    // build release
    await core.group('Build mod', () => hemtt.modBuildRelease());

    // Get mod name from the zip name (which is the mod name + version)
    const releasePath = join(cwd, "releases");
    const releaseFiles = fs.readdirSync(releasePath).map(file => {
        if (!file.includes('latest')) {
            return file;
        }
    });

    const file = releaseFiles[0];
    const modName = file.split('-')[0];

    setReleasePath(releasePath);
    setModName(modName);


    // set outputs
    setZipName(file);
    setZipPath(join(releasePath, file));

    return null;
}
