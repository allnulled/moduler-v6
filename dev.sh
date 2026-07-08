#!/usr/bin/bash

DIR2="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$DIR2"

# pwd > cwd.txt
# -x 'node dev/build.js @{refrescador.file}' \

/usr/bin/refrescador \
    -w "$(pwd)" \
    -i "**/node_modules/**/*" \
    -i "**/dist/**/*" \
    -i "**/*.dist.*" \
    -i "**/logs/**/*" \
    -i "**/test/assets/unit/202/**/*" \
    -p "3004" \
    -d 0 \
    -e "sh" \
    -e "ts" \
    -e "tsx" \
    -e "txt" \
    -e "js" \
    -e "json" \
    -e "css" \
    -e "html" \
    -e "md" \
    -x 'node dev/build.js @{refrescador.file}' \
    -x 'node test/runner.js @{refrescador.file}' \
    -mf "TODO.md" \
