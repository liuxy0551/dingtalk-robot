const { execSync } = require('child_process');

const errorColor = '\x1B[31m%s\x1B[0m';

const isNode16 = parseInt(/^(\d+)\./.exec(process.versions.node)[1]) === 16;

if (!isNode16 ) {
    !isNode16 && console.log(errorColor, '要求 node16');
    process.exit(1);
}
