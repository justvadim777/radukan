import paramiko
import os

os.environ["PYTHONIOENCODING"] = "utf-8"

HOST = "188.225.58.19"
USER = "root"
PASS = "e#ka#m,5S-U-KX"

def run(ssh, cmd, timeout=120):
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

print("=" * 50)
print("[1/2] Installing Certbot...")
print("=" * 50)
run(ssh, "apt install -y certbot python3-certbot-nginx", 60)

print("\n" + "=" * 50)
print("[2/2] Getting SSL certificate...")
print("=" * 50)
run(ssh, "certbot --nginx -d raducan.pro -d www.raducan.pro --non-interactive --agree-tos -m vadim@radukan.ru --redirect", 120)

print("\n" + "=" * 50)
print("SSL SETUP COMPLETE!")
print("Site is live at https://raducan.pro")
print("=" * 50)

ssh.close()
