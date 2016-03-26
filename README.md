# metacircular-eval

This is a (partial) toy implementation of eval() without using eval().

Implementing eval() this way is a common finger excercise for Lisp coders. 
I've done it often enough in different dialects of Lisp but never tried it in JavaScript.

Being just a little excercise I didn't try hard to make this anything near to a complete ES eval().
If you try it for yourself you will quickly realize how every further step is very obvious. Its all a matter
of looking at the AST and calling or extending the right evaluation rules.

--
Jochen H. Schmidt
