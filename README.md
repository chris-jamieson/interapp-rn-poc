# React Native Android Inter-app Proof of Concept

Example code to demonstrate how to handle an Android Intent and return a result - i.e. how to handle `startActivityForResult()` in React Native.

Heavily inspired by code from [this blog post](https://devblogs.microsoft.com/cse/2018/04/04/app-app-communication-react-native-android/) about the ixo Foundation approach.

## Demo Screen Recording

https://user-images.githubusercontent.com/4264763/156038668-45163265-cc7a-4b5c-a2f9-5feae0edc0da.mp4


## Build and run main app

Plug in USB android device, ensure USB debugging is enabled

- `cd main`
- `npm install`
- `expo run:android`

## Build and run third party app

- `cd third-party`
- `npm install`
- `expo start`
