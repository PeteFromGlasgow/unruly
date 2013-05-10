Unruly
======

Unruly attempts to compare HTML/Source Code and CSS and gives you a list of rules which are in the css, but not used in the source/HTML.

Why was it made?
----------------
Unruly was made to automate the process of finding out if there is CSS/LESS being removed from source over time as a product evolves. 


Using Unruly
------------
Unruly can be used on many different filetypes as it does not pay attention to the context of the rule, only the value. 

	node Unruly -c *.less -s *.php

You can also use multiple different arguments for each type if your source is mixed.

	node Unruly -c *.less basic.css -s *.php index.html

Known Issues
------------
* Unruly currently treats colors as CSS rules.
* No recursive support
