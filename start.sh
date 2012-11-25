LOGFILE=$(dirname $0)/logs/shorten.log
nohup node $(dirname $0)/app.js 2>&1 >>$LOGFILE &