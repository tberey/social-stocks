<!--
*** Using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT SHIELDS -->
[![Workflow][workflow-shield]][workflow-url]
[![Issues][issues-shield]][issues-url]
[![Version][version-shield]][version-url]
[![Stargazers][stars-shield]][stars-url]
[![Forks][forks-shield]][forks-url]
[![Contributors][contributors-shield]][contributors-url]
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
        <li><a href="#contact">Contact</a></li>
        <li><a href="#acknowledgements">Acknowledgements</a></li>
    </ol>
</details><hr><br>



<!-- ABOUT THis PROJECT -->
## About This Project
Social Stocks is a graphing data and analysis tool, by TomCo (Technology & Online Media Company). This web, or desktop, application collects data from social media sources (such as the Twitter or Reddit APIs), as well as on google search trends, to extrapolate and illustrate potential stock movements or trends, into a user-friendly graphical format.

<sub><i>This application, or any data, trends and patterns, that can be discerned, should not be taken as financial advice, or as a definitive indication of the movement of the underlying security/asset. The purpose of this app is to merely help in identifying trends or any high social traffic, on a particular ticker or security; and potentially add further insight in your own decision making. Be smart, take responsibility, and never risk money you need.</i></sub>

### Tech Stack
* [Typescript](https://www.typescriptlang.org/)
* [NodeJS](https://nodejs.org/en/)
* [Electron](https://www.electronjs.org/)
* [ExpressJS](https://expressjs.com/)
* [Chartjs](https://www.chartjs.org/)
* [MySQL](https://www.mysql.com/)
* [AWS](https://aws.amazon.com/)
* [EJS](https://ejs.co/)
* [Rollbar](https://rollbar.com/)
* [SimpleTxtLogger](https://www.npmjs.com/package/simple-txt-logger)
* [ESLint](https://eslint.org/)
* [MochaChai](https://mochajs.org/)

<br><hr><br>



<!-- STARTUP -->
## Startup
For help or guidance in downloading and running the application, see the following subsections.
<br>

#### Prerequisites
[You must have npm (node package manager) and Nodejs installed on your system!](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

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

| Endpoint | Action/Desc. | Full URI <i>(hosted locally, for some port; e.g.: 3000)</i> | Request Type |
|:---|:---|:---|:---|
| <ul><li>"/"</li></ul> | Index:<br>Returns empty 200 status response. | <ul><li>"http://localhost:3000/"</li></ul> | GET |
| <ul><li>"/findBucket"</li></ul> | Attempt to find the passed bucket name. | <ul><li>"http://localhost:3000/findBucket?bucket=BUCKET_NAME"</li></ul> | GET |
| <ul><li>"/listObjects"</li></ul> | Lists all objects contained within a passed bucket, if the bucket exists. | <ul><li>"http://localhost:3000/listObjects?bucket=BUCKET_NAME"</li></ul> | GET |
| <ul><li>"/findObject"</li></ul> | Attempt to find passed object, in the passed bucket, if the bucket exists. | <ul><li>"http://localhost:3000/findObject?bucket=BUCKET_NAME&object=OBJECT_NAME"</li></ul> | GET |
| <ul><li>"/createBucket"</li></ul> | Create a new empty bucket, if one with the same name does not already exist. | <ul><li>"http://localhost:3000/createBucket"</li></ul> | POST |
| <ul><li>"/uploadFile"</li></ul> | Upload a local file to a specified bucket, if that bucket exists. | <ul><li>"http://localhost:3000/uploadFile"</li></ul> | POST |
| <ul><li>"/downloadFile"</li></ul> | Download a remote file from a specified bucket, if that bucket exists, and the file can be found. | <ul><li>"http://localhost:3000/downloadFile"</li></ul> | POST |
| <ul><li>"/tweetStreamRules"</li></ul> | Add, remove or list the rules that are currently applied to tweet stream filter. | <ul><li>"http://localhost:3000/tweetStreamRules"</li></ul> | POST |
| <ul><li>"/tweetStream"</li></ul> | Start or stop tweet stream manually, or automatically run for set number of tweet data sets. | <ul><li>"http://localhost:3000/tweetStream"</li></ul> | POST |


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
Below is the refined and confirmed roadmap, that has been planned for completion. See [open issues][issues-url] and also the [project board][project-url], for any other proposed features or known issues, which may not be listed below.

| Feature/Task/Bugfix | Details | Version <i>(if released)</i> | Notes |
|:---|:---|:---|:---|
| <i>Bug#1</i> | <i>Bug details...</i> | <i>0.0.1</i> | <i>example#1</i> |
| <i>Feature#4</i> | <i>Feature details...</i> |   | <i>example#2</i> |
| Google Search Terms Analytics + Graph(s) | Collect data on search terms (that are gathered from social media?) and graph it. |   | Not started. |
| Extra/New Data Representation Graph(s) | Add extra graph types, like pie etc. |   | Not started. Low Priority. |
| Catch Weekly Graph Reload | Add a catch if the weekly graph needs a reload, to reload automatically |   | Not Started. |

<br><hr><br>



<!-- CHANGELOG -->
## Changelog

| Version | Date | Changes |
|:---|:---|:---|
| 0.1.1 | 2021-07-08 | <ul><li>Initial Commit.</li><li>Add initial directory structure and files.</li><li>Add Screenshots directory, and images.</li><li>Create and format README.md</li></ul> |
| 0.1.2 | 2021-07-14 | <ul><li>Remove local SimpleTxtLogger, replaced with npm module SimpleTxtLogger.</li><li>AWS Types Updates.</li><li>CodeQL workflow branch update.</li><li>Update README.md</li></ul> |
| 0.1.3 | 2021-08-03 | <ul><li>Fix Spelling.</li><li>Update README.md</li></ul> |
| 0.1.4 | 2021-08-04 | <ul><li>Update README.md</li></ul> |

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

<b>Tom Berey</b>; <i>Project Manager, Lead Developer, Principal Tester & Customer Services</i>;<br>tomberey1@gmail.com;

* [Issues & Requests][issues-url]
* [My Other Projects](https://github.com/tberey?tab=repositories)
* [Personal Website](https://tberey.github.io/)
* [Linked In](https://uk.linkedin.com/in/thomas-berey)

<br>

<!-- ACKNOWLEDGEMENTS -->
### Acknowledgements

* [Me](https://github.com/tberey)



<br><br><hr><div align="center">TomCo&trade; (Technology & Online Media Company &copy;)</div>




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
[linkedin-url]: https://uk.linkedin.com/in/thomas-berey
[project-url]: https://github.com/tberey/social-stocks/projects