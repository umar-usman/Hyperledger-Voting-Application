# hyperledger-Voting-Appication

Blockchain vote app built with hyperledger composer

This web app is meant to prove a simple vote use case and technically this can be turned into real electronique election app and fit the regulators laws in Pakistan.

# Client Application:

This web app is built essentially with **hyperledger composer** , **reactjs** for the client side , **expressjs** for the server side.
The web app interact with hyperledger through the composer REST JSON server.

# Election Commission Pakistan and Candidate Portal:

This web app is essentially built with **Angularjs** for the client side, and **Nodejs (Koa framework)** for the server side.

# Nadra API:

This is an dummy api for the user registration verification.
In the real world scenario, actual Nadra API can be used to serve this task.

# Installing pre-requisites:

`1- https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html`

`2- https://hyperledger.github.io/composer/latest/installing/development-tools.html`

`3- https://hyperledger.github.io/composer/latest/tutorials/deploy-to-fabric-single-org`

On 3rd link, jump to `Step Four: Locating the certificate and private key for the Hyperledger Fabric administrator`

# Installation:

First go to the Project folder and then go to vote-network directory, and execute the following command:

`npm install`

`1- cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./startFabric.sh
./createPeerAdminCard.sh`

`2- composer card create -p connection.json -u PeerAdmin -c admincerts/Admin@org1.example.com-cert.pem -k keystore/114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk -r PeerAdmin -r ChannelAdmin`

`3- composer card import -f admin@hyperledervotingapp.card`

`4- composer network install -c PeerAdmin@hlfv1 -a [path to repo]/vote-network/hyperledervotingapp@1.0.0.bna`

`5- composer network start --networkName hyperledervotingapp --networkVersion 1.0.0 -A admin -S adminpw -c PeerAdmin@hlfv1`

`6- composer-rest-server -c admin@hyperledervotingapp -n never -w true`

# Running Nadra API: 

`1- go to the Nadra API folder and then execute the following command:`

`npm install`

`npm run watch`

# Running Voting Application:

`1- First go to server folder in vote-app and execute following command:`

`npm install`

`npm run watch`

`2- then to go client folder in vote-app and execute following command:`

`npm install`

`npm run start`

# Running ECP(Election Commision Pakistan) / Candidate Portal:

`1- Go to the Portal-Backend folder and then execute the following command:`
`npm install`

`npm run watch`

`2- Go to the Portal-Frontend folder and then execute the following command:`

`npm install`

`npm run start`

Explore and Enjoy! :)

