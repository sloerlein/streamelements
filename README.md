# streamelements

1. Create a new custom widget (using Javascript) in streamelements
2. Copy each file to the correct language tab (replace all contents with content from files)
	- walker.html -> HTML
	- walker.css -> CSS
	- walker.js -> JS
	- walker.json -> FIELDS
3. Click "DONE" in bottom right
4. Position the widget box on your overlay, click SAVE in top right
5. add overlay to OBS as normal using the overlay URL
	- Skip this step if using an existing overlay already added in OBS

Useage Commands:

!startWalk speed
	- Displays the walk distance string, calculates using input speed number (walkpad miles per hour)
 	- example `!startWalk 3` will start display and calculate using 3 miles per hour

!endWalk
	- Stops updates to walk distance string, leaves displayed

!clearWalk
	- Hides the walk distance string display
