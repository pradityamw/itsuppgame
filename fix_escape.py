import re

filepath = r'c:\Users\DELL\Documents\itsupsimulator\lib\missionLearning.js'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# The bad string in the file: that\\'s (4 chars: backslash backslash apostrophe s)
# We want: that's
bad = "that\\\\'s real money"
good = "that's real money"

if bad in content:
    fixed = content.replace(bad, good)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(fixed)
    print("Fixed successfully!")
else:
    # Try alternative - find and show what's around line 1301
    lines = content.split('\n')
    line = lines[1300]  # 0-indexed
    print("Line 1301 content around 'real money':")
    idx = line.find('real money')
    if idx != -1:
        print(repr(line[max(0,idx-30):idx+20]))
    else:
        print("'real money' not found on line 1301")
        # search all lines
        for i, l in enumerate(lines):
            if 'real money' in l:
                print(f"Found on line {i+1}:")
                idx2 = l.find('real money')
                print(repr(l[max(0,idx2-30):idx2+20]))
