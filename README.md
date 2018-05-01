# spacebrewChat
Uses the websockets interface library from Rockwell Labs, Spacebrew: http://docs.spacebrew.cc/<br><br>
A chat application between multiple mobile and desktop devices connected to the server, without any details on the sender.
The game relies on how well the players know each other, guessing from the messages sent to their device!

Setting up client-side:
<li>Install python
<li>Run python -m SimpleHTTPServer <portNumber> from your terminal
<li>Go to the ipAddress:<portNumber> on your mobile browser

Setting up server-side:
<li>Enter the nodeServer directory and run the following command from terminal:
<li>node node_server.js -p <portNumber>
    
Go to the localhost:portNumber on your browser to access the admin panel, and enjoy cross-connecting the players!
