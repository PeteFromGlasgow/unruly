Unruly
======

Unruly attempts to compare HTML/Source Code and CSS and gives you a list of rules which are in the css, but not used in the source/HTML.

About Unruly
----------------
Unruly was made to automate the process of finding out if there is CSS/LESS being removed from source over time as a product evolves. It does not care about the context in which rules appear, making it suitable for most programming languages as well as raw html. 


Using Unruly
------------
Unruly can be used on many different filetypes as it does not pay attention to the context of the rule, only the value. 

	node Unruly -c *.less -s *.php

You can also use multiple different arguments for each type if your source is mixed.

	node Unruly -c *.less basic.css -s *.php index.html

Recursive lookups can be handled by using the globstar pattern.

	node Unruly -c ../RuleScrape/*.css ../RuleScrape/**/*.css -s ../RuleScrape/test.php

Known Issues
------------
* If you have a css rule that looks like a color, such as #Cab, it will be ignored.
* It is a horribly written hack, there are much better ways to do this.