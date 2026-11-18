"""Local Flask host for the Moa frontend. Run start.bat on Windows."""

import argparse
import http.client
import json
import os
from pathlib import Path
import socket
import subprocess
import sys
import threading
import time
import uuid
import webbrowser

from flask import Flask, render_template
from werkzeug.serving import make_server

PROJECT_ROOT = Path(__file__).resolve().parent
HOST = "127.0.0.1"
PORT = 5000
ADDRESS = f"http://{HOST}:{PORT}/"
app = Flask(
    __name__,
    template_folder=str(PROJECT_ROOT / "templates"),
    static_folder=str(PROJECT_ROOT / "static"),
)


@app.get("/")
@app.get("/index.html")
def index():
    return render_template("index.html")


@app.get("/healthz")
def health():
    return {
        "service": "moa",
        "status": "ok",
        "pid": os.getpid(),
        "instance": app.config.get("MOA_INSTANCE", ""),
    }


@app.get("/favicon.ico")
def favicon():
    # No icon asset is configured. Avoid the browser's automatic 404 request.
    return "", 204


def report_port_owner():
    """Read port ownership only; never stop another process."""
    if os.name != "nt":
        print("Check the listener with: lsof -nP -iTCP:5000 -sTCP:LISTEN", flush=True)
        return
    command = (
        "$ErrorActionPreference='Stop'; "
        "$listeners=Get-NetTCPConnection -LocalPort 5000 -State Listen; "
        "$listeners | Select-Object -ExpandProperty OwningProcess -Unique | "
        "ForEach-Object { Get-CimInstance Win32_Process -Filter ('ProcessId=' + $_) } | "
        "Select-Object ProcessId,Name,ExecutablePath,CommandLine | Format-List | Out-String -Width 240"
    )
    try:
        result = subprocess.run(
            ["powershell.exe", "-NoProfile", "-NonInteractive", "-Command", command],
            capture_output=True, text=True, errors="replace", timeout=12,
        )
        if result.returncode == 0 and result.stdout.strip():
            print(result.stdout.strip(), flush=True)
            return
    except (OSError, subprocess.TimeoutExpired):
        pass
    print("Process details unavailable. Listener PID(s) from netstat:", flush=True)
    try:
        result = subprocess.run(
            ["netstat", "-ano", "-p", "tcp"],
            capture_output=True, text=True, errors="replace", timeout=8,
        )
        for line in result.stdout.splitlines():
            fields = line.split()
            if len(fields) >= 5 and fields[1].endswith(":5000") and fields[-2] == "LISTENING":
                print(line.strip(), flush=True)
    except (OSError, subprocess.TimeoutExpired) as error:
        print(f"Could not inspect the port: {error}", flush=True)


def check_port_available():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as probe:
        if os.name == "nt":
            # Windows normally allows socket reuse; require an unoccupied port.
            probe.setsockopt(socket.SOL_SOCKET, socket.SO_EXCLUSIVEADDRUSE, 1)
        try:
            probe.bind((HOST, PORT))
        except OSError as error:
            print(f"Port {PORT} is unavailable: {error}", flush=True)
            report_port_owner()
            print("No process was stopped. Close the conflicting server yourself, then run start.bat again.", flush=True)
            return False
    return True


def verify_and_open_browser(instance, failed, server=None, open_browser=False):
    """Verify this process's identity and both page URLs before opening a tab."""
    last_error = "No response"
    for _ in range(20):
        try:
            connection = http.client.HTTPConnection(HOST, PORT, timeout=1)
            try:
                connection.request("GET", "/healthz")
                response = connection.getresponse()
                status = json.loads(response.read())
                if response.status != 200 or status.get("instance") != instance or status.get("pid") != os.getpid():
                    raise RuntimeError("Port 5000 responded from a different server instance.")
                for path in ("/", "/index.html"):
                    connection.request("GET", path)
                    page = connection.getresponse()
                    page.read()
                    if page.status != 200:
                        raise RuntimeError(f"Startup check failed: GET {path} -> {page.status}")
            finally:
                connection.close()
            print(f"Verified Flask PID {os.getpid()}: GET / -> 200; GET /index.html -> 200", flush=True)
            if open_browser:
                try:
                    if not webbrowser.open(ADDRESS):
                        print(f"Browser did not open automatically. Open {ADDRESS} manually.", flush=True)
                except Exception as error:
                    print(f"Browser could not open: {error}. Open {ADDRESS} manually.", flush=True)
            return
        except (OSError, ValueError, RuntimeError, http.client.HTTPException) as error:
            last_error = str(error)
            time.sleep(0.2)
    failed.set()
    print(f"Server startup could not be verified: {last_error}", flush=True)
    if server is not None:
        server.shutdown()


def main():
    parser = argparse.ArgumentParser(description="Moa local learning workspace")
    parser.add_argument("--open-browser", action="store_true")
    parser.add_argument("--debug", action="store_true", help="Development only")
    args = parser.parse_args()
    print(f"\nProject: {PROJECT_ROOT}\nApp: {Path(__file__).resolve()}\nPython: {sys.executable}\nPID: {os.getpid()}", flush=True)
    if not check_port_available():
        raise SystemExit(1)
    instance = uuid.uuid4().hex
    app.config["MOA_INSTANCE"] = instance
    failed = threading.Event()
    try:
        if args.debug:
            # Explicit opt-in only. Disable the reloader to avoid duplicate tabs.
            if args.open_browser:
                threading.Thread(
                    target=verify_and_open_browser,
                    args=(instance, failed), kwargs={"open_browser": True}, daemon=True,
                ).start()
            app.run(host=HOST, port=PORT, debug=True, use_reloader=False)
            return
        # Bind before opening the browser so port conflicts never open a wrong site.
        server = make_server(HOST, PORT, app, threaded=True)
        print(
            f"\n * Running on {ADDRESS}\n"
            "Keep this window open while using Moa.\n"
            "Closing it or pressing Ctrl+C stops the local server.\n",
            flush=True,
        )
        verifier = threading.Thread(
            target=verify_and_open_browser,
            args=(instance, failed, server, args.open_browser), daemon=True,
        )
        verifier.start()
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nMoa server stopped.", flush=True)
        finally:
            server.server_close()
        if failed.is_set():
            raise SystemExit(1)
    except OSError as error:
        print(f"Server failed: {error}", flush=True)
        raise SystemExit(1) from error


if __name__ == "__main__":
    main()
