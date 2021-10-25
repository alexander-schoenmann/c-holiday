# Singe Page Application ```c-holiday```

A single page application with its own templage engine. After logging in, you can choose between several cities, for which possible hotels will then be offered. Further information about each hotel can be found in a detailed view. Both cities and hotels can be added to the favourites. It is also possible to change the language. In the course of the development I dealt with Cookies (to store selected language), a translation engine, API's, CSS preprocessors and the local storage (to store favourites).

## 1 Usage

### 1.1 Preparation
Download the project from the master branch and save the zip file on your local machine. Unzip the zip file into a new folder (e.g. project).

### 1.2 Server
It is possible to run the app via localhost as well as via webhosting.

#### localhost
If you want to run the app via localhost, I recommend to download the programme Xampp (https://www.apachefriends.org/de/download.html). After the download is complete, navigate to C:\xampp\htdocs and paste the previously created folder "project".

#### webhosting
To make your app permanently accessible, I recommend using a web host. After you have received the access data from your hosting provider, you can connect to your web server via ftp. Then navigate to the folder public_html and paste the previously created folder "project".

### 1.3 Launch the app
To start the app in the browser, you have to navigate to the "project" folder. When accessing via localhost, this is done via localhost:8080/project. If you are using a webhost, this is done via www.yourname.com/project. After the url has been called, the app should be displayed correctly.

## 2 Administration corner
### 2.1 Contribution
Pull Requests are gladly welcome! Nevertheless please don't forget to add an issue and connect it to your pull requests. This is very helpful to understand what kind of issue the PR is going to solve.

Bugfixes: Please describe what kind of bug your fix solve and give me feedback how to reproduce the issue. I'm going to accept only bugfixes if I can reproduce the issue.

Features: Not every feature is relevant for the bulk of ```c-holiday``` users. In addition: I don't want to make ```c-holiday``` even more complicated in usability for an edge case feature. It helps to have a discussion about a new feature before you open a pull request.

### 2.2 Contact
If you have any questions regarding the project, please do not hesitate to contact me. I can be reached at alexander@schoenmann.co.at.
