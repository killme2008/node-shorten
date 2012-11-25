LOGFILE=$(dirname $0)/logs/shorten.log
mkdir $(dirname $0)/logs
nohup node $(dirname $0)/app.js 2>&1 >>$LOGFILE &