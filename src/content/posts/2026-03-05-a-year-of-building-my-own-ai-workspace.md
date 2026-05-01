---
title: "A year of building my own AI workspace"
date: 2026-03-05
type: note
---

A year ago I started building my own AI workspace. Not a wrapper. The actual low-level thing — streaming APIs, tool execution, prompt pipelines. It runs inside Neovim and talks to Anthropic, OpenAI and Google directly.

I built it because I needed it for work — as simple as that. PRDs, statements of work, R&D spikes, client documentation, training materials from video transcriptions. Every feature exists because a real problem demanded it.

Here's what I learned.

1. **Own your workspace.** Models come and go. The workspace you build around them is yours. The difference between a generic chat UI and a workspace you control is the same difference between Notepad and Vim. Most people don't need that level of control. But if you're trying to push what's possible with AI, it changes everything. Something doesn't work the way you want? You fix it. You don't file a feature request.

2. **Tool calling is half the moat.** Once your AI can use tools, you'd think you need dozens. You don't. Bash, read, edit and write. Four tools. [Mario Zechner](https://marioslab.io/) proved this with Pi — a minimal coding agent that's competitive with far heavier tools using nothing but those four. MCP is a nice incremental improvement but tool calling itself is the giant leap. The moment your model can read a file, run a command and write the result back — that's when it stops being a chatbot and starts being useful.

3. **Prompt engineering is the other half.** Tool calling only gets you so far. Your workspace is only as good as the agents you build and the prompts you write. I use [Simon Willison's definition](https://simonwillison.net/) of "agent" here — an LLM that iteratively reasons, calls tools, processes results and repeats until the task is done. The quality of that loop depends entirely on how well you set it up.

4. **There is NO magic.** When I started, tools like Claude Code felt almost magical. After a year of building the same kind of system from the ground up they feel less like magic and more like carefully crafted software doing a lot of clever things under the hood. Clever != Magic. Understanding what's actually going on has made me a better engineer, not just a better user of these tools.

My advice: go one level lower than you think you need to. Not another abstraction on top of an abstraction. Not another AI SDK wrapper. Build the actual thing. Write your own agents. Wire up your own tool execution. Parse your own streaming responses. The best way to understand AI tooling is to build it yourself. That's where the real learning happens.

I open-sourced everything I built — [Flemma](https://github.com/Flemma-Dev/flemma.nvim).
