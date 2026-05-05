import paramiko
import os

os.environ["PYTHONIOENCODING"] = "utf-8"

HOST = "188.225.58.19"
USER = "root"
PASS = "e#ka#m,5S-U-KX"


def run(ssh, cmd, timeout=60):
    print(f"\n>>> {cmd[:140]}")
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

steps = [
    ("PM2 status", "pm2 status 2>&1"),
    ("Nginx running?", "systemctl status nginx --no-pager 2>&1 | head -20"),
    ("Listening ports", "ss -tlnp 2>&1 | head -30"),
    ("Nginx config test", "nginx -t 2>&1"),
    ("Nginx server names", "nginx -T 2>&1 | grep -E 'server_name|listen|ssl_certificate' | head -40"),
    ("Curl localhost:3000", "curl -sI -o /dev/null -w 'HTTP %{http_code} time=%{time_total}\\n' http://127.0.0.1:3000/ru 2>&1"),
    ("Curl radukan.pro local", "curl -sI -o /dev/null -w 'HTTP %{http_code}\\n' --resolve raducan.pro:443:127.0.0.1 https://raducan.pro 2>&1"),
    ("Cert dates", """for d in raducan.pro radukan.ru islandlounge ostrov; do
  echo "=== $d ==="
  ls -la /etc/letsencrypt/live/ 2>&1 | grep -i "$d"
done
ls -la /etc/letsencrypt/live/ 2>&1"""),
    ("Cert validity raducan.pro", "echo | openssl s_client -servername raducan.pro -connect raducan.pro:443 2>/dev/null | openssl x509 -noout -dates -subject -issuer 2>&1"),
    ("Cert validity radukan.ru", "echo | openssl s_client -servername radukan.ru -connect radukan.ru:443 2>/dev/null | openssl x509 -noout -dates -subject -issuer 2>&1"),
    ("PM2 logs raducan tail 60", "pm2 logs radukan --lines 60 --nostream 2>&1 | tail -100"),
    ("Nginx error log tail 40", "tail -40 /var/log/nginx/error.log 2>&1"),
    ("Memory and load", "free -h && echo '---' && uptime"),
    ("Nginx sites-enabled list", "ls -la /etc/nginx/sites-enabled/ 2>&1"),
]

for desc, cmd in steps:
    print(f"\n{'='*60}")
    print(f"[*] {desc}")
    print(f"{'='*60}")
    run(ssh, cmd, 60)

ssh.close()
