#!/bin/bash
set +e
cd /root/radukan

echo "=== [1.1] mobile-menu-overlay in src ==="
echo "Navbar.tsx:"
grep -n "mobile-menu-overlay" src/components/Navbar.tsx
echo "globals.css:"
grep -n "mobile-menu-overlay" src/app/globals.css

echo ""
echo "=== [1.2] old absolute structure removed? ==="
echo "Navbar 'absolute top-full':"
grep -n "absolute top-full" src/components/Navbar.tsx
echo "Navbar 'AnimatePresence':"
grep -n "AnimatePresence" src/components/Navbar.tsx

echo ""
echo "=== [1.3] BUILD_ID file ==="
ls -la .next/BUILD_ID 2>&1
echo "content:"
cat .next/BUILD_ID 2>&1

echo ""
echo "=== [1.4] PM2 cwd / uptime / restarts ==="
pm2 describe radukan 2>&1 | grep -E "exec cwd|uptime|restarts|name|status"

echo ""
echo "=== [2.1] mobile-menu-overlay in served HTML ==="
curl -s http://127.0.0.1:3000/ru | grep -c "mobile-menu-overlay"

echo ""
echo "=== [2.2] old absolute top-full in served HTML ==="
curl -s http://127.0.0.1:3000/ru | grep -c "absolute top-full"

echo ""
echo "=== [2.3] CSS chunk path served ==="
CSS=$(curl -s http://127.0.0.1:3000/ru | grep -oE '/_next/static/chunks/[^"]+\.css' | head -1)
echo "CSS path: $CSS"
echo ""
echo "mobile-menu-* selectors in compiled CSS:"
[ -n "$CSS" ] && curl -s "http://127.0.0.1:3000$CSS" | grep -oE "\.mobile-menu-[a-z]+" | sort -u

echo ""
echo "=== [2.4] git HEAD on VPS ==="
git log -1 --oneline

echo ""
echo "=== [2.5] git status ==="
git status --porcelain | head -10
