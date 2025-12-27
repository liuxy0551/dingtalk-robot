FROM ubuntu:22.04

RUN echo 'deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse \n\
     deb http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse \n\
     deb-src http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse \n\
     deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse \n\
     deb-src http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse \n\
     deb http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse \n\
     deb-src http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse \n\
     deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse \n\
     deb-src http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse \n'\
     > /etc/apt/sources.list

# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
     && apt-get update -y && apt-get install -y tzdata

# 安装 nodejs
RUN apt-get update -y && apt-get install -y curl \
     && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
     && apt-get remove -y curl \
     && apt-get install -y nodejs \
     && npm config set registry https://registry.npmmirror.com/

# 设置工作目录
WORKDIR /dingtalk-robot

# 拷贝代码安装依赖
COPY ./ .
RUN npm install --production

# 定义环境变量
ENV NODE_ENV=production

EXPOSE 3055

# 启动应用程序
CMD ["npm", "run", "start"]
