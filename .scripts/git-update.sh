#!/bin/bash

echo "Enter commit title:"
read title

echo "Enter commit description:"
read description

git add .

git commit -m "$title" -m "$description"

echo "Commit created successfully."