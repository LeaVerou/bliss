**Note:**
Please don't use any Bliss functions in your tests except for the function you're testing. We want to
make it easy to find those pesky bugs. ;)

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

```
karma start
```

thats it, Karma will monitor your tests directory for any files with *Spec.js, and run them on change!
