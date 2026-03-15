const axios = require("axios");
const dayjs = require("dayjs");

const main = () => {
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const paramsList = [
        { language: "javascript" },
        { language: "typescript" },
        { language: "java" },
        { language: "go" },
        { language: "" },
    ];

    for (let params of paramsList) {
        axios
            .get(`http://github-trending-api.liuxianyu.cn/repository/list?isCache=no&language=${params.language}`)
            .then((res) => {
                const { code, data, message } = res.data;
                delete data.list;
                console.log("\n", now, params.language || "any", JSON.stringify({ code, data, message }));
            })
            .catch((error) => {
                console.log("\n", now, params.language || "any", error.toString());
            });
    }
};

main();

// 0 0 6-23 * * ? // 6点到23点每小时执行一次
// 0 0/30 6-23 * * ? // 6点到23点每半小时执行一次
// 0 0 */1 * * ? // 每小时执行一次
// 0/10 * * * * ? // 10秒执行一次
// 0 0/30 * * * ? // 每半个小时执行一次
