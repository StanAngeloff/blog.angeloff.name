---
title: "Teaching tmux to babysit my Claude Code agents"
date: 2026-05-29
dictated: true
mastodon: https://mastodon.social/@stanangeloff/116730574811459598
---

If you are like me, you no longer run one Claude Code session — you run a small fleet. One window is building a feature in a TypeScript monorepo, another is reviewing a colleague's pull request, a third is chasing a redraw bug in a Neovim plugin. tmux makes this easy: a window per agent, <kbd>Alt</kbd> + <kbd>1</kbd>–<kbd>9</kbd> to jump between them. Often they are not even different projects — just git worktrees of the same repo, one agent per branch.

The trouble starts at three or four agents. You burn time cycling through windows playing twenty questions with yourself: is this one still working? Has that one stopped to ask me something? Did the one from ten minutes ago finish, or is it waiting on me to approve a `git push`? An agent is autonomous right up until the moment it needs you — and out of the box it has no way to tap you on the shoulder.

Hacker News is full of the fix: a new wave of agent-runner tools, many with a column of vertical tabs, one per agent, each lighting up when it wants attention — [Cursor's v3 rewrite][hn-cursor3], an ["IDE for the agents era"][hn-superset], ["sandboxed coding agents for a team"][hn-runtime] and [Google's Antigravity][hn-antigravity2], now on its second version. These do far more than light up a tab — PR workflows, GitHub integration, sandboxing, team orchestration — and I will probably borrow ideas from them. But I live in tmux all day, and all I wanted was the small part: a glanceable sense of which agent needs me. That does not need a new IDE, just the windows I already have open.

So I taught tmux to show it. Every window now carries a coloured dot for the Claude Code session inside it:

