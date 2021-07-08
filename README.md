<!--
*** Using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT SHIELDS -->
[![Workflow][workflow-shield]][workflow-url]
[![Version][version-shield]][version-url]
[![Stargazers][stars-shield]][stars-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br>
<div align="center">
  <a href="https://github.com/tberey">
    <img src="public/assets/logo.png" alt="TomCo (Technology & Online Media Company) Logo" width="200" height="100">
  </a><br><br>
  <div align="center"><h1>Social Stocks</h1>A Graphical Data & Analysis Tool,<br>by TomCo (Technology & Online Media Company).</div>
  <div align="right">
    <br>
    <a href="https://github.com/tberey/social-stocks/blob/development/README.md"><strong>Documentation »</strong></a>
    <br>
    <a href="#usage">View Demo</a>
    ·
    <a href="https://github.com/tberey/social-stocks/issues">Report Bug</a>
    ·
    <a href="https://github.com/tberey/social-stocks/issues">Request Feature</a>
  </div>
</div>



<!-- TABLE OF CONTENTS -->
<details open="open" style="padding:4px;display:inline;border-width:1px;border-style:solid;">
  <summary><b style="display: inline-block"><u>Contents</u></b></summary>
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
        <li>
        <a href="#usage">Usage</a>
        <ul>
            <li><a href="#screenshots">Screenshots</a></li>
        </ul>
        </li>
        <li><a href="#roadmap">Roadmap</a></li>
        <li><a href="#changelog">Changelog</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#acknowledgements">Acknowledgements</a></li>
        <li><a href="#contact">Contact</a></li>
    </ol>
</details><hr><br>



<!-- ABOUT THis PROJECT -->
## About This Project
A Graphical Data and Analysis Tool, by TomCo (Technology & Online Media Company). This web, or desktop application, collects data on google search trends and from social media sources (such as the Twitter API), to extrapolate and illustrate potential stock movements, into a user-friendly graphical format.

<sub><i>This application, or any data, trends and patterns, that can be discerned, should not be taken as financial advice, or as a definitive indication of the movement of the underlying security/asset. The purpose of this app is to merely help in identifying trends or any high social traffic, on a particular ticker or security; and potentially add further insight in your own decision making. Be smart, take responsibility, and never risk money you need.</i></sub>

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
For help or guidance in downloading and running the application, see the following subsections. In a future update, there will be more extensive and complete instructions, as well as db migration and ifra setup scripts.
<br>

#### Prerequisites
1. Setup npm:
  ```sh
  npm install npm@latest -g
  ```
<br>

#### Installation
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

| Endpoint | Action/Desc. | Full URI <i>(hosted locally, for some port; e.g.: 3000)</i> |
|:---|:---|:---|
| <ul><li>"/"</li></ul> | Homepage:<br>The client-side landing page. | <ul><li>"http://localhost:3000/"</li></ul> |

<br>

### Screenshots
Client Bar Chart (Daily) Rendered#1<br>
![Screenshot#1](https://github.com/tberey/social-stocks/blob/development/screenshots/data-graph-screen1.png?raw=true)<br><br>
Client Bar Chart (Daily) Rendered#2<br>
![Screenshot#2](https://github.com/tberey/social-stocks/blob/development/screenshots/data-graph-screen2.png?raw=true)<br><br>
Client Line Chart (Weekly) Rendered<br>
![Screenshot#3](https://github.com/tberey/social-stocks/blob/development/screenshots/data-graph-screen3.png?raw=true)<br><br>
Database Sample<br>
![Screenshot#4](https://github.com/tberey/social-stocks/blob/development/screenshots/data-store-sample.png?raw=true)<br><br>
Logging Sample<br>
![Screenshot#5](https://github.com/tberey/social-stocks/blob/development/screenshots/local-logs-sample.png?raw=true)

<br><hr><br>



<!-- ROADMAP -->
## Roadmap
Below is the confirmed planned roadmap. See the [open issues][issues-url] and also the [project board][project-url], for a list of any other proposed features or known issues.

| Feature/Task/Bugfix | Details | Version <i>(if released)</i> | Notes |
|:---|:---|:---|:---|
| <i>Bug#1</i> | <i>Bug details...</i> | <i>0.0.1</i> | <i>example#1</i> |
| <i>Feature#4</i> | <i>Feature details...</i> |   | <i>example#2</i> |
| Google Search Terms Analytics + Graph(s) | Collect data on search terms (that are gathered from social media?) and graph it. |   | Not started. |
| Extra/New Data Representation Graph(s) | Add extra graphy types, like pie etc. |   | Not started. Low Priority. |

<br><hr><br>



<!-- CHANGELOG -->
## Changelog

| Version | Date | Changes |
|:---|:---|:---|
| 0.0.1 | 2021-07-08 | <ul><li>Initial Commit.</li><li>Add inital directory structure and files.</li><li>Add Screenshots directory, and images.</li><li>Create and format README.md</li></ul> |

<br><hr><br>



<!-- CONTRIBUTING -->
## Contributing
Contributions are welcomed and, of course, **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/Feature`)
3. Commit your Changes (`git commit -m 'Add some Feature'`)
4. Push to the Branch (`git push origin feature/Feature`)
5. Open a Pull Request.

<br><hr><br>



<!-- CONTACT -->
### Contact

<b>Tom Berey</b>; <i>Project Manager, Lead Developer, Principal Tester & Customer Services</i> - tomberey1@gmail.com

* [Issues & Requests][issues-url]
* [My Other Projects](https://github.com/tberey?tab=repositories)
* [Personal Website](https://tberey.github.io/)
* [Linked In](https://uk.linkedin.com/in/thomas-berey-2a1860129)

<br>

<!-- ACKNOWLEDGEMENTS -->
### Acknowledgements

* [Me](https://github.com/tberey)



<br><br><hr><div align="center">TomCo&trade; (Technology & Online Media Company&copy;).</div>




<!-- SPECIFIC URLS - NEED CHANGING PER PROJECT -->
[workflow-shield]: https://github.com/tberey/social-stocks/actions/workflows/codeql-analysis.yml/badge.svg
[workflow-url]: https://github.com/tberey/social-stocks/actions
[version-shield]: https://img.shields.io/github/v/release/tberey/social-stocks
[version-url]: https://github.com/tberey/social-stocks/releases/
[stars-shield]: https://img.shields.io/github/stars/tberey/social-stocks.svg
[stars-url]: https://github.com/tberey/social-stocks/stargazers
[contributors-shield]: https://img.shields.io/github/contributors/tberey/social-stocks.svg
[contributors-url]: https://github.com/tberey/social-stocks/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tberey/social-stocks.svg
[forks-url]: https://github.com/tberey/social-stocks/network/members
[issues-shield]: https://img.shields.io/github/issues/tberey/social-stocks.svg
[issues-url]: https://github.com/tberey/social-stocks/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555
[linkedin-url]: https://uk.linkedin.com/in/thomas-berey-2a1860129
[project-url]: https://github.com/tberey/social-stocks/projects