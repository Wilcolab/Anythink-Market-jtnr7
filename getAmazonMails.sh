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
count=0
for line in "${amazon_lines[@]}"; do
 echo "$line" | awk -F, '{print "\033[32mName: \033[0m" $3 " "  $2 " \033[32mEmail: \033[0m"  $4}'
 count=$((count + 1))
done
echo -e "\033[31mTotal: $count intruders"
IFS=$OLDIFS

