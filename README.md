# Pokematic
Pokematic is a web application that fosters team collaboration and is designed to be a tool that rewards teams through “gamifying” team achievements. As teams complete tasks and gain achievements and milestones, the tool rewards teams with randomly generated Pokemon. These rewards are added into a collective Pokédex within each team, where members of the team can view their achievements and track the progress of their incoming goals.

Features that are currently available on Pokematic include:
- Creating and joining different teams
- Kanban-board view of the team's task
- Creating, tracking and modifying tasks
- Creating and tracking goals
- Experience points system for level ups for teams
- Rewards system revolving around Pokemon collection


## Technical Layout

The project consists of two main code bases: a backend (in pokematic-backend) and a frontend (in pokematic-frontend). The backend is a web api created with ASP.NET Core (coding language is C#). The frontend is a ReactJS project that interacts with the  the backend API as well as a third-party API [PokéAPI](https://pokeapi.co/).

## Get Started!

To get the project running, follow these steps:

### Prerequisites
- Visual Studio (for editing C# code) [or the equivalent `dotnet` command line tools, or JetBrains Rider]
- Install .Net Core 3.1 Runtime and SDK [here](https://dotnet.microsoft.com/download) (note you only need the SDK if you wish to further develop the pokematic backend)
- Visual Studio Code [or equivalent frontend tooling]
- NPM/NodeJS download it [here](https://nodejs.org/en/) (NOTE: This is only required if you wish to run the front-end of Pokematic locally)

### Steps to run
1. Clone and/or download the repo to your local machine
2. Open the command line and use the 'cd' command to navigate to where the pokematic code base is saved
3. Use the 'cd' command to navigate into the backend folder (pokematic-backend) and execute the command 'dotnet run'
4. Wait until the DotNet Application has started
5. Open the link https://pokematic.netlify.app/ and get started using Pokematic
6. Feel free to create a new account. However, it is recommended that if you are testing pokematic, you should use a dummy account as this will help you see all the features of pokematic more easily. To log into the dummy account enter the following credentials,
Login: mockaccount@test.com
passowrd: TestAccount1!
