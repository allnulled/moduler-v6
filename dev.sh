#!/usr/bin/bash

DIR2="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$DIR2"

# pwd > cwd.txt
# -x 'node dev/build.js @{refrescador.file}' \

/usr/bin/refrescador \
    -w "$(pwd)" \
    -i "**/node_modules/**/*" \
    -i "**/dist/**/*" \
    -i "**/trash/**/*" \
    -i "**/src-tmp/**/*" \
    -i "**/refrescador/**/*" \
    -i "**/src/external/**/*.entry.js" \
    -i "**/src/www/external/**/*.entry.js" \
    -i "**/*.{dist,ign}.*" \
    -i "**/logs/**/*" \
    -i "**/test/assets/unit/{202,203,204,205,401,407,410,412,418,421}/**/*" \
    -i "**/test/errors.txt" \
    -i "**/dev/unlistened.json" \
    -i "**/dev/listened.json" \
    -p "3004" \
    -i "**/test/assets/unit/202/**/*" \
    -l "**/test/**/*.run.js" \
    -lc "$(pwd)/dev/listened.json" \
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
