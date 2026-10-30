---
title: Teaching my AI agents some discipline
date: 2026-10-30T00:00:00.000Z
author: Liang-Shih Lin
excerpt: >-
  I spent two months building a plugin that stops my coding agents from cutting
  corners. Here is what worked, what didn't, and what it cost.
tags:
  - AI
  - Claude Code
  - Automation
---
# Teaching my AI agents some discipline

In [my last post](/blog/ai-as-automation-tool) I said AI should be treated as an automation tool. Two months ago I decided to actually live by that. I wanted to hand my coding agents real tickets from work and have them come back done, tested and merged, while I worked on something else.

It didn't go well at first.

## The problem: rules don't stick

I had a `CLAUDE.md` full of rules. Write the test first. Don't leave giant comments. Don't push without running the tests. Put a due date on every ticket. The agent would read all of it at the start of every session, nod along, and then do whatever it wanted.

I didn't want to go off a feeling, so I measured it. The rules that were always loaded into the agent's context were acted on **16.4%** of the time. Less than one in five. A rule that depends on being remembered gets forgotten, and that is just as true for an agent as it is for me.

So I stopped writing more rules and started building a plugin for Claude Code instead. I called it `agent-discipline`.

## Hooks, not rules

The idea is simple. Instead of telling the agent "write the test first" and hoping it remembers, I put a hook on the exact moment it matters. When the agent tries to edit implementation code and no test has gone red yet, the edit gets **denied**, and the denial tells it the exact command that clears it.

That last part is important. A gate that is hard to satisfy just becomes something the agent tries to route around. If the fix is one command away, it just runs the command.

[![Flowchart: the agent wants to edit src. A hook asks whether a test has gone red yet. Yes: the edit is allowed. No: the edit is denied together with the one command that fixes it, the agent runs that command, and the check runs again.](/diagrams/agent-discipline/hooks-not-rules.svg)](/diagrams/agent-discipline/hooks-not-rules.svg)

Right now there are 18 gates that can say no, things like:

- no merge request without a `## Proof` section showing it actually works
- no ticket without a due date, and a short what / why / who / where / when / how
- no wall of 6+ lines of comment prose in code
- no ticket IDs inside code comments
- no muting `console.error` to make the red go away

Every other hook only talks, it reminds the agent of something at the right time but never blocks.

In the last 4 weeks the hooks denied **5,743** tool calls. That number sounds bad, and honestly it is a little embarrassing, but every single one of those was something the agent was about to do that I would have had to catch in review.

## One boss, many workers

The second thing I built was a way to run several agents at once without them stepping on each other.

There is one **orchestrator** session that I talk to. It is not allowed to edit any code, at all. Its only jobs are to pick the next ticket, write down what "done" means, hand it to a **worker**, and review what comes back.

Each worker gets its own git worktree (a separate copy of the repo on its own branch), its own terminal tab and a list of files it owns. If it touches a file it doesn't own, it gets blocked. Before it writes any code it writes a definition of done, then a few small reviewer agents check its work against that list. The orchestrator gets three rounds to accept or send it back, after the third round it has to come ask me.

[![Architecture: I hand tickets to one orchestrator that cannot edit code. It hands each ticket plus a definition of done to a worker in its own git worktree. Workers rebase and push to the CI pipeline. Green closes the ticket, red reopens it, and the orchestrator picks the next one. After three review rounds the orchestrator has to come ask me.](/diagrams/agent-discipline/orchestrator-workers.svg)](/diagrams/agent-discipline/orchestrator-workers.svg)

| Who | Can edit code? | Job |
| --- | --- | --- |
| Me | yes, but I try not to | hand over tickets, answer round-four questions |
| Orchestrator | **no** | pick the next ticket, write down what "done" means, review, send back or accept |
| Worker | only files it owns | write the definition of done, then the code, then push |
| Reviewer agents | no | check the worker's output against its own definition of done |

When the work is accepted, the worker rebases, runs the tests it touched, and pushes. When the pipeline goes green, the ticket closes, the worktree gets cleaned up and the next ticket gets picked up automatically. If the pipeline goes red, the ticket reopens and a fix goes in before anything new.

[![State machine: a ticket is picked, gets a definition of done, is coded, then reviewed. Review can send it back to coding up to three times. Once accepted it is pushed and run through the pipeline. Green closes it, red reopens it and sends it back to coding.](/diagrams/agent-discipline/ticket-lifecycle.svg)](/diagrams/agent-discipline/ticket-lifecycle.svg)

It's a bit like being a tech lead for a team that never sleeps but also never remembers anything from yesterday.

## Did it actually help?

I wanted an honest answer to this, so I ran an experiment. I had an agent build the same small tool twice, once with the plugin and once without. I wrote down how I would score them **before** the second one ran, so I couldn't bend the scoring to fit what I wanted to see.

| | With plugin | Without plugin |
| --- | --- | --- |
| Score (out of 7) | 7 | 4 |
| Has a test that can actually fail | yes | no |
| Time | 38 min | 8 min |
| Tool calls | 345 | 78 |

So the plugin won, but not in the way I expected. The first draft from the plugin version wasn't smarter, it actually shipped a bug the other version avoided. It got to 7/7 because of the **review**, the tests and the second pair of eyes caught what the first draft missed. The plugin didn't buy me better judgement, it bought me work that I can verify.

It also cost almost 5x the time and a lot more tokens. That's the trade off. For a throwaway script it is not worth it. For code that ends up in production, I'll take it.

## The part that still bugs me

The whole point of this plugin is to make agents trustworthy. But if the agent can't handle my tasks without asking me to approve every step, then what is the point?

I went through the logs and found that the agents parked on a question for me **538** times in a month. In **231** of those, the agent already had an answer and just wanted me to say "yes". Most of the time I did just say yes.

That's not a question, that's a permission slip.

So the next thing I'm building is a **trust ladder**. Every area of the code starts with full review. After a few clean landings in a row, it moves to sampled review. After more, only the tests need to pass. If anything goes wrong, like a revert, a red pipeline or work sent back, it drops back down a step. Trust gets earned, and it gets lost faster than it's earned, which is how it works with people too.

[![Trust ladder: three rungs, full review, sampled review, tests only. Clean landings move an area of the code up one rung. Any failure, a revert, a red pipeline or work sent back, drops it down one rung.](/diagrams/agent-discipline/trust-ladder.svg)](/diagrams/agent-discipline/trust-ladder.svg)

## By the numbers

Everything above, in one place.

| What I counted | Number | What it told me |
| --- | --- | --- |
| Always-loaded rules the agent actually acted on | 16.4% | rules in a file are suggestions |
| Tool calls the hooks denied in 4 weeks | 5,743 | each one was a review comment I didn't have to write |
| Gates that can say no | 18 | every other hook only reminds |
| Score, with plugin vs without | 7/7 vs 4/7 | the review found the bugs, not the first draft |
| Time, with plugin vs without | 38 min vs 8 min | discipline costs almost 5x |
| Times an agent parked on a question for me, per month | 538 | too many |
| …of which it already knew the answer | 231 | permission slips, not questions |

## Key lessons

| Lesson | In one line |
| --- | --- |
| **Enforce at the moment, don't remind** | A rule in a file is a suggestion. A hook that blocks the action is a rule. |
| **Make the right thing the easy thing** | Every block comes with the exact command that fixes it. Otherwise you are teaching the agent to route around you. |
| **Measure it** | I was sure my rules worked until I counted. 16.4% was humbling. If you can't measure it, you don't know. |
| **Discipline costs time** | The plugin version was a lot slower. Discipline isn't free for agents either. Choose where you actually need it. |
