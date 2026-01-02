import time, uuid
import psutil
from pynput import keyboard, mouse
import threading
import requests

AGENT_ID = str(uuid.uuid4())
SERVER = "http://localhost:8000/telemetry"  # backend endpoint (we will create it next)

key_events = []
mouse_events = []
active_window_changes = []

# ---------- KEYBOARD ----------
def on_press(key):
    t = time.time()
    is_backspace = (key == keyboard.Key.backspace)
    key_events.append(("down", t, is_backspace))

# ---------- MOUSE ----------
def on_move(x, y):
    mouse_events.append(("move", time.time(), x, y))

# ---------- ACTIVE WINDOW ----------
def window_watcher():
    last_app = None
    while True:
        try:
            # App switch detection (simple)
            active_proc = psutil.Process().name()
            if active_proc != last_app:
                last_app = active_proc
                active_window_changes.append((time.time(), active_proc))
        except:
            pass
        time.sleep(1)

# ---------- SEND METRICS ----------
def metrics_sender():
    while True:
        time.sleep(20)  # send every 20 seconds

        # Keypress metrics
        keystrokes = [e for e in key_events if e[0] == "down"]
        if len(keystrokes) > 1:
            times = [e[1] for e in keystrokes]
            intervals = [t2 - t1 for t1, t2 in zip(times, times[1:])]
            avg_key_interval = sum(intervals) / len(intervals)
            backspace_rate = sum(1 for e in keystrokes if e[2]) / len(keystrokes)
        else:
            avg_key_interval = 0
            backspace_rate = 0

        # Mouse metrics
        mouse_move_count = len([e for e in mouse_events if e[0] == "move"])

        # App switch count
        app_switch_count = len(active_window_changes)

        payload = {
            "agent_id": AGENT_ID,
            "timestamp": time.time(),
            "avg_key_interval": avg_key_interval,
            "backspace_rate": backspace_rate,
            "mouse_move_count": mouse_move_count,
            "app_switch_count": app_switch_count,
        }

        print("Sending:", payload)

        try:
            requests.post(SERVER, json=payload)
        except Exception as e:
            print("Error:", e)

        # Clear buffers
        key_events.clear()
        mouse_events.clear()
        active_window_changes.clear()

# ---------- MAIN ----------
if __name__ == "__main__":
    print("Agent started...")

    keyboard.Listener(on_press=on_press).start()
    mouse.Listener(on_move=on_move).start()

    threading.Thread(target=window_watcher, daemon=True).start()
    threading.Thread(target=metrics_sender, daemon=True).start()

    while True:
        time.sleep(1)
