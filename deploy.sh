#!/bin/bash
set -e

echo "=== RADUCAN.PRO DEPLOY SCRIPT ==="
echo ""

# Update system
echo "[1/6] Updating system..."
apt update -y && apt upgrade -y

# Install Node.js 20
echo "[2/6] Installing Node.js 20..."
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install -y nodejs
fi
echo "Node.js $(node -v)"
echo "npm $(npm -v)"

# Install PM2 & Nginx
echo "[3/6] Installing PM2 & Nginx..."
npm install -g pm2
apt install -y nginx

# Clone repo
echo "[4/6] Cloning repository..."
cd /root
if [ -d "radukan" ]; then
  cd radukan && git pull origin main
else
  git clone https://github.com/justvadim777/radukan.git
  cd radukan
fi

# Install dependencies & build
echo "[5/6] Building project..."
npm install
npm run build

# Start with PM2
echo "[6/6] Starting with PM2..."
pm2 delete radukan 2>/dev/null || true
pm2 start npm --name "radukan" -- start
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || true

# Configure Nginx
echo "Configuring Nginx..."
cat > /etc/nginx/sites-available/radukan << 'NGINX'
server {
    listen 80;
    server_name raducan.pro www.raducan.pro _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/radukan /etc/nginx/sites-enabled/radukan
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
systemctl enable nginx

echo ""
echo "=== DEPLOY COMPLETE ==="
echo "Site is live at http://$(curl -s ifconfig.me)"
echo ""
echo "Next steps:"
echo "1. Point domain raducan.pro A-record to $(curl -s ifconfig.me)"
echo "2. Run: apt install certbot python3-certbot-nginx -y"
echo "3. Run: certbot --nginx -d raducan.pro -d www.raducan.pro"
