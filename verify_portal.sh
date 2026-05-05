#!/bin/bash
cd /root/radukan

echo "=== createPortal in client bundle ==="
grep -rl "createPortal" .next/static/chunks 2>/dev/null | head -3

echo ""
echo "=== mobile-menu-overlay in client bundle ==="
grep -rl "mobile-menu-overlay" .next/static/chunks 2>/dev/null | head -3

echo ""
echo "=== zIndex 9999 in bundle ==="
grep -rl "9999" .next/static/chunks/*.js 2>/dev/null | head -3

echo ""
echo "=== !important in compiled CSS ==="
CSS=$(curl -s http://127.0.0.1:3000/ru | grep -oE '/_next/static/chunks/[^"]+\.css' | head -1)
echo "css: $CSS"
[ -n "$CSS" ] && curl -s "http://127.0.0.1:3000$CSS" | grep -oE "mobile-menu-overlay\{[^}]*important" | head -1 | cut -c1-200

echo ""
echo "=== Inline style hint in client JS ==="
grep -h "rgba(3, 8, 17" .next/static/chunks/*.js 2>/dev/null | head -1 | cut -c1-150

echo ""
echo "=== HTTP /ru ==="
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/ru

echo ""
echo "=== PM2 ==="
pm2 list 2>&1 | grep radukan
