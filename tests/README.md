### Guidelines for Testing in Bliss

Please don't use any Bliss functions in your tests except for the function you're testing. We want to
make it easy to find those pesky bugs. ;)

Please use HTML fixtures whenever possible vs creating DOM elements with JS. This will make the tests much shorter and more readable, by separating the HTML from the Javascript.
[View Example](https://github.com/LeaVerou/bliss/blob/gh-pages/tests/CoreSpec.js#L4-L15)

Please use spies or stubs for callbacks whenever possible. This makes the tests more readable and easier to make assertions on the callback function.
[View Example](https://github.com/LeaVerou/bliss/blob/gh-pages/tests/objects/LazySpec.js#L15-L22)  
[More info on Sinon here](http://sinonjs.org/)

### Setup

Install Karma, by running:

```
npm install karma --save-dev
```

Then install the Command Line tools:

```
npm install -g karma-cli
```

### Running the tests

cd to the root of the project

For TDD development.

```
karma start
```
Karma will now monitor your tests directory for any files with ```*Spec.js```, and run them on change!

For a single run
```
npm test
```


