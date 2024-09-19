#!/bin/bash



#! NOT WORKING




# Check if version is provided
if [ -z "$1" ]
then
    echo "No version argument supplied"
    exit 1
fi

# # Create a new branch
# git checkout -b v-$1

# Update version in Cargo.toml
find . -name "Cargo.toml" -exec sed -i "s/^version = .*/version = \"$1\"/" {} \;

# Update version in Dockerfile
sed -i "s/^LABEL version=.*/LABEL version=\"$1\" \/" Dockerfile

# # Add changes to git
# git add Cargo.toml Dockerfile

# # Commit changes
# git commit -m "Update version to $1"

# # Push changes to the new branch
# git push origin v-$1

# echo "Version updated to $1 and pushed to new branch v-$1"
