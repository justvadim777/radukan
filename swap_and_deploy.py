import paramiko
import os

os.environ["PYTHONIOENCODING"] = "utf-8"

HOST = "188.225.58.19"
USER = "root"
PASS = "e#ka#m,5S-U-KX"

def run(ssh, cmd, timeout=600):
    print(f"\n>>> {cmd[:100]}")
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
    lines = text.strip().split("\n")
    for line in lines[-25:]:
        try:
            print(line)
        except UnicodeEncodeError:
            print(line.encode("ascii", errors="replace").decode())
    return code

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
print(f"Connecting to {HOST}...")
ssh.connect(HOST, username=USER, password=PASS, timeout=30, banner_timeout=30)
print("Connected!\n")

steps = [
    ("Add 2GB swap", """
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo 'Swap created'
else
  swapon /swapfile 2>/dev/null; echo 'Swap exists'
fi
free -h
"""),
    ("Pull latest", "cd /root/radukan && git pull origin main"),
    ("Install deps", "cd /root/radukan && npm install"),
    ("Build", "cd /root/radukan && NODE_OPTIONS='--max-old-space-size=1024' npm run build"),
    (
        "Restart PM2 (with env reload)",
        "cd /root/radukan && pm2 restart radukan --update-env && pm2 save",
    ),
]

for desc, cmd in steps:
    print(f"\n{'='*50}")
    print(f"[*] {desc}...")
    print(f"{'='*50}")
    code = run(ssh, cmd, 600)
    if code != 0 and desc == "Build":
        print(f"Build failed with code {code}")
        ssh.close()
        exit(1)

print(f"\n{'='*50}")
print("DEPLOY COMPLETE!")
print("https://raducan.pro")
print(f"{'='*50}")

ssh.close()
