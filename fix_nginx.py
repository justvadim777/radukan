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

# Step 1: PM2 cleanup
print(f"\n{'='*60}\n[1] PM2 reset + flush\n{'='*60}")
run(ssh, "pm2 reset radukan && pm2 flush radukan && pm2 status")

# Step 2: Check nginx version
print(f"\n{'='*60}\n[2] Nginx version\n{'='*60}")
run(ssh, "nginx -v 2>&1")

# Step 3: Show current config (BEFORE)
print(f"\n{'='*60}\n[3] Current config /etc/nginx/sites-available/radukan\n{'='*60}")
run(ssh, "cat /etc/nginx/sites-available/radukan 2>&1")

ssh.close()
