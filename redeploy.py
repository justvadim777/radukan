import paramiko
import os

os.environ["PYTHONIOENCODING"] = "utf-8"

HOST = "188.225.58.19"
USER = "root"
PASS = "e#ka#m,5S-U-KX"

def run(ssh, cmd, timeout=300):
    print(f"\n>>> {cmd[:120]}")
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    code = stdout.channel.recv_exit_status()
    lines = (out + err).strip().split("\n")
    for line in lines[-20:]:
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

steps = [
    ("Pull latest", "cd /root/radukan && git pull origin main", 30),
    ("Install deps", "cd /root/radukan && npm install", 120),
    ("Build", "cd /root/radukan && npm run build", 300),
    ("Restart PM2", "cd /root/radukan && pm2 restart radukan && pm2 save", 15),
]

for desc, cmd, t in steps:
    print(f"\n{'='*50}")
    print(f"[*] {desc}...")
    print(f"{'='*50}")
    run(ssh, cmd, t)

print(f"\n{'='*50}")
print("REDEPLOY COMPLETE!")
print("https://raducan.pro")
print(f"{'='*50}")

ssh.close()
