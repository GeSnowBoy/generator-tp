#!/bin/bash
# 基础配置
dateString=`date +"%m%d.%H%M"`
minicli=/Applications/wechatwebdevtools.app/Contents/MacOS/cli

if [[ $# -gt 0 ]]
then
	echo "nothing to do"
fi

if [[ "$1" = "b" ]]
then
	# build new version
	echo "Starting building..."
	npm run build
fi

if [[ $1 = "l" ]]
then
	# 登录
	echo "Login..."
	${minicli} -l
fi

if [[ $1 = "p" ]]
then
	# 预览
	echo "Previewing..."
	${minicli} -p $PWD --compile-condition '{"pathName":"pages/index/index"}' --preview-info-output
fi

if [[ $1 = "ap" ]]
then
	# 自动预览
	echo "Auto Previewing..."
	${minicli} --auto-preview $PWD --compile-condition '{"pathName":"pages/index/index"}' --auto-preview-info-output
fi

if [[ $1 = "u" ]]
then
	echo "Uploading..."
	echo "✋"
	echo "The version number is: ${dateString}"

	# 上传代码
	${minicli}  -u ${dateString}@$PWD --upload-desc ${dateString} --upload-info-output
fi

if [[ $1 = "o" ]]
then
	echo "open project"
	# 打开调试工具
	${minicli}  -o $PWD 
fi

if [[ $1 = "q" ]]
then
	echo "close project"
	# 关闭调试工具
	${minicli}  --quit
fi
