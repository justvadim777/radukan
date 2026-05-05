"""H4: add security headers to Nginx config for raducan.pro."""

import paramiko
import os
import sys
import io
import time

os.environ["PYTHONIOENCODING"] = "utf-8"
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HOST = "188.225.58.19"
USER = "root"
PASS = "e#ka#m,5S-U-KX"

NEW_CONFIG = """server {
    server_name raducan.pro www.raducan.pro;
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

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/raducan.pro/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/raducan.pro/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}

# Catch-all for unrecognized SNI — silently reject TLS handshake
server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    ssl_reject_handshake on;
}

server {
    if ($host = www.raducan.pro) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = raducan.pro) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name raducan.pro www.raducan.pro;
    return 404; # managed by Certbot




}
"""


def run(ssh, c, t=30):
    ch = ssh.get_transport().open_session()
    ch.settimeout(t)
    ch.exec_command(c)
    time.sleep(2)
    out = b""
    while ch.recv_ready():
        out += ch.recv(4096)
        time.sleep(0.5)
    return out.decode("utf-8", errors="replace").strip()


ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASS, timeout=20)

print("[1] backup:")
print(
    run(
        ssh,
        "cp /etc/nginx/sites-available/radukan /etc/nginx/sites-available/radukan.bak.$(date +%s) && ls -la /etc/nginx/sites-available/ | grep radukan",
    )
)

print("[2] write new config:")
sftp = ssh.open_sftp()
with sftp.open("/etc/nginx/sites-available/radukan", "w") as f:
    f.write(NEW_CONFIG)
sftp.close()
print("written")

print("[3] nginx -t:")
out = run(ssh, "nginx -t 2>&1")
print(out)

if "syntax is ok" in out and "test is successful" in out:
    print("[4] reload:")
    print(run(ssh, "systemctl reload nginx 2>&1 && echo reloaded"))

    print("[5] verify headers via local curl with correct SNI:")
    print(
        run(
            ssh,
            'curl -sI --resolve raducan.pro:443:127.0.0.1 https://raducan.pro/ru | grep -iE "^(strict|x-content|referrer|x-frame|permissions|http)"',
        )
    )
else:
    print("FAIL — restoring backup:")
    print(
        run(
            ssh,
            "cp $(ls -t /etc/nginx/sites-available/radukan.bak.* | head -1) /etc/nginx/sites-available/radukan && nginx -t",
        )
    )

ssh.close()
