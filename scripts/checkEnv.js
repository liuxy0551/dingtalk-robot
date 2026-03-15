const errorColor = '\x1B[31m%s\x1B[0m';

const overNode16 = parseInt(/^(\d+)\./.exec(process.versions.node)[1]) >= 16;

if (!overNode16) {
    console.log(errorColor, '要求 node16+');
    process.exit(1);
}
