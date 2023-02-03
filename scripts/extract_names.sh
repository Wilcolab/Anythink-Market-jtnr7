#!/bin/bash

# Check if a file was provided as an argument

if [ $# -eq 0 ]
then
    echo "Error: No file provided."
    exit 1
fi

#Store the file path
file=$1
OLDIFS=$IFS
IFS=$'\n'
#Use grep to count the number of lines that contain "amazon.com"
amazon_lines=($(grep -i "@amazon.com" "$file"))
for line in "${amazon_lines[@]}"; do
 echo "$line" | awk -F, '{print $3 " "  $2}' >> output_names.txt
done
IFS=$OLDIFS

