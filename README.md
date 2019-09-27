# Matterjs in PIXI

This is a demo of rendering ```matterjs``` elements inside PIXI.

## Approach
1. Create an offscreen ```canvas``` element and instantiate ```matterjs``` app in the canvas.
1. Create a PIXI sprite using ```matterjs``` canvas. Everything happening within the ```matterjs``` canvas will be rendered as a single sprite, with a touch of physics.
1. During loop cycle, reset PIXI renderer, and let ```matterjs``` do its magic. 
1. Update the ```matterjs``` sprite's texture and finally render the PIXI.

## Dev-Notes
1. Currently we have three ```matterjs``` apps running.
1. disable antialising for better performance. 

## How to Run
Simply host the project and open in browser.
```bash
http-server
```

## Author
Monoloco

## Changelog
* 1.0-rc
    * Run three instances of ```matterjs``` within pixi.
    * Add control to show/hide the ```matterjs``` apps.
    * Add a ```matterjs``` spin game, and setup an interaction between PIXI and ```matterjs``` apps.