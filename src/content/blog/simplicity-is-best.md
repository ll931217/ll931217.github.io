---
title: Simplicity is best
date: 2025-04-12T05:52:40.000Z
author: Liang-Shih Lin
excerpt: >-
  Don't overthink, keep things simple, it will be much easier to manage your
  system.
tags:
  - Backend
  - Frontend
  - DevOps
---
When I started working in the real world on systems that affects the real world, I kept learning new things from different frontend frameworks (React, Vue, Svelte), to different backend frameworks (Flask, Django, FastAPI, Expressjs, Nestjs), it also affected the way I design my system architectures. I would always try to find an excuse to use something I want to learn on the latest project I would be given but sometimes this isn't the best way to go about doing things.

## GraphQL + MongoDB (2018)

When GraphQL first started gaining traction, I was very new to backend development. Looking back on it now, I didn't know how to properly create a RESTful API, I had no idea about the best practices to follow, I just winged the development since everything I did was self-taught. In 2018, I had a client that wanted me to create a system that can print and scan QR quotes which contain links to third-party services to introduce the product the QR codes are attached to. I used this project as an excuse to learn both MongoDB and GraphQL. With MongoDB, there wasn't too much issue, since the system was very simple but GraphQL took up so much of the development time because of my inexperience that it made the client unhappy with the progress. From this I learned that maybe it isn't a good idea to just work on a new technology when starting a project for a client that has a time constraint.

## Microservices + Kubernetes (2023)

This was when I became the founding backend engineer for an headhunting startup that wants to revolutionise the HR industry by improving the way clients and headhunters collaborate leveraging AI in their system. The thing with start ups is that, resources are very limited. Resources including:

- Time
- Human
- Funding

With start ups, the amount of people working on the same project is very limited, it could just be you on a certain part of a system for a while before the company will hire more. The funding is limited, it could be out of the founders' pockets, which can directly impact the time available, once those funds run out its over, I learned that the hard way. All this means that you need to move FAST, have your system online as soon as possible and get your clients in. When you have clients, you have numbers to show potential investors, that is when you can get more funding and potentially have some income stream for the company.

Our product team didn't have a proper leadership, our CTO didn't give much technical input, so all the technical decisions was done by the engineers with some input from the CEO. The company gave us (engineers) too much power, I helped the company create their backend system from 0-1, managed the entire backend infrastructure including CI/CD pipeline, cloud infrastructure, tests, etc. Initially I wanted to create a microservices architecture for our system using kubernetes (I don't have any experience with these whatsoever), however I got shot down by the other engineer and our CEO (thankfully).

We decided on hosting our monolithic backend on AWS, but since I am not too familiar with AWS I had to do a lot of research, the deployment wasn't very smooth with tasks going on multiple sprints (Not a good look I know). AWS was also very costly if you don't know how to use the platform properly, most of our cost comes from PostgreSQL hosted on RDS.

Having that experience I have learned that using other hosting providers could had been better such as using Hetzner, Airway, DigitalOcean to name a few. Leave the DevOps to the professionals until our system's traffic becomes too big then we can hire proper DevOps engineers to manage the cloud. However this backend is probably one of the best backend codes I had ever written and I am proud of it.

# Key lessons

## Don't overcomplicate things

Simplicity can make the system easy to understand and develop with, reduces the possibility of having tickets that span multiple sprints, this can improve how fast your system gets released to the market.

## Use technologies you have experience in

Similar with the previous point, don't experiment with technologies you are not familiar with, it can cause unexpected issues with your inexperience and resulting in countless headaches down the road. Save yourself that hassle. If you want to learn new technologies, work on side projects at your own time unless time isn't an issue.

## Delegating certain workloads to third-party services

Remember relying on other services isn't a bad thing, it can save you time, headache and maybe even money. Focus on the bigger picture, on what is important which is to ship fast and generate revenue as soon as possible.

