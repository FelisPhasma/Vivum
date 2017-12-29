![Vivum.js](https://raw.githubusercontent.com/FelisPhasma/Vivum/master/Logo/Logo.png)

# Vivum.js

A micro JavaScript library for beautiful animations. Only **5.6 kb**.

# Usage

```
Vivum(<options>, <action>);
```

### Options

| Parameter | Default | Description |
|---|---|---|
| `from` | `0` | The starting value of the animation. Accepts numeric value. |
| `to` | `1` | The end value of the animation. Accepts numeric value. |
| `duration` | `400` | The duration of the animation. Accepts numeric value. Some speed values for `slow`, `fast`, and `default` are stored in the Accepts numeric value. `Vivum.speeds` object |
| `easing` | `linear` | The easing function to be used for the animation. Easing functions are stored in the `Vivum.easings` object. |
| `complete` | | Function callback to be called on complete. The value end value of the animation is passed to this function.

### Action

The action parameter should be a function which excepts one parameter which is the current value of the animation.

# Example usage

```
Vivum({
	from: 0,
	to: 100,
	duration: 500,
	easing:"easeOutBounce",
	complete: (v) => {
		document.getElementById("container").style.background = "#000";
		document.getElementById("container").style.color = "#fff";
	}
}, (v) => { // Callback for each animation frame
	document.getElementById("container").style.height = v + "px";
});
```

# License

Copyright Felis Phasma 2014, 2017 under the MIT License.
