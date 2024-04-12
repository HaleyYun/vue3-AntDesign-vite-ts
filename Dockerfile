# 使用官方的Nginx 1.17.6作为基础镜像
FROM nginx:1.17.6

# 设置作者信息
LABEL maintainer="zskj-sk"

# 将dist目录中的内容复制到Nginx默认的静态文件目录中
COPY dist/ /usr/share/nginx/html/

# 将nginx.conf替换至镜像文件
COPY nginx.conf /etc/nginx/nginx.conf

# 将ssl证书复制到镜像自定义路径
#COPY cert /etc/nginx/cert/

# 设置时区变量为上海
ENV TimeZone=Asia/Shanghai
# 使用软连接，并且将时区配置覆盖/etc/timezone
RUN ln -snf /usr/share/zoneinfo/$TimeZone /etc/localtime && echo $TimeZone > /etc/timezone

# 输出完成
RUN echo 'echo init ok!!'