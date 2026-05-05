#!/bin/bash
echo "[1] aria-attrs:"
curl -s http://127.0.0.1:3000/ru | grep -oE 'aria-(label|expanded)="[^"]+"' | head -3

echo "[2] burger z-201:"
curl -s http://127.0.0.1:3000/ru | grep -oE 'z-\[201\]'

echo "[3] mobile-menu CSS classes compiled:"
CSS=$(curl -s http://127.0.0.1:3000/ru | grep -oE '/_next/static/chunks/[^"]+\.css' | head -1)
echo "  css path: $CSS"
[ -n "$CSS" ] && curl -s "http://127.0.0.1:3000$CSS" | grep -oE "\.mobile-menu-[a-z]+" | sort -u

echo "[4] no opacity:0 regression:"
curl -s http://127.0.0.1:3000/ru | grep -c "opacity:0"

echo "[5] env in process:"
PID=$(pgrep -f "next-server" | head -1)
cat /proc/$PID/environ 2>/dev/null | tr '\0' '\n' | grep -E '^(BUILD_ID|NEXT_SERVER_ACTIONS_ENCRYPTION_KEY)=' | awk -F= '{print $1}'

echo "[6] PM2:"
pm2 list 2>&1 | grep radukan

echo "[7] HTTP /ru:"
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/ru

echo "[8] role=dialog present in HTML:"
curl -s http://127.0.0.1:3000/ru | grep -oE 'role="dialog"' | head -1
echo "  (note: dialog appears only when isOpen=true, so SSR may not have it — checking client bundle)"
grep -rl "mobile-menu-overlay" .next/server/app 2>/dev/null | head -3
