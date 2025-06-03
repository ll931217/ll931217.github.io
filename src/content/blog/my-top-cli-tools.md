---
title: My Top CLI tools
date: '2025-06-03:00:00.000Z'
author: Liang-Shih Lin
excerpt: CLI tools that I love and use most of the time in my development workflow.
tags:
  - CLI
  - bash
---
# My Top CLI tools

I love the terminal, I love typing in some command and it will produce the result I want. I work inside the terminal for about 80% of my day.

Here is a list of the CLI tools I use almost daily:

## [LazyGit](https://github.com/jesseduffield/lazygit)

![lazygit](https://github.com/jesseduffield/lazygit/raw/assets/demo/commit_and_push-compressed.gif)

This has been the tool that helps me use git with ease, very simple CLI that uses vim keybinds to navigate.

## [LazyDocker](https://github.com/jesseduffield/lazydocker)

![lazydocker](https://github.com/jesseduffield/lazydocker/raw/master/docs/resources/demo3.gif)

Created by the same author as [LazyGit](#lazygithttpsgithubcomjesseduffieldlazygit), this tool helped me so much when Linux didn't have Docker Desktop, ever since using it I couldn't go back to docker desktop. I can easily manage my docker containers through this TUI.

## [btop](https://github.com/aristocratos/btop)

![btop](https://github.com/aristocratos/btop/raw/main/Img/normal.png)

A `top` or `htop` replacement, that has a modern interface.

## [yazi](https://yazi-rs.github.io/)

I use this as my file explorer and as my navigation tool. You can open tabs, copy/cut/paste between these tabs.

I have added a custom bash function that helps `cd` to where I navigated to:

```bash
function y() {
 local tmp="$(mktemp -t "yazi-cwd.XXXXXX")"
 yazi "$@" --cwd-file="$tmp"
 if cwd="$(/usr/bin/cat -- "$tmp")" && [ -n "$cwd" ] && [ "$cwd" != "$PWD" ]; then
  builtin cd -- "$cwd"
 fi
 rm -f -- "$tmp"
}
```

## Neovim + tmux

This is my main development setup, I can't go back to vscode anymore since removing the time that it takes for me to reach the cursor, find the cursor on screen, click the item I want then move the hand back to the table has helped improved my productivity many times over.

## [Aider Chat](https://aider.chat/)

![aider-chat](https://aider.chat/assets/shell-cmds-small.mp4)

When using AI in my development workflow, I don't want to keep having multiple subscriptions to different services, I like just having one and being able to access them all. That is why I subbed to [OpenRouter](https://openrouter.ai/), the only downside for OpenRouter is that it only has the completion models, it doesn't have access to models specialised for other areas such as embeddings.

With Aider Chat, I can't interact with any OpenAI compatible LLM, in this case is OpenRouter, then add files to the context and allow Aider Chat to help me figure things out or implement features.

I am still waiting for the [MCP server feature](https://github.com/Aider-AI/aider/pull/3937) to be implemented, this should make Aider Chat even more useful.

