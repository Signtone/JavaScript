<?php 
echo 'Origin null is the local file system, so that suggests that you're loading the HTML page that does the load call via a file:/// URL (e.g., just double-clicking it in a local file browser or similar). Different browsers take different approaches to applying the Same Origin Policy to local files.
My guess is that you're seeing this using Chrome. Chrome's rules for applying the SOP to local files are very tight, it disallows even loading files from the same directory as the document.But basically, using ajax with local resources isn't going to work cross-browser.
If you're just testing something locally that you'll really be deploying to the web, rather than use local files, install a simple web server and test via http:// URLs instead. That gives you a much more accurate security picture.
---------------
Use temporary server. If you still want to use Chrome, start it with the below option;
--allow-file-access-from-files';
?>