const PixelArt = () => {
	const boxShadow = '0px 1px 4px black';
	const insetBoxShadow = 'inset 0px 0px 4px black';

	//converts rgb to hex value
	function rgbToHex(r, g, b) {
		return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
	}

	//------CONTROLS----------
	//handles the click on save button
	const handleSaveBtn = () => {
		const saveBtn = document.getElementById('control-canvas-save');
		saveBtn.addEventListener('click', () => {
			let projectName = document.getElementById('control-canvas-name');

			//save project to local storage if project name is not empty
			if (projectName.value !== '') {
				projectName.value = '';

				//save canvas to local storage
				const projectName = document.getElementById('control-canvas-name').value;
				const canvas = document.getElementById('canvas').innerHTML;
				localStorage.setItem(projectName, canvas);

				alert('Project has been saved.');
			} else alert('Project name not found.');
		});
	};
	handleSaveBtn();

	//handles the click on view saved button
	const handleViewSavedBtn = () => {
		const viewSavedBtn = document.getElementById('control-canvas-view');
		let isClicked = false;

		viewSavedBtn.addEventListener('click', () => {
			if (!isClicked) {
				isClicked = true;
				viewSavedBtn.innerHTML = 'Hide saved';

				//reset recent colors
				const recentColors = document.getElementById('control-recent-colors');
				recentColors.innerHTML = '';

				//reset canvas content
				const canvas = document.getElementById('canvas');
				canvas.innerHTML = '';

				//creates a saved projects block used to display individual projects
				const savedProjectsBlock = canvas.appendChild(document.createElement('div'));
				savedProjectsBlock.id = 'saved-projects-block';

				//getting projects from localstorage and putting them into an array
				const localStorageList = { ...localStorage };
				let arrToLoad = Object.entries(localStorageList);

				//creating elements for each saved project
				arrToLoad.map((el) => {
					//adds project wrapper
					const projectWrapper = savedProjectsBlock.appendChild(document.createElement('div'));
					projectWrapper.id = 'project-wrapper';

					//adds project title
					const projectTitle = projectWrapper.appendChild(document.createElement('p'));
					projectTitle.innerHTML = `<b>Project name:</b> </br> <span>${el[0]}</span>`;
					projectTitle.id = 'project-title';

					//adds project output
					const projectOutput = projectWrapper.appendChild(document.createElement('div'));
					projectOutput.innerHTML = `${el[1]}`;
					projectOutput.id = 'project-output';

					//adds a load project button
					const downloadProjectBtn = projectWrapper.appendChild(document.createElement('button'));
					downloadProjectBtn.innerHTML = 'Download';
					downloadProjectBtn.id = 'project-downloadBtn';

					//style on hover
					downloadProjectBtn.addEventListener('mouseover', () => {
						downloadProjectBtn.style.boxShadow = insetBoxShadow;
						downloadProjectBtn.style.cursor = 'pointer';
					});

					//style on mouse leave
					downloadProjectBtn.addEventListener('mouseleave', () => {
						downloadProjectBtn.style.boxShadow = boxShadow;
					});

					//download project
					downloadProjectBtn.addEventListener('click', () => {});

					//adds a remove project button
					const removeProjectBtn = projectWrapper.appendChild(document.createElement('button'));
					removeProjectBtn.innerHTML = 'Remove project';
					removeProjectBtn.id = 'project-removeBtn';

					//style on hover
					removeProjectBtn.addEventListener('mouseover', () => {
						removeProjectBtn.style.boxShadow = insetBoxShadow;
						removeProjectBtn.style.cursor = 'pointer';
					});

					//style on mouse leave
					removeProjectBtn.addEventListener('mouseleave', () => {
						removeProjectBtn.style.boxShadow = boxShadow;
					});

					//removes project from localStorage and output of projects
					removeProjectBtn.addEventListener('click', () => {
						if (confirm('Are you sure that you want to remove this project?')) {
							arrToLoad.map((element) => {
								if (element[0] === el[0]) localStorage.removeItem(element[0]);
							});
							projectWrapper.remove();
						}
					});
				});
			} else {
				isClicked = false;
				viewSavedBtn.innerHTML = 'View saved';
				resetCanvas();
			}
		});
	};
	handleViewSavedBtn();

	//retrieves <input type='range'> slider element.
	const getSlider = (whichSlider) => {
		return document.getElementById(`control-canvas-${whichSlider === 'height' ? 'height' : 'width'}`);
	};

	//retrieves <span> element - child of slider label.
	const getLabel = (whichLabel) => {
		return document.getElementById(`canvas-${whichLabel === 'height' ? 'height' : 'width'}-label-val`);
	};

	//sets the <span> innerHTML to show the chosen value using slider element.
	const handleSlider = (which) => {
		const slider = getSlider(which);
		slider.oninput = () => (getLabel(which).innerHTML = getSlider(which).value);
		getLabel(which).innerHTML = getSlider(which).value;
	};
	handleSlider('width');
	handleSlider('height');

	//clears canvas
	const resetCanvas = () => {
		setCanvasArea(getSlider('height').value, getSlider('width').value);

		//reset recent colors
		const recentColors = document.getElementById('control-recent-colors');
		recentColors.innerHTML = '';
	};

	//handles the click on reset button
	const handleResetClick = () => {
		const resetBtn = document.getElementById('control-canvas-reset');
		resetBtn.addEventListener('click', () => {
			resetCanvas();
		});
	};
	handleResetClick();

	//holds sampling state on/off
	let samplingColor = false;

	//handles sample color button functionality
	const handleSampleColorBtn = () => {
		const sampleColorBtn = document.getElementById('control-canvas-colorsample');

		//sets button state and styling on click
		sampleColorBtn.addEventListener('click', () => {
			if (!samplingColor) {
				samplingColor = true;
				sampleColorBtn.innerHTML = 'Sample color - ON';
				sampleColorBtn.style.boxShadow = insetBoxShadow;
			} else {
				samplingColor = false;
				sampleColorBtn.innerHTML = 'Sample color - OFF';
				sampleColorBtn.style.boxShadow = boxShadow;
			}
		});

		//element hover style
		sampleColorBtn.addEventListener('mouseover', () => {
			sampleColorBtn.style.boxShadow = insetBoxShadow;
		});

		//element mouse leave style
		sampleColorBtn.addEventListener('mouseleave', () => {
			sampleColorBtn.style.boxShadow = boxShadow;
		});
	};
	handleSampleColorBtn();

	//holds eraser state on/off
	let eraser = false;

	//handles eraser button functionality
	const handleEraserBtnClick = () => {
		const eraserBtn = document.getElementById('control-canvas-eraser');

		//sets button state and styling on click
		eraserBtn.addEventListener('click', () => {
			if (!eraser) {
				eraser = true;
				eraserBtn.innerHTML = 'Eraser - ON';
				eraserBtn.style.boxShadow = insetBoxShadow;
			} else {
				eraser = false;
				eraserBtn.innerHTML = 'Eraser - OFF';
				eraserBtn.style.boxShadow = boxShadow;
			}
		});

		//element hover style
		eraserBtn.addEventListener('mouseover', () => {
			eraserBtn.style.boxShadow = insetBoxShadow;
		});

		//element mouse leave style
		eraserBtn.addEventListener('mouseleave', () => {
			eraserBtn.style.boxShadow = boxShadow;
		});
	};
	handleEraserBtnClick();

	//filters out colors used in the canvas - list of recently used colors
	const handleRecentColors = (color) => {
		const recentColors = document.getElementById('control-recent-colors');

		//check if the colors element has any children
		if (recentColors.children.length === 0) {
			//if no children, create a new div for the color and append it to the colors element
			const storedColor = recentColors.appendChild(document.createElement('div'));
			storedColor.style.backgroundColor = color;
			storedColor.style.height = '20px';
			storedColor.style.width = '20px';
		} else {
			//if there are children, convert them into an array
			const storedColorArray = Array.from(recentColors.children);
			let isAlreadyAdded = false;

			//loop through the stored color array
			for (let i in storedColorArray) {
				//get the pixel color and convert it from rgb to hex
				const getColor = storedColorArray[i].style.backgroundColor;
				const rgbColorToArray = String(getColor).replace('rgb(', '').replace(')', '').split(',');
				const hexColor = rgbToHex(...rgbColorToArray);

				//check if the current color is already in the stored color array
				if (hexColor === color) isAlreadyAdded = true;
			}

			//if the current color is not in the stored color array, add a new node representing the recently used color
			if (!isAlreadyAdded) {
				const storedColor = recentColors.appendChild(document.createElement('div'));
				storedColor.style.backgroundColor = color;
				storedColor.style.height = '20px';
				storedColor.style.width = '20px';

				//TODO:
				//style the recently used colors
			}
		}
	};

	//--------CANVAS  &  PIXELS-------
	// Object to store previous styles for each pixel
	let previousPixelStyles = {};

	// Sets the styling of a pixel on mouse enter - color based on user chosen color
	const pixelHoverOn = (event) => {
		const targetPixel = event.target;
		let color = document.getElementById('control-canvas-color');

		//sample color on = highlights pixel to sample
		if (samplingColor) {
			//get pixel color and convert it from rgb to hex
			const getColor = getComputedStyle(targetPixel).backgroundColor;
			const rgbColorToArray = getColor.match(/\d+/g);
			const hexColor = rgbToHex(...rgbColorToArray);

			//trigger on pixel click
			targetPixel.addEventListener('click', () => {
				color.value = hexColor; //change color picker value
				samplingColor = false; //turn of color sampling
				const sampleColorBtn = document.getElementById('control-canvas-colorsample');
				sampleColorBtn.innerHTML = 'Sample color - OFF';
				sampleColorBtn.style.boxShadow = boxShadow;
			});

			//Save previous styles for the pixel
			previousPixelStyles[targetPixel.id] = {
				backgroundColor: targetPixel.style.backgroundColor,
				borderColor: targetPixel.style.borderColor,
			};

			//Apply the new color to the pixel
			targetPixel.style.backgroundColor = `#${hexColor.replace('#', '')}B1`;
			targetPixel.style.borderColor = `#${hexColor.replace('#', '')}B1`;
			return;
		}

		//eraser on - highlights pixel to erase
		if (eraser) {
			//Save previous styles for the pixel
			previousPixelStyles[targetPixel.id] = {
				backgroundColor: targetPixel.style.backgroundColor,
				borderColor: targetPixel.style.borderColor,
			};

			//Apply the new color to the pixel
			targetPixel.style.backgroundColor = 'white';
			targetPixel.style.borderColor = '#efd7f7';
			return;
		}

		//Save previous styles for the pixel
		previousPixelStyles[targetPixel.id] = {
			backgroundColor: targetPixel.style.backgroundColor,
			borderColor: targetPixel.style.borderColor,
		};

		//Apply the new color to the pixel
		targetPixel.style.backgroundColor = color;
		targetPixel.style.borderColor = color;
	};

	//Sets the styling of a pixel on mouse leave - back to previous state
	const pixelHoverOff = (event) => {
		const targetPixel = event.target;
		const previousStyles = previousPixelStyles[targetPixel.id];

		//if there is previous style for the pixel
		if (previousStyles) {
			//convert its rgb color value to hex
			const rgbColorToArray = String(previousStyles.backgroundColor).replace('rgb(', '').replace(')', '').split(',');
			const hexColor = rgbToHex(...rgbColorToArray);

			//if the color is set to white - eraser
			if (hexColor !== '#ffffff') {
				//Revert to previous styles if available
				targetPixel.style.backgroundColor = previousStyles.backgroundColor;
				targetPixel.style.borderColor = previousStyles.borderColor;
			} else return;
		} else {
			//Apply default styles if no previous styles were saved
			targetPixel.style.backgroundColor = 'white';
			targetPixel.style.borderColor = '#efd7f7';
		}
	};

	//sets the bg color of an element - clicked pixel
	const setPixelColor = (event) => {
		const targetPixel = event.target;
		const color = document.getElementById('control-canvas-color').value;

		//color sampler - on
		if (samplingColor) return;

		//eraser - on
		if (eraser) {
			//apply the default colors to the pixel
			targetPixel.style.backgroundColor = 'white';
			targetPixel.style.borderColor = '#efd7f7';

			//save the newly set styles for the pixel
			previousPixelStyles[targetPixel.id] = {
				backgroundColor: 'white',
				borderColor: '#efd7f7',
			};
			return;
		}

		//apply the new color to the pixel
		targetPixel.style.backgroundColor = color;
		targetPixel.style.borderColor = color;

		//save the newly set styles for the pixel
		previousPixelStyles[targetPixel.id] = {
			backgroundColor: color,
			borderColor: color,
		};

		handleRecentColors(color);
	};

	//generates the canvas area based on widht and height
	const setCanvasArea = (height, width) => {
		const canvas = document.getElementById('canvas');
		canvas.innerHTML = '';

		//generates the height - amount of rows
		for (i = 0; i < height; i++) {
			//add new row
			const row = canvas.appendChild(document.createElement('div'));
			row.className = 'canvas-pixel-row';

			//generates the width - amount of columns
			for (j = 0; j < width; j++) {
				//add new pixel
				const newCanvasPixel = row.appendChild(document.createElement('div'));
				newCanvasPixel.className = 'canvas-pixel';

				//when lmb is pressed set pixel color
				newCanvasPixel.addEventListener('mousedown', (e) => {
					e.buttons === 1 ? setPixelColor(e) : null;
				});

				//when lmb is pressed and cursor hovers over element - set pixel color
				//when lmb is not pressed and cursor hovers over element - pixel highlight on
				newCanvasPixel.addEventListener('mouseover', (e) => {
					e.buttons === 1 ? setPixelColor(e) : pixelHoverOn(e);
				});

				//when lmb is not pressed and cursor leaves the pixel - pixel highlight off
				newCanvasPixel.addEventListener('mouseleave', (e) => {
					pixelHoverOff(e);
				});
			}
		}
	};

	//sets canvas size on height input
	getSlider('height').addEventListener('input', () => {
		setCanvasArea(getSlider('height').value, getSlider('width').value);
	});

	//sets canvas size on width input
	getSlider('width').addEventListener('input', () => {
		setCanvasArea(getSlider('height').value, getSlider('width').value);
	});

	//sets canvas size on page load
	setCanvasArea(getSlider('height').value, getSlider('width').value);
};

window.addEventListener('load', PixelArt);
