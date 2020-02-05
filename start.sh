#!/bin/sh 
osascript <<END 
tell application "Terminal"
    do script "cd $(pwd) && npm install && nodemon"
	end tell
END

osascript <<END
tell application "Terminal"
    do script "redis-server"
end tell
END