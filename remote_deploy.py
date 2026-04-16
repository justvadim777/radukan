import paramiko
import sys
import os

os.environ["PYTHONIOENCODING"] = "utf-8"

HOST = "188.225.58.19"
USER = "root"
PASS = "e#ka#m,5S-U-KX"

def run(ssh, cmd, timeout=300):
    print(f"\n>>> {cmd[:120]}...")
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    code = stdout.channel.recv_exit_status()
    # Print last 30 lines only
    lines = (out + err).strip().split("\n")
    for line in lines[-30:]:
        try:
            print(line)
        except UnicodeEncodeError:
            print(line.encode("ascii", errors="replace").decode())
    return code

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
print(f"Connecting to {HOST}...")
ssh.connect(HOST, username=USER, password=PASS, timeout=15)
print("Connected!\n")

commands = [
    ("Installing PM2 & Nginx", "npm install -g pm2 && apt install -y nginx", 120),
    ("Cloning repo", "cd /root && rm -rf radukan && git clone https://github.com/justvadim777/radukan.git", 60),
    ("Installing dependencies", "cd /root/radukan && npm install", 180),
    ("Building project", "cd /root/radukan && npm run build", 300),
    ("Starting with PM2", "cd /root/radukan && pm2 delete radukan 2>/dev/null; pm2 start npm --name radukan -- start && pm2 save && pm2 startup systemd -u root --hp /root 2>/dev/null; echo done", 30),
    ("Configuring Nginx", """cat > /etc/nginx/sites-available/radukan << 'NGINX'
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
nginx -t && systemctl restart nginx && systemctl enable nginx
echo 'Nginx OK'""", 30),
]

for desc, cmd, timeout in commands:
    print(f"\n{'='*50}")
    print(f"[*] {desc}...")
    print(f"{'='*50}")
    code = run(ssh, cmd, timeout)
    if code != 0 and desc == "Building project":
        print(f"FAILED with exit code {code}")
        ssh.close()
        sys.exit(1)

print(f"\n{'='*50}")
print("DEPLOY COMPLETE!")
print(f"Site is live at http://{HOST}")
print(f"{'='*50}")

ssh.close()
