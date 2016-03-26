# metacircular-eval

> ... that was the big revelation to me when I was in graduate school - when I finally understood that the half page of code on the bottom of page 13 of the Lisp 1.5 manual was Lisp in itself. These were "Maxwell's Equations of Software!" This is the whole world of programming in a few lines that I can put my hand over.
> -- Alan Kay

This is a (partial) toy implementation of eval() without using eval().

Implementing eval() this way is a common finger excercise for Lisp coders. 
I've done it often enough in different dialects of Lisp but never tried it in JavaScript.

Being just a little excercise I didn't try hard to make this anything near to a complete ES eval().
If you try it for yourself you will quickly realize how every further step is very obvious. Its all a matter
of looking at the AST and calling or extending the right evaluation rules.

--
Jochen H. Schmidt
