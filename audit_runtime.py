import paramiko
import os

os.environ["PYTHONIOENCODING"] = "utf-8"

HOST = "188.225.58.19"
USER = "root"
PASS = "e#ka#m,5S-U-KX"


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

print(f"\n{'='*60}\n[1] Curl all routes\n{'='*60}")
run(
    ssh,
    """BASE="http://127.0.0.1:3000"
for path in / /ru /en /ru/blog /en/blog /ru/about /en/about /ru/contact /en/contact /ru/projects /en/projects /ru/projects/hookah /ru/projects/capital /ru/projects/tech /ru/tools /en/tools /ru/glossary /ru/reviews /robots.txt /sitemap.xml; do
  code=$(curl -s -o /dev/null -w "%{http_code} %{time_total}s" -L "$BASE$path" --max-time 10)
  echo "$code  $path"
done""",
)

print(f"\n{'='*60}\n[2] Check blog slugs\n{'='*60}")
run(
    ssh,
    """BASE="http://127.0.0.1:3000"
ls /root/radukan/src/content/blog/*.mdx | head -10 | while read f; do
  slug=$(basename "$f" .mdx)
  code=$(curl -s -o /dev/null -w "%{http_code}" -L "$BASE/ru/blog/$slug" --max-time 10)
  echo "$code  /ru/blog/$slug"
done""",
)

print(f"\n{'='*60}\n[3] PM2 logs (last 200, errors only)\n{'='*60}")
run(ssh, "pm2 logs radukan --lines 100 --nostream --err 2>&1 | tail -80")

print(f"\n{'='*60}\n[4] Sample HTML size for /ru\n{'='*60}")
run(
    ssh,
    """curl -s http://127.0.0.1:3000/ru | wc -c
echo '---'
curl -s http://127.0.0.1:3000/ru | grep -oE '<h1[^>]*>[^<]+</h1>' | head -3
echo '---'
curl -s http://127.0.0.1:3000/ru | grep -ic 'application error' || echo '0 errors'""",
)

ssh.close()
