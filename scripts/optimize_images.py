#!/usr/bin/env python3
import os
import shutil
from PIL import Image

SRC = os.path.join('assets', 'images')
BACKUP = os.path.join(SRC, 'originals')
THRESHOLD_JPEG = 500 * 1024  # 500 KB
THRESHOLD_PNG = 200 * 1024   # 200 KB
MAX_WIDTH = 1920
JPEG_QUALITY = 80

os.makedirs(BACKUP, exist_ok=True)

def human(n):
    for unit in ['B','KB','MB','GB']:
        if n < 1024.0:
            return f"{n:.1f}{unit}"
        n /= 1024.0
    return f"{n:.1f}TB"

optimized = []
for fname in sorted(os.listdir(SRC)):
    path = os.path.join(SRC, fname)
    if os.path.isdir(path):
        continue
    lower = fname.lower()
    try:
        size_before = os.path.getsize(path)
    except OSError:
        continue

    # JPEG / JPEG-like
    if lower.endswith(('.jpg', '.jpeg')):
        if size_before <= THRESHOLD_JPEG:
            continue
        backup_path = os.path.join(BACKUP, fname)
        if not os.path.exists(backup_path):
            shutil.copy2(path, backup_path)
        try:
            img = Image.open(path)
            img = img.convert('RGB')
            if img.width > MAX_WIDTH:
                h = int(MAX_WIDTH * img.height / img.width)
                img = img.resize((MAX_WIDTH, h), Image.LANCZOS)
            img.save(path, format='JPEG', quality=JPEG_QUALITY, optimize=True, progressive=True)
            size_after = os.path.getsize(path)
            optimized.append((fname, size_before, size_after))
        except Exception as e:
            print('error processing', fname, e)

    # PNG (skip logos)
    elif lower.endswith('.png'):
        if 'logo' in lower:
            continue
        if size_before <= THRESHOLD_PNG:
            continue
        backup_path = os.path.join(BACKUP, fname)
        if not os.path.exists(backup_path):
            shutil.copy2(path, backup_path)
        try:
            img = Image.open(path)
            img.save(path, optimize=True)
            size_after = os.path.getsize(path)
            optimized.append((fname, size_before, size_after))
        except Exception as e:
            print('error processing', fname, e)

if optimized:
    print('Optimized files:')
    for n, b, a in optimized:
        print(f'- {n}: {human(b)} -> {human(a)}')
else:
    print('No files needed optimization (thresholds: JPEG 500KB, PNG 200KB).')

print('\nBackups (if any) stored in:', BACKUP)
