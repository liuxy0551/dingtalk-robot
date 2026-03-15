const axios = require("axios");
const dayjs = require("dayjs");

const main = () => {
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const url = "https://dingtalk-robot.liuxianyu.cn/api/jizhangla";
    const params = {
        senderNick: "琉易",
        senderId: "$:LWCP_v1:$QrBRmHUHxbh9UEtbK43yCrWgZV0FDF2K",
        senderStaffId: "2133686213946986",
    };
    let msg = "";

    axios
        .post(url, params)
        .then((res) => {
            msg = `success, ${now}, ${url}, ${JSON.stringify(res.data)}`;
        })
        .catch((err) => {
            msg = `failed, ${now}, ${url}, ${err.response.status}`;
        })
        .finally(() => {
            const isSuccess = msg.includes("success");
            isSuccess && console.log(msg);
        });
};

main();
