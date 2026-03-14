Write-Host "-----------------------------"
Write-Host "       Git Commit Helper"
Write-Host "-----------------------------"

$title = Read-Host "Title"
$description = Read-Host "Description"

git add .

git commit -m "$title" -m "$description"

Write-Host "Commit created successfully."