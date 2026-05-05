PID=$(pgrep -f "next-server" | head -1)
echo "PID=$PID"
cat /proc/$PID/environ 2>/dev/null | tr '\0' '\n' | grep -E '^(BUILD_ID|NEXT_SERVER_ACTIONS_ENCRYPTION_KEY)='
echo "---"
echo "HTTP status /ru:"
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/ru
echo "Server Action errors in fresh log:"
wc -l /root/.pm2/logs/radukan-error.log
grep -c "Failed to find Server Action" /root/.pm2/logs/radukan-error.log 2>/dev/null
echo "PM2:"
pm2 list 2>&1 | grep radukan
