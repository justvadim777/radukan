import paramiko, sys, io, time

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(
    "188.225.58.19",
    username="root",
    password="e#ka#m,5S-U-KX",
    timeout=20,
)


def cmd(c):
    ch = ssh.get_transport().open_session()
    ch.settimeout(20)
    ch.exec_command(c)
    time.sleep(3)
    out = b""
    while ch.recv_ready():
        out += ch.recv(4096)
    return out.decode("utf-8", errors="replace").strip()


print("[1] opacity:0 in /ru :", cmd('curl -s http://127.0.0.1:3000/ru | grep -c "opacity:0"'))
print("[2] opacity:0 in /en :", cmd('curl -s http://127.0.0.1:3000/en | grep -c "opacity:0"'))
print("[3] H1 tag           :", cmd('curl -s http://127.0.0.1:3000/ru | grep -oE "<h1[^>]*>" | head -1'))
print(
    "[4] env in process   :",
    cmd(
        'PID=$(pgrep -f "next-server" | head -1); '
        'cat /proc/$PID/environ 2>/dev/null | tr "\\0" "\\n" | grep -E "^(BUILD_ID|NEXT_SERVER_ACTIONS_ENCRYPTION_KEY)=" | awk -F= "{print \\$1\\"=\\"length(\\$2)\\"chars\\"}"'
    ),
)
print("[5] non-existent slug:", cmd('curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/ru/blog/__nonexistent__'))
print("[6] pm2 status       :", cmd('pm2 list 2>&1 | grep radukan'))
print(
    "[7] SA errors recent :",
    cmd('tail -200 /root/.pm2/logs/radukan-error.log 2>&1 | grep -c "Failed to find Server Action"'),
)
print("[8] error log size   :", cmd('wc -l /root/.pm2/logs/radukan-error.log'))
print("[9] all routes 200   :")
print(
    cmd(
        'BASE="http://127.0.0.1:3000"; for p in /ru /en /ru/about /ru/blog /ru/projects /ru/contact /ru/tools; do code=$(curl -s -o /dev/null -w "%{http_code}" -L "$BASE$p"); echo "  $code $p"; done'
    )
)
ssh.close()
