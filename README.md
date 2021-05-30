# Anomaly Detection Server

This is the second milestone in the 'Advanced Programming 2' course. An anomaly detection server is a web application used to detect anomalies in csv files that contain data about any activity.

In this [link](https://youtu.be/cUXwgftYXGk) you can see video that explain about using the server app. 

## Installation

First, make sure you have nodejs installed on your computer (if not, download from [here](https://nodejs.org/en/)).Then type the following commands in the console, from the 'controller' folder, to run the server:
```bash
$ node server.js
```

Now go to your browser and open the URL: "localhost: 8080". You can now upload the csv files to the app and receive an anomalies report.

![openScreen](https://github.com/oryaniv5/Anomaly_Detection_Server_Webapp/blob/main/readme%20images/anomaly%20detection%20server%20open%20screen.jpg)

## How To Use?

To get an anomaly report, select the algorithm to use (only two options available, 'Hybrid' or 'Regression'). Then upload a standard data file and a file to detect an exception, both in csv format. Click "detect" and receive the anomalies report in the form at the bottom of the screen.

![anomaiesList](https://github.com/oryaniv5/Anomaly_Detection_Server_Webapp/blob/main/readme%20images/anomalies%20list.jpg)


## Developers
* Itai Schuldenfrei
* Oz Browner
* Oz Hizkiya
* Or Yaniv
