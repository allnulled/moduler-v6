#!/usr/bin/bash

node up-cleaner.js

cat COMMIT.md

echo ''
echo ''

read -p "Is that commit message okay? [y/N] " r

if [[ "$r" =~ ^[Yy]$ ]]; then
    git add .
    git commit -F COMMIT.md
    git push
    cp COMMIT.md COMMIT-PREVIOUS.md
    : > COMMIT.md
    cd ../moduler-v6-starter
    git add .
    git commit -F ../moduler-v6/COMMIT-PREVIOUS.md
    git push
    cd ../moduler-v6
    echo "Updated both projects: moduler-v6 and moduler-v6-starter"
fi

