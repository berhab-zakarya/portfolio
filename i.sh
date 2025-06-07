#!/bin/bash

# Force exit on error
set -e

# Install main dependencies
echo "Installing lucide-react, class-variance-authority, and @radix-ui/react-slot..."
npm install lucide-react class-variance-authority @radix-ui/react-slot

# List of shadcn-ui components to add
components=(
  button
  input
  label
  textarea
  card
  dialog
  select
  separator
  badge
  breadcrumb
  dropdown-menu
  sidebar
)

# Loop through and add components with --force
for component in "${components[@]}"; do
  echo "Adding component: $component"
  npx shadcn@latest add "$component" 
done

echo "✅ All components installed with --force!"
