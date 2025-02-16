const axios = require("axios");
const dayjs = require("dayjs");

exports.handler = (event, context, callback) => {
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const holidayUrl = "http://holiday-cn.liuxianyu.cn/api/holiday";

    axios.get(holidayUrl).then((res) => {
        const { isWeekday, isWeekdayButRest } = res?.data?.data?.[0] || {};

        // 是工作日且不放假
        if (isWeekday && !isWeekdayButRest) {
            // const url = "http://dingtalk-robot.liuxianyu.cn/api/jijin";
            const url = "http://dingtalk-robot.liuxianyu.cn/api/gupiao";
            const userList = [
                {
                    "senderNick": "琉易",
                    "senderId": "$:LWCP_v1:$QrBRmHUHxbh9UEtbK43yCrWgZV0FDF2K",
                    "senderStaffId": "2133686213946986",
                    "isTimedTask": true,
                },
            ];

            Promise.all(userList.map((user) => axios.post(url, user))).then((resArr) => {
                resArr.forEach((res) => {
                    console.log(now, res?.data?.data);
                });
                callback();
            });
        }
    });
};
