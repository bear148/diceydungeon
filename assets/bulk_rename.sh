#!/bin/bash

# Usage: ./bulk_rename.sh [directory] [base_name] [extension]

# Example: ./bulk_rename.sh ./images photo jpg
# This renames all files in ./images to photo1.jpg, photo2.jpg, ...

# Get arguments
TARGET_DIR=${1:-.}
BASE_NAME=${2:-file}
EXTENSION=${3:-}

# Confirm extension pattern
if [ -n "$EXTENSION" ]; then
    EXT_PATTERN="*.$EXTENSION"
else
    EXT_PATTERN="*"
fi

cd "$TARGET_DIR" || { echo "Directory not found"; exit 1; }

i=1
for FILE in $EXT_PATTERN; do
    # Skip directories
    if [ -d "$FILE" ]; then
        continue
    fi

    # Get actual extension if not provided
    if [ -z "$EXTENSION" ]; then
        EXT="${FILE##*.}"
    else
        EXT="$EXTENSION"
    fi

    NEW_NAME="${BASE_NAME}${i}.${EXT}"

    # Rename the file
    mv -i -- "$FILE" "$NEW_NAME"

    ((i++))
done

echo "Renamed $((i-1)) file(s)."
