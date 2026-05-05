import paramiko
import os

os.environ["PYTHONIOENCODING"] = "utf-8"

HOST = "188.225.58.19"
USER = "root"
PASS = "e#ka#m,5S-U-KX"


def run(ssh, cmd, timeout=30):
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

print(f"\n{'='*60}\n[1] Resolve raducan.pro via 8.8.8.8 from VPS\n{'='*60}")
run(ssh, "dig +short raducan.pro @8.8.8.8 2>&1 || nslookup raducan.pro 8.8.8.8 2>&1")

print(f"\n{'='*60}\n[2] Resolve via 1.1.1.1 from VPS\n{'='*60}")
run(ssh, "dig +short raducan.pro @1.1.1.1 2>&1 || nslookup raducan.pro 1.1.1.1 2>&1")

print(f"\n{'='*60}\n[3] NS records for raducan.pro\n{'='*60}")
run(ssh, "dig NS raducan.pro @8.8.8.8 +short 2>&1 || host -t NS raducan.pro 8.8.8.8 2>&1")

print(f"\n{'='*60}\n[4] Curl raducan.pro using its public IP via Host header (correct SNI)\n{'='*60}")
run(
    ssh,
    "curl -sI --resolve raducan.pro:443:188.225.58.19 -o /dev/null -w 'raducan.pro via direct IP: HTTP %{http_code} time=%{time_total}s\\n' https://raducan.pro 2>&1",
)

print(f"\n{'='*60}\n[5] Verbose curl for raducan.pro\n{'='*60}")
run(
    ssh,
    "curl -vI --resolve raducan.pro:443:188.225.58.19 --max-time 10 https://raducan.pro 2>&1 | head -30",
)

print(f"\n{'='*60}\n[6] openssl handshake to raducan.pro with correct SNI\n{'='*60}")
run(
    ssh,
    "echo | openssl s_client -servername raducan.pro -connect 127.0.0.1:443 2>&1 | head -20",
)

ssh.close()
