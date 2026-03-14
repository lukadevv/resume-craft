Write-Host "-----------------------------"
Write-Host "       Git Commit Helper"
Write-Host "-----------------------------"

# 1. Get current branch automatically
$branch = (git branch --show-current).Trim()

if (-not $branch) {
    Write-Host "Error: Not in a Git repository." -ForegroundColor Red
    exit
}

# 2. Get commit details
$title = Read-Host "Commit title"
$description = Read-Host "Commit description"

# 3. Add and commit
git add .
git commit -m "$title" -m "$description"

if ($LASTEXITCODE -eq 0) {
    # 4. Push to remote
    git push -u origin $branch
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nPush successful!" -ForegroundColor Green

        # 5. ASK THE QUESTION
        $deleteAnswer = Read-Host "Do you want to delete branch '$branch' locally and remotely? (y/n)"
        
       
        Write-Host "Branch '$branch' kept." -ForegroundColor Gray
    }
} else {
    Write-Host "Commit failed. Check for errors." -ForegroundColor Red
}
