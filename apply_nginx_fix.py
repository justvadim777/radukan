import paramiko
import os

os.environ["PYTHONIOENCODING"] = "utf-8"

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

NEW_CONFIG_WITH_CERT = """server {
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
    ssl_certificate     /etc/letsencrypt/live/raducan.pro/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/raducan.pro/privkey.pem;
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


def run(ssh, cmd, timeout=60):
    print(f"\n>>> {cmd[:200]}")
    chan = ssh.get_transport().open_session()
    chan.settimeout(timeout)
    chan.exec_command(cmd)
    output = b""
    while True:
        try:
            chunk = chan.recv(4096)
            if not chunk:
                break
            output += chunk
        except Exception:
            break
    stderr_out = b""
    while True:
        try:
            chunk = chan.recv_stderr(4096)
            if not chunk:
                break
            stderr_out += chunk
        except Exception:
            break
    code = chan.recv_exit_status()
    text = (output + stderr_out).decode("utf-8", errors="replace")
    for line in text.split("\n"):
        try:
            print(line)
        except UnicodeEncodeError:
            print(line.encode("ascii", errors="replace").decode())
    print(f"--- exit {code} ---")
    return code, text


ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
print(f"Connecting to {HOST}...")
ssh.connect(HOST, username=USER, password=PASS, timeout=30, banner_timeout=30)
print("Connected!\n")

# Step 1: backup
print(f"\n{'='*60}\n[1] Backup current config\n{'='*60}")
run(
    ssh,
    "cp /etc/nginx/sites-available/radukan /etc/nginx/sites-available/radukan.bak.$(date +%s) && ls -la /etc/nginx/sites-available/",
)

# Step 2: write new config (without certs in default block first)
print(f"\n{'='*60}\n[2] Write new config (variant A: no cert in default)\n{'='*60}")
sftp = ssh.open_sftp()
with sftp.open("/etc/nginx/sites-available/radukan", "w") as f:
    f.write(NEW_CONFIG)
sftp.close()
run(ssh, "cat /etc/nginx/sites-available/radukan")

# Step 3: nginx -t
print(f"\n{'='*60}\n[3] nginx -t\n{'='*60}")
code, text = run(ssh, "nginx -t 2>&1")

if code != 0:
    print(f"\n{'='*60}\n[3a] First test failed — try variant B with certs in default block\n{'='*60}")
    sftp = ssh.open_sftp()
    with sftp.open("/etc/nginx/sites-available/radukan", "w") as f:
        f.write(NEW_CONFIG_WITH_CERT)
    sftp.close()
    code, text = run(ssh, "nginx -t 2>&1")

if code != 0:
    print(f"\n{'='*60}\n[!!!] BOTH variants failed — restoring backup\n{'='*60}")
    run(
        ssh,
        "cp $(ls -t /etc/nginx/sites-available/radukan.bak.* | head -1) /etc/nginx/sites-available/radukan && nginx -t",
    )
    ssh.close()
    exit(1)

# Step 4: reload
print(f"\n{'='*60}\n[4] systemctl reload nginx\n{'='*60}")
run(ssh, "systemctl reload nginx && systemctl status nginx --no-pager | head -10")

# Step 5: external checks
print(f"\n{'='*60}\n[5a] curl -I https://raducan.pro\n{'='*60}")
run(
    ssh,
    "curl -sI -o /dev/null -w 'HTTP %{http_code} time=%{time_total}\\n' https://raducan.pro 2>&1",
)
run(ssh, "curl -sI https://raducan.pro 2>&1 | head -10")

print(f"\n{'='*60}\n[5b] curl https://radukan.ru — should fail with handshake rejected\n{'='*60}")
run(
    ssh,
    "curl -vI --connect-timeout 8 https://radukan.ru 2>&1 | head -25 || echo 'DNS or connect failed'",
)

print(f"\n{'='*60}\n[5c] openssl unknown SNI test\n{'='*60}")
run(
    ssh,
    "echo | openssl s_client -servername unknown.test -connect 127.0.0.1:443 2>&1 | head -20",
)

print(f"\n{'='*60}\n[5d] PM2 status (restart count should still be 0)\n{'='*60}")
run(ssh, "pm2 status")

print(f"\n{'='*60}\nDONE\n{'='*60}")
ssh.close()
