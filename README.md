# Angular + Gemini Vision Pro = Code Generator from image

This repository contains a image generator using the model from Google Gemini called `gemini-vision-pro`, to use it you need to upload an image of some website and the model will generate the code to use or you just can open it in Stackblitz.

## How to use?

First, make sure you [generate an API key](https://makersuite.google.com/app/apikey) and use it in `google-gemini.service.ts`.

After that:

```
$ git clone git@github.com:cjosue15/code-generator.git
$ cd code-generator
$ npm i
$ ng serve
```

Open Chrome and navigate to http://localhost:4200.

## Technical details

This demo uses:

- Angular and the Gemini JavaScript API

# License

MIT
