#!/bin/bash
echo "=== [1] Security headers (5) ==="
curl -sI --resolve raducan.pro:443:127.0.0.1 https://raducan.pro/ru | grep -iE "^(strict|x-content|referrer|x-frame|permissions)" | sort

echo ""
echo "=== [2] /ru canonical ==="
curl -s http://127.0.0.1:3000/ru | grep -oE 'rel="canonical"[^>]*' | head -1

echo "=== [3] /en canonical ==="
curl -s http://127.0.0.1:3000/en | grep -oE 'rel="canonical"[^>]*' | head -1

echo "=== [4] /ru/about title ==="
curl -s http://127.0.0.1:3000/ru/about | grep -oE '<title[^>]*>[^<]+' | head -1

echo "=== [5] /en/about title ==="
curl -s http://127.0.0.1:3000/en/about | grep -oE '<title[^>]*>[^<]+' | head -1

echo "=== [6] /ru/projects/hookah canonical ==="
curl -s http://127.0.0.1:3000/ru/projects/hookah | grep -oE 'rel="canonical"[^>]*' | head -1

echo "=== [7] /en/projects/hookah canonical ==="
curl -s http://127.0.0.1:3000/en/projects/hookah | grep -oE 'rel="canonical"[^>]*' | head -1

echo "=== [8] /ru/tools title (was missing) ==="
curl -s http://127.0.0.1:3000/ru/tools | grep -oE '<title[^>]*>[^<]+' | head -1

echo "=== [9] /ru/reviews title (was missing) ==="
curl -s http://127.0.0.1:3000/ru/reviews | grep -oE '<title[^>]*>[^<]+' | head -1

echo "=== [10] hreflang on /ru/about ==="
curl -s http://127.0.0.1:3000/ru/about | grep -oE 'hreflang="[^"]+"[^>]*href="[^"]+"' | head -3

echo "=== [11] no opacity:0 regression ==="
curl -s http://127.0.0.1:3000/ru | grep -c "opacity:0"

echo "=== [12] PM2 ==="
pm2 list 2>&1 | grep radukan
