<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT SHIELDS -->
[![Stargazers][stars-shield]][stars-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/tberey/social-stocks">
    <img src="public/assets/logo.png" alt="TomCo (Technology & Online Media Company) Logo" width="200" height="100">
  </a><br><br>
  <div align="center"><b style="font-size: x-large;">Social Stocks</b><br>A Graphical Data & Analysis Tool,<br>by TomCo (Technology & Online Media Company).</div>
  <div align="right">
    <br>
    <a href="https://github.com/tberey/social-stocks"><strong>Explore the docs »</strong></a>
    <br>
    <a href="https://github.com/tberey/social-stocks">View Demo</a>
    ·
    <a href="https://github.com/tberey/social-stocks/issues">Report Bug</a>
    ·
    <a href="https://github.com/tberey/social-stocks/issues">Request Feature</a>
  </div>
</div>



<!-- TABLE OF CONTENTS -->
<details open="open" style="padding:4px;display:inline;border-width:1px;border-style:solid;">
  <summary><h2 style="display: inline-block">Contents</h2></summary>
    <ol>
        <li>
        <a href="#about-this-project">About</a>
        <ul>
            <li><a href="#tech-stack">Tech Stack</a></li>
        </ul>
        </li>
        <li>
        <a href="#startup">Startup</a>
        <ul>
            <li><a href="#prerequisites">Prerequisites</a></li>
            <li><a href="#installation">Installation</a></li>
        </ul>
        </li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#roadmap">Roadmap</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#acknowledgements">Acknowledgements</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#changelog">Changelog</a></li>
    </ol>
</details><hr><br>



<!-- ABOUT THis PROJECT -->
## About This Project
A Graphical Data and Analysis Tool, by TomCo (Technology & Online Media Company). This web, or desktop application, collects data on google search trends and from social media sources (such as the Twitter API), to extrapolate and illustrate potential stock movements, into a user-friendly graphical format.

<sub><i>This application, or any data, trends and patterns, that can be discerned, should not be taken as financial advice, or as a definitive indication of the movement of the underlying security/asset. The purpose of this app is to merely help in identifying trends or any high social traffic, on a particular ticker or security; and potentially add further insight in your own decision making. Be smart, take responsibility, and never risk money you need.</i></sub>

<br>

### Tech Stack

* [Typescript](https://www.typescriptlang.org/)
* [NodeJS](https://nodejs.org/en/)
* [Electron](https://www.electronjs.org/)
* [ExpressJS](https://expressjs.com/)
* [Chartjs](https://www.chartjs.org/)
* [MySQL](https://www.mysql.com/)
* [AWS](https://aws.amazon.com/)
* [Rollbar](https://rollbar.com/)
* [ESLint](https://eslint.org/)
* [MochaChai](https://mochajs.org/)

<br><hr><br>



<!-- STARTUP -->
## Startup

For help or guidance in downloading and running the application, see the following subsections.

<br>

### Prerequisites

This is node application, supported by a mysql database. As such, you will need to have npm (node package manager) installed, as well as mysql.
In a future update, there will be more instructions, as well as db migration and ifra setup scripts.
1. Setup npm:
  ```sh
  npm install npm@latest -g
  ```

<br>

### Installation

A future update with add further detail and steps to these instructions.
1. Clone/Download:
   ```sh
   git clone https://github.com/tberey/social-stocks.git
   ```
2. Install:
   ```sh
   npm install && npm update
   ```
3. Start:
   ```sh
   npm run start:app
   ```

<br><hr><br>



<!-- USAGE EXAMPLES -->
## Usage
<br>

| Endpoint | Action/Desc. | Full URI <i>(hosted locally, for some port; e.g.: 3000)</i> |
|:---|:---|:---|
| <ul><li>"/"</li></ul> | Homepage:<br>The client-side landing page. | <ul><li>"http://localhost:3000/"</li></ul> |
| <ul><li>"/test"</li></ul> | Testing:<br>Description test. | <ul><li>"http://localhost:3000/test"</li></ul> |

<br>

### Screenshots

Client Graph Rendered, Screen Capture #1:
![Screenshot#1](https://github.com/tberey/social-stocks/blob/development/screenshots/data-graph-screen1.png?raw=true)

Client Graph Rendered, Screen Capture #2:
![Screenshot#2](https://github.com/tberey/social-stocks/blob/development/screenshots/data-graph-screen2.png?raw=true)

Client Graph Rendered, Screen Capture #3:
![Screenshot#3](https://github.com/tberey/social-stocks/blob/development/screenshots/data-graph-screen3.png?raw=true)

Database Sample:
![Screenshot#4](https://github.com/tberey/social-stocks/blob/development/screenshots/data-store-sample.png?raw=true)

Logging Sample:
![Screenshot#5](https://github.com/tberey/social-stocks/blob/development/screenshots/local-logs-sample.png?raw=true)

<br><hr><br>



<!-- ROADMAP -->
## Roadmap
Below is the planned roadmap. See the [open issues](https://github.com/tberey/social-stocks/issues) for a list of any other proposed features & known issues.

<br>

| Feature/Task/Bugfix | Details | Version <i>(if released)</i> | Notes |
|:---|:---|:---|:---|
| Bug#3 | Example bug details. | 0.0.1 | Notes example. |
| Feature#12 | Example feature details. |   | Notes example. |

<br><hr><br>



<!-- CONTRIBUTING -->
## Contributing

Contributions are welcomed and, of course, **greatly appreciated**:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/Feature`)
3. Commit your Changes (`git commit -m 'Add some Feature'`)
4. Push to the Branch (`git push origin feature/Feature`)
5. Open a Pull Request.

<br><hr><br>



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [Me](https://tberey.github.io/)

<br><hr><br>



<!-- CONTACT -->
## Contact

Tom Berey - tomberey1@gmail.com

* [Issues & Requests](https://github.com/tberey/social-stocks/issues)

* [Personal Website](https://tberey.github.io/)

* [Linked In](https://uk.linkedin.com/in/thomas-berey-2a1860129)

* [My Other Projects](https://github.com/tberey/)

<br><hr><br>



<!-- CHANGELOG -->
## Changelog

| Version | Date | Changes |
|:---|:---|:---|
| 0.0.1 | 2021-07-08 | <ul><li>Initial Commit.</li><li>Add inital directory structure and files.</li><li>Add Screenshots directory, and images.</li><li>Create and format README.md</li></ul> |




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[stars-shield]: https://img.shields.io/github/stars/tberey/repo.svg?style=for-the-badge
[stars-url]: https://github.com/tberey/social-stocks/stargazers
[contributors-shield]: https://img.shields.io/github/contributors/tberey/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/tberey/social-stocks/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tberey/repo.svg?style=for-the-badge
[forks-url]: https://github.com/tberey/social-stocks/network/members
[issues-shield]: https://img.shields.io/github/issues/tberey/repo.svg?style=for-the-badge
[issues-url]: https://github.com/tberey/social-stocks/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://uk.linkedin.com/in/thomas-berey-2a1860129