<style>
  /* Post-local styles, kept out of the site-wide stylesheet. */

  /* Coloured circle markers for the amber / green key. */
  .prose ul.dot-key li:nth-child(1)::marker { color: #c2810f; }
  .prose ul.dot-key li:nth-child(2)::marker { color: #2e8b3d; }
  .prose ul.dot-key li:nth-child(3)::marker { content: "\25CB  "; }
  [data-theme="dark"] .prose ul.dot-key li:nth-child(1)::marker { color: #e0a73a; }
  [data-theme="dark"] .prose ul.dot-key li:nth-child(2)::marker { color: #4caf50; }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) .prose ul.dot-key li:nth-child(1)::marker { color: #e0a73a; }
    :root:not([data-theme="light"]) .prose ul.dot-key li:nth-child(2)::marker { color: #4caf50; }
  }

  /* tmux status-bar mock-up (xterm-256 colours from the config). */
  .tmux-figure { margin: 0 0 1.5rem; }
  .tmux-bar {
    display: flex;
    align-items: stretch;
    font-family: var(--mono);
    font-size: 0.875rem;
    color: #9e9e9e;
    background: #080808;
    border: 1px solid var(--ink-faint);
    overflow-x: auto;
    white-space: nowrap;
    padding: 0;
  }
  .tmux-bar > span { display: inline-flex; align-items: center; padding: 0.4rem 1ch; }
  .tmux-bar .tb-session { background: #808080; color: #d0d0d0; margin-right: 1.2ch; }
  .tmux-bar .tb-cur { background: #00afff; color: #000; }
  .tmux-bar .tb-dot { margin: 0 0.3ch; }
  .tmux-bar .tb-amber { color: #ffaf00; }
  .tmux-bar .tb-green { color: #00af00; }
  .tmux-figure figcaption {
    font-family: var(--mono);
    font-size: 0.75rem;
    line-height: 1.5;
    color: var(--ink-mute);
    margin-top: 0.5rem;
  }
</style>

<ul class="dot-key">
  <li><strong>amber</strong> — blocked, needs me (a permission prompt or a question);</li>
  <li><strong>green</strong> — finished, with a response waiting to be read;</li>
  <li><strong>nothing</strong> — working away, or nothing to report.</li>
</ul>

<!-- A CSS mock-up of the real tmux status bar — colours match the xterm-256 indices in the config. -->
<figure class="tmux-figure">
  <div class="tmux-bar" aria-hidden="true">
    <span class="tb-session">default</span>
    <span class="tb-win">1│ <span class="tb-dot tb-amber">●</span> payments</span>
    <span class="tb-win">2│ <span class="tb-dot tb-green">●</span> flemma</span>
    <span class="tb-win tb-cur">3│ blog</span>
  </div>
  <figcaption>My tmux status bar: window 1 (payments) is blocked and waiting on me — the amber dot; window 2 (flemma) finished and has a response ready — the green dot; window 3 (blog) is the one I am looking at, so it carries no dot.</figcaption>
</figure>

The green dot clears itself the instant I switch to that window — by the time I am reading, it is gone. The amber dot is stubborner: it stays until I have actually dealt with the request, because glancing at a window is not the same as answering it.

It is two halves that never touch directly — they meet on a single tmux variable. Claude Code hooks write it; a tmux format string reads it back and paints the dot. I drive it through home-manager in my [nix-meridian][nix-meridian] config, so the snippets are Nix, but the substance is the shell and tmux config — lift those straight out.

### Half one: Claude Code flags the window

Claude Code [hooks][cc-hooks] run a shell command at set points in a session. The ones I use:

- `PermissionRequest` — wants to do something unauthorised, waiting on a yes/no.
- `Elicitation` — asking you a structured question.
- `Stop` / `StopFailure` — the turn ended.
- `PostToolUse` — a tool just finished.
- `UserPromptSubmit` — you sent a new prompt.
- `SessionEnd` — Claude exited.

The glue is one variable: `$TMUX_PANE`. tmux sets it in every pane and Claude Code inherits it, so a hook always knows which window it is running in. Flagging that window is one command:

```shellsession
# Flag this pane's window as needing attention:
$ tmux set -w -t "$TMUX_PANE" @claude-state permission
# ...and clear it:
$ tmux set -wu -t "$TMUX_PANE" @claude-state
```

`@claude-state` is a custom option — tmux lets you invent any name starting with `@`. `-w` scopes it to the window and `-u` unsets it. One string per window, holding `permission`, `elicitation`, `idle` or nothing.

I wrap set, clear and a conditional clear into a small Nix helper:

```nix
tmux-claude-state =
  let
    tmux = "${lib.getBin pkgs.tmux}/bin/tmux";
  in
  {
    # Set @claude-state to a given value on this pane's window.
    set = state:
      ''[ -n "$TMUX_PANE" ] && ${tmux} set -w -t "$TMUX_PANE" @claude-state ${state} || true'';

    # Clear it, whatever it was.
    reset =
      ''[ -n "$TMUX_PANE" ] && ${tmux} set -wu -t "$TMUX_PANE" @claude-state || true'';

    # Clear it *only* if we are currently blocked — don't clobber anything else.
    reset-blocked = ''
      [ -n "$TMUX_PANE" ] && case "$(${tmux} show -wv -t "$TMUX_PANE" @claude-state 2>/dev/null)" in
        permission|elicitation) ${tmux} set -wu -t "$TMUX_PANE" @claude-state ;;
      esac; true'';
  };
```

The `[ -n "$TMUX_PANE" ]` guard makes it a no-op outside tmux; the trailing `|| true` stops a failed `tmux` call surfacing as a hook error. Then wire them up (trimmed — the full set is in the repo):

```nix
hooks = {
  PermissionRequest = [{
    hooks = [
      { type = "command"; command = "...play a chime..."; }   # more on this later
      { type = "command"; command = tmux-claude-state.set "permission"; }
    ];
  }];

  Stop = [{ hooks = [{ type = "command"; command = tmux-claude-state.set "idle"; }]; }];

  PostToolUse = [{ hooks = [{ type = "command"; command = tmux-claude-state.reset-blocked; }]; }];

  UserPromptSubmit = [{ hooks = [{ type = "command"; command = tmux-claude-state.reset; }]; }];
};
```

`Elicitation` mirrors `PermissionRequest` (without the chime[^1]), `StopFailure` mirrors `Stop`, `SessionEnd` mirrors `UserPromptSubmit`. The logic:

- **blocked** (`PermissionRequest` / `Elicitation`) → `permission` / `elicitation` — amber.
- **finished** (`Stop` / `StopFailure`) → `idle` — green.
- **tool ran** (`PostToolUse`) → clear it if we were amber; you have just approved it.
- **new prompt** / **session end** → clear everything.

Nothing flags "working" — that is the default, and a row of nine busy dots would just be noise.

### Half two: tmux paints the dot

tmux renders the variable in `window-status-format`, the template for every inactive window:

```bash
setw -g window-status-format \
  " #I│ #{?#{@claude-state},#{?#{==:#{@claude-state},idle},#[fg=colour34]●#[fg=colour247] ,#[fg=colour214]●#[fg=colour247] },}#W "
```

tmux's [format syntax][tmux-formats] is dense: `#{?cond,then,else}` is a ternary, and they nest. Unfolded:

```text
#{?#{@claude-state},                    # is @claude-state set at all?
  #{?#{==:#{@claude-state},idle},       #   yes — is it exactly "idle"?
    #[fg=colour34]●#[fg=colour247] ,    #     yes → green dot, then back to grey
    #[fg=colour214]●#[fg=colour247] },  #     no  → amber dot, then back to grey
}                                        # not set → render nothing
```

No `@claude-state` and you get an empty string, so the name renders as normal. Otherwise an exact match on `idle` picks the colour. `●` is a Unicode circle; `#[fg=...]` sets the colour on either side of it. The indices are the plain 256-colour palette: `colour34` green ("done, come and look"), `colour214` amber ("I need you") and `colour247` the grey for inactive text, restored after the dot. A traffic light, hiding in a status bar.

### Clearing the green dot on focus

A green dot is only useful until you look, so I clear it when you select the window:

```bash
# When you switch to a window, if its Claude state is the green "idle"
# flag, clear it — you are about to read the response anyway.
set-hook -g after-select-window \
  'if -F "#{==:#{@claude-state},idle}" "set -wu @claude-state"'
```

It only clears `idle`, never `permission` / `elicitation`. Green means "something to read", and switching there reads it; amber means "something to _do_", which a glance does not. The amber dot survives until the work happens (`PostToolUse` → `reset-blocked`) or you send a new prompt.

One last nicety: the focused tab uses a separate `window-status-current-format` with no dot logic at all — if you are looking at a window, you do not need telling what is in it. So dots only ever appear on the windows you are _not_ in.

### Start to finish

1. I send a prompt. `UserPromptSubmit` clears the flag — no dot.
2. Claude works. Nothing touches the state — still no dot.
3. It hits a `git push` it cannot run unattended. `PermissionRequest` fires: chime, amber tab.
4. I approve it — the amber dot stayed, since glancing didn't clear it. The command runs and `PostToolUse` clears the flag.
5. The turn ends. `Stop` turns the tab green.
6. I switch over to read it. `after-select-window` clears the green dot before I finish the first line.

<!-- SCREENSHOT (close-up, amber): a single window in the status bar with the amber dot, ideally with the Claude Code permission prompt visible in the pane below it.
<a href="/assets/images/2026/05/tmux-claude-amber-permission.png" target="_blank"><img src="/assets/images/2026/05/tmux-claude-amber-permission.png" alt="An amber dot next to a window waiting on a permission prompt" style="max-width: 66%; max-height: 360px; border: 1px solid rgba(0, 0, 0, 0.25);"></a>
-->

<!-- SCREENSHOT (close-up, green): a single window in the status bar with the green dot, showing a finished Claude turn waiting to be read.
<a href="/assets/images/2026/05/tmux-claude-green-idle.png" target="_blank"><img src="/assets/images/2026/05/tmux-claude-green-idle.png" alt="A green dot next to a window with a finished response" style="max-width: 66%; max-height: 360px; border: 1px solid rgba(0, 0, 0, 0.25);"></a>
-->

### Ring a bell

Dots work when your eyes are on the terminal. They do not when you have wandered off. So the blocking case — and only that — also makes a noise:

```nix
PermissionRequest = [{
  hooks = [
    {
      type = "command";
      command = "${lib.getBin pkgs.pipewire}/bin/pw-play ${./audio/notifications/mixkit-clear-announce-tones-2861.mp3}";
      timeout = 5;
    }
    { type = "command"; command = tmux-claude-state.set "permission"; }
  ];
}];
```

`pw-play` is PipeWire's player; the clip is a short [Mixkit][mixkit] tone vendored into the repo, so nothing reaches the network just to make a sound. Use whatever you like.

It rings on `PermissionRequest` only, never on `Stop`. A chime on every finished turn would be nine an hour and muted by lunch; a chime only when an agent is genuinely stuck is worth keeping on. This is what lets me walk away — start three agents, go and make a coffee, come back when one of them calls. The rest carry on.

### Two rough edges

It is not perfect:

**Forked subagents sometimes flip a window amber for nothing.** With subagent forking on, spawning one occasionally turns the window amber when nothing is waiting. Something inside the fork trips a blocking hook; I have not pinned down what yet.

**The amber dot clears a beat late.** I clear it on `PostToolUse` — when the tool _finishes_, not when you approve it. Green-light a long build or a `sleep 30` and the window stays amber for the whole run, though it stopped needing you the second you said yes. A `PreToolUse` hook would clear it sooner; that one is on the list.

### Wrapping up

That is the whole thing: the see-every-agent, ping-me-when-one-needs-you experience the big tools are built around, except this slice of it lives in the terminal I already work in. A dozen lines of hooks, one format string and a sound file.

I am not the only one who wants this — [Solo][soloterm] is a lovely native workspace (Tauri, not Electron) that runs all your agents with status indicators built in, and it is well worth a look. It does far more than my handful of dots; it is just more than I need. If you would rather have the whole workspace handed to you, that is what it is for.

None of the clever part is Claude-specific — it is hooks writing a variable and a status bar reading it. Point `tmux set -w @claude-state` at a long `make` or a deploy and you get the same dots for free.

The full version lives in my [nix-meridian][nix-meridian] config under `home/apps/tmux` and `home/apps/claude-code`. Steal it, and never go window-hunting again.

Happy hacking!

[^1]: Both blocking states — a permission request and an elicitation — show the same amber dot, but only `PermissionRequest` rings the bell; that is the one that tends to catch me mid-coffee.

[nix-meridian]: https://github.com/StanAngeloff/nix-meridian
[cc-hooks]: https://code.claude.com/docs/en/hooks
[tmux-formats]: https://man.openbsd.org/tmux.1#FORMATS
[mixkit]: https://mixkit.co/free-sound-effects/
[hn-cursor3]: https://news.ycombinator.com/item?id=47618084
[hn-superset]: https://news.ycombinator.com/item?id=48236770
[hn-runtime]: https://news.ycombinator.com/item?id=48225040
[hn-antigravity2]: https://news.ycombinator.com/item?id=48234090
[soloterm]: https://soloterm.com/
