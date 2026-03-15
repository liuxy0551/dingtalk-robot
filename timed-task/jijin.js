const axios = require("axios");
const dayjs = require("dayjs");

const main = () => {
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const holidayUrl = "https://holiday-cn.liuxianyu.cn/api/holiday";

    axios.get(holidayUrl).then((res) => {
        const { isWeekday, isWeekdayButRest } = res?.data?.data?.[0] || {};

        // 是工作日且不放假
        if (isWeekday && !isWeekdayButRest) {
            const url = "https://dingtalk-robot.liuxianyu.cn/api/jijin";
            const userList = [
                {
                    senderNick: "琉易",
                    senderId: "$:LWCP_v1:$QrBRmHUHxbh9UEtbK43yCrWgZV0FDF2K",
                    senderStaffId: "2133686213946986",
                    isTimedTask: true,
                },
            ];

            Promise.all(userList.map((user) => axios.post(url, user))).then((resArr) => {
                resArr.forEach((res) => {
                    console.log(now, res?.data?.data);
                });
            });
        } else {
            console.log("非工作日或节假日，不推送");
        }
    });
};

main();
