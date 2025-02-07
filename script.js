var url = document.URL;
var isScreenValid = url.indexOf('screen=ally') !== -1 && url.indexOf('mode=members_troops') !== -1;

if(isScreenValid) {
	var pointUnitRatioPerUser = [];
	var unitPolulations = [1, 1, 1, 1, 2, 4, 5, 6, 5, 8];
	var rows = document.getElementsByClassName('w100')[0].rows;
	for(let i=1;i<rows.length-1;i++) {
		var row = rows.item(i);
		var rowElements = row.cells;
		setUserPointUnitRatio(rowElements);
	}
	
	clearDom('ratioTable');
	insertInDom('ratioTable', pointUnitRatioPerUser);
} else {
	alert('Ce script doit être lancé depuis l\'écran de visualisation de troupe de la tribu !');
}

function setUserPointUnitRatio(rowElements) {
	var user = getUserName(row.cells.item(0).textContent);
	var points = Number(row.cells.item(1).textContent.replaceAll('.', ''));
	var userUnitPopulation = 0;
	for(let j=2;j<rowElements.length-4;j++) {
		var nbOfUnit = rowElements.item(j).textContent;
		if(nbOfUnit.includes('?')) {
			userUnitPopulation = '?';
		} else {
			userUnitPopulation+=(Number(nbOfUnit) * unitPolulations[j-2]);
		}
	}
	var ratio = userUnitPopulation !== '?' ? parseFloat(userUnitPopulation / points).toFixed(2) : '?';
	pointUnitRatioPerUser.push({user: user, point: points, unitPopulation: userUnitPopulation, ratio: ratio});
}

function getUserName(user) {
	return user.replaceAll('\n', '').trim();
}

function clearDom(id) {
	var table = document.getElementById("ratioTable");
	if(table) {
		table.remove();
	}
}

function insertInDom(id, data) {
	let tableHTML = '<div id="' + id + '"><h1 style="margin-top: 1rem; font-size: 1rem;">Ratio par membre:</h1><table class="vis w100"><tr>';

			Object.keys(data[0]).forEach(key => {
				tableHTML += `<th>${key}</th>`;
			});

			tableHTML += '</tr>';

			data.forEach(item => {
				tableHTML += '<tr>';
				Object.values(item).forEach(value => {
					tableHTML += `<td>${value}</td>`;
				});
				tableHTML += '</tr>';
			});

			tableHTML += '</table></div>';
	document.getElementsByClassName('table-responsive')[0].insertAdjacentHTML('afterend', tableHTML);
}
