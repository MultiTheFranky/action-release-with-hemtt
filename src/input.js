const core = require('@actions/core');
const path = require('path');

module.exports.getCwd = function () {
    return path.normalize(core.getInput('cwd') || '.');
}
