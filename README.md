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

# Installation:
`1- cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./startFabric.sh
./createPeerAdminCard.sh`

2- `composer card create -p connection.json -u PeerAdmin -c admincerts/Admin@org1.example.com-cert.pem -k keystore/114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk -r PeerAdmin -r ChannelAdmin`

3- `composer card import -f PeerAdmin@hlfv1`

4- `composer network install -c PeerAdmin@hlfv1 -a ~/Documents/votingApp/HyperLedger-Voting-Dapp/Hyperledger-Composer/vote-network/vote-network@1.0.0.bna`

5- `composer network start --networkName vote-network --networkVersion 0.0.7 -A admin -S adminpw -c PeerAdmin@hlfv1`

6- `composer-rest-server -c admin@vote-network -n never -w true`

# Execution:

7- to go vote-server folder and execute following command:
node app.js

8- to go vote-app folder and execute following command:
npm run start

Explore and Enjoy! :)

