#!/bin/zsh
# has to be run from terminal by ./py.command  in the project folder 
# it starts automatically a chrome nav. It will say 'unavailable' until python starts 
open -a /Applications/"Google Chrome.app" "http://localhost:8081/sketches" 
# start module http. Be aware port # be the same as chrome. I use to have a different port per projects. 
#python3 -m http.server 8081
#
python3 ./server.py


 