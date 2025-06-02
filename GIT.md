# Git Rebase Conventions for Development Team

---

### Purpose

This document defines the standard conventions and best practices for using `git rebase` in our development workflow. Proper use of rebasing helps maintain a clean, readable, and linear Git history, simplifying collaboration and code reviews.

---

### 1. What is `git rebase`?

`git rebase` allows developers to move or combine a sequence of commits to a new base commit. This is especially useful for integrating changes from the main branch into a feature branch or for cleaning up commit history before merging.

---

### 2. Standard Rebase Workflow

#### 2.1. Rebase Feature Branch onto Main

Always rebase your local feature branch on top of the latest `main` before opening a merge request:

```bash
# Step 1: Switch to your feature branch
$ git checkout feature-branch

# Step 2: Fetch the latest changes from origin
$ git fetch origin

# Step 3: Rebase your feature branch onto the latest main
$ git rebase origin/main
```

#### 2.2. Resolve Conflicts Promptly

During rebasing, conflicts may arise. Resolve each conflict manually, then continue the rebase:

```bash
$ git add <resolved-files>
$ git rebase --continue
```

---

### 3. Interactive Rebase for Commit Cleanup

Use interactive rebase to squash, reorder, or edit commit messages:

```bash
$ git rebase -i HEAD~<n>
```

Where `<n>` is the number of commits you want to view and possibly modify.

Use the following keywords during interactive rebase:

-   `pick` (use the commit)
-   `squash` (combine with previous commit)
-   `reword` (edit commit message)
-   `drop` (remove commit)

---

### 4. Avoid Rebasing Shared Branches

**Do not rebase branches that have already been pushed and shared with others.**
Rewriting public history can cause confusion and conflicts among collaborators.

Only rebase branches that:

-   Are local to your machine
-   Have not yet been merged or pushed

---

### 5. Use `--autosquash` with Fixups

Prepare fixup commits for squashing using:

```bash
$ git commit --fixup=<commit-hash>
$ git rebase -i --autosquash HEAD~<n>
```

This automates the process of squashing related commits, improving consistency.

---

### 6. Push After Rebase

After rebasing, a force push is required to update the remote branch:

```bash
$ git push --force-with-lease
```

> Use `--force-with-lease` to safely update the branch without overwriting others' changes.

---

### 7. Commit Message Guidelines

All commits should follow this format:

```
<type>: <short summary>

Longer description if necessary.
Refs: #issue-number
```

Common types include:

-   `feat`: New feature
-   `fix`: Bug fix
-   `docs`: Documentation changes
-   `style`: Code style (formatting, missing semi-colons, etc.)
-   `refactor`: Code refactoring without changing functionality
-   `test`: Adding or updating tests
-   `chore`: Maintenance or build tasks (e.g., updating build scripts, dependency updates, CI/CD adjustments)

---

### 8. Visual Guide: Rebasing with Fork Git Client

For developers using the Fork Git client, the following visual guide demonstrates how to rebase using the GUI:

![Fork Git Client - Rebase](https://git-fork.com/images/interactiveRebase.jpg)

**Steps to Perform a Rebase in Fork:**

1. Open your repository in Fork.
2. Check out your feature branch.
3. Right-click on the branch you want to rebase onto (e.g., `main`).
4. Select `Rebase onto <branch>`.
5. Resolve any conflicts if prompted.
6. Confirm and complete the rebase.

For interactive rebase, use the history view to reorder, squash, or edit commits.

---

### Summary

-   Rebase frequently to keep branches up to date.
-   Clean up commits using interactive rebase before merging.
-   Never rebase shared branches.
-   Use `--force-with-lease` when pushing after a rebase.
-   GUI users can perform rebase easily using tools like Fork.
