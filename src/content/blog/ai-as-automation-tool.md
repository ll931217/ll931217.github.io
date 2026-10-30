---
title: AI as automation tool
date: 2026-07-29T00:00:00.000Z
author: Liang-Shih Lin
excerpt: A mentality for the current state of AI
tags:
  - AI
  - Internet
---

<!--toc:start-->

- AI as automation tool
- What makes you valuable?
- How can you apply your skills in this world of AI?
- How can you improve your skillset with AI?

<!--toc:end-->

# AI as automation tool

We are currently in a technological boom just like when the internet became widely accessible in the 1990s, now it is AI being widely accessible. One of the things that are going to happen is jobs will become obsolete and there will be jobs that will be created. We are already seeing the crux of this happening with the job market, workers being replaced with AI or even robots.

I want you to think of it this way. Previously, we have CEO which tells the company what they envision for the company, this idea is very high level and it requires managers and leads to take that vague idea and turn it into something tangible, something that can be used to increase the company's revenue.

Now we have AI, AI agents, LLMs, workflows, software factories, the list goes on. Things are moving at such a fast pace that it can get very tiring trying to keep up with all these terms, methodologies and tooling. Things can get so overwhelming because of how fast AI is improving, they are basically doing all the mundane tasks that took engineers days to weeks to do, they can complete it within minutes to hours.

In the next section I will talk about how you can leverage AI, making you more valuable in your workplace.

## What makes YOU valuable?

With how the world is moving at such fast pace, overwhelming is probably the only feeling that most people are feeling right now. However, you have to keep in mind that if the world is moving in a certain direction, do not be left behind, find a way to move with the rest of the world. Even if you were like me a skeptic in the beginning, it is still wise to dabble in the new tool to better understand if this new tool can improve your workflow, how it fits in, how you can optimize your workflow.

I am a fullstack software developer so I will talk about it in my perspective. Just a bit of context, ever since 2026, I haven't written about 95% of code by hand, I have only been using agents. I have developed my own workflow or software factory framework, which I will go over in my next blog post.

In the introductory section, I mentioned that the structure of work is from CEO giving a rough, very vague idea of what he envision for the company to managerial roles turning that idea into tangible and actionable ideas, to the employees taking those tangible and actionable ideas into tasks.

In the current age of AI, it is much different now. It is the employees turning those vague ideas into actionable ones and planning with AI to turn them into reality. You have the experience building systems, you have the skills and the knowledge of what is to be expected, this kind of context is something that AI doesn't have. You need to be able to think outside the box, to understand what your users want, how to provide a tool to fix their pain point. If you are not doing that, not thinking of what you are working on in this direction then you can easily be replaced by AI.

[![Then and now: the CEO used to hand a vague vision to managers and leads, who made it tangible, and employees turned it into tasks. Now the CEO hands the same vague vision straight to you, you turn it into a plan using the context AI lacks, and AI agents do the mundane work in minutes and hand the results back.](/diagrams/ai-automation/then-vs-now.svg)](/diagrams/ai-automation/then-vs-now.svg)

What each side brings to that plan:

| | AI agents | You |
| --- | --- | --- |
| Speed on the mundane work | minutes to hours | days to weeks |
| Context of your systems and history | only what you hand it | years of it |
| What your users actually want | a guess | you have talked to them |
| Deciding what is worth building | no | this is the job now |
| Knowing when the answer looks wrong | no | experience |

## How can you apply your skills in this world of AI?

You might be thinking to yourself then how can you apply your skills to achieve what is to be expected without being replaced by AI? Recently I have been reading a book recommended by my manager (Shout-out to the best manager I have ever had ever since I started working, Hank Nien), [The Great Mental Models](https://zlib.pub/book/the-great-mental-models-vol-1-general-thinking-concepts-71q8camllk10), this book talks about how you should think to help you cover your grounds. The book talks about a concept of First Principles thinking, you can think of it like a child asking their parents the simplest of questions regarding everything and anything, sometimes something you may think you know but actually it isn't as simple as it seems. So understanding something using the simplest questions is a good starting point.

Recently at work, I thought I knew a meaning of a word "tenant", which to my understanding is like someone or something that occupies a certain location. This was a term used in NetBox, however our IT team gave it another purpose which is to label physical devices for certain locations on top of the original tenant meaning. This was one of the oversights I made and it delayed the progress of one of my projects, causing my manager to have some doubts about my work ethic. I had to do some reflection about how I work, if I don't know something or is not 100% sure about something, always ask. Before you ask someone something, make sure you think things through using first principles thinking.

This leads us to talk about another concept mentioned in the book, Circle of Competence, recognize what you know, what you don't, and whom to consult. Don't be stuck in your own circle of competence, always try to look beyond it, this can take effort, but the result is a dopamine rush that will get you addicted.

Put the two together and you get one check I now run before I build on a word I think I know:

[![Flowchart: you meet a term you think you know. First principles asks whether you can explain it in the simplest terms. Yes: build on it. No: circle of competence asks whether it is inside what you really know. No: ask the person who owns it before you build. Yes: dig until you can explain it, then check again.](/diagrams/ai-automation/ask-before-you-build.svg)](/diagrams/ai-automation/ask-before-you-build.svg)

| Mental model | The question it asks | Where it bit me |
| --- | --- | --- |
| First Principles | "What does this word really mean, here, to these people?" | "tenant" in NetBox meant more than the dictionary meaning |
| Circle of Competence | "Do I actually know this, or do I just think I do? Who does?" | I built on my own meaning instead of asking IT |

## How can you improve your skillset with AI?

Applying your skills in this new world can be very daunting, with the rate at which systems, bugs, features are being created, how does one keep up? This is where you use your experience and what you have learnt in school to your advantage, to build systems that can help ease your load, AI skills, workflows, software factory frameworks such as the one I will talk about in the next blog post about "agent-discipline" a plugin I have been implementing for work, only available for Claude Code for now. It is a plugin with a set of rules, skills and hooks, this is basically what makes workflows work, skill/hooks calling other skills, with some predefined rules. Rules cover the small stuff, hooks cover the things that must not slip, and the next post is about why that split matters.

- **Rules**: what the agent should and should not do, written down once instead of repeated in every prompt.
- **Skills**: step-by-step procedures the agent can call, and skills can call other skills.
- **Hooks**: small checks that run at a fixed moment, like before an edit or a push, and can block the agent or nudge it.

Become your company's AI specialist, be the one that controls AI instead of being controlled by AI.
