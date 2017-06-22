# SMS Sentiment Analysis
This demo uses Twilio and Haven OnDemand to accept text messages, perform sentiment analysis on the message, and publish to a page with the overall sentiment value (positive, negative, neutral). It also extracts the concepts and displays a TERRIBLE wordcloud. 

## Usage:
*Pre-Reqs*  
A Twilio account with a virtual phone number that is enabled for SMS messages. (www.twilio.com)  
A Haven OnDemand API key (www.havenondemand.com)  

*Configure*  
Add a webhook to the Twilio number to point to http://yourapp/text_processor  
Note - if you dont have a way to deploy this publicly, you can use ngrok to host this locally.  

The following environment variables should be set:  
PORT - the port Express should run on  
PHONE - The twilio number created above  
HODAPIKEY - The HavenOnDemand API key  
  
  
Deployments for the following platforms are included: Docker, Cloud Foundry, Kubernetes.  
The specs for Kubernetes deployment are also included. Note that the ingress spec is assuming you are using Traefik for an ingress controller. If you arent, this will need to be modified.  

