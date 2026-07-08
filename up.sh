#!/usr/bin/bash

cat COMMIT.md

read -p "Is that commit message okay? [y/N] " r

if [[ "$r" =~ ^[Yy]$ ]]; then
    git add .
    git commit -F COMMIT.md
    git push
    cp COMMIT.md COMMIT-PREVIOUS.md
    : > COMMIT.md
fi

