/**
 * For `js_test` by ZCFD at 22.04.13 23:04
 */
var log = function () {
	if (console !== undefined && typeof console.log === "function")
		console.log(arguments);
}

var GTableTools = {};
GTableTools.createElement = function (el_opt) {
	log('Create el ', el_opt);
	var el = document.createElement(el_opt['tag'] || 'div');
	delete(el_opt['tag']);

	for (var name in el_opt) {
		el.setAttribute(name, el_opt[name]);
	}

	return el;
}



var RowElement = function (tLabel, id) {
	if (!id) {
		id = RowElement.prototype._id ? ++RowElement.prototype._id : RowElement.prototype._id=1;
	}

	var that = this;

	this.radioBoxes = [];
	this.el = GTableTools.createElement({'tag': 'div', 'class': 'GTable_row'});
	for(var i =0; i<this.numOfRadioButtons; i++){
		var radio = GTableTools.createElement({'tag': 'input', 'type': 'radio', name: 'radio' + id, value: i});
		this.radioBoxes.push(radio);
		this.el.appendChild(radio);
		radio.onclick = function(){
			that.saveRadioVal(this.value);
		}
	}

	this.label = GTableTools.createElement({'tag': 'span'});
	this.label.innerHTML = "Label for el #" + id + ":\t'" + tLabel + "'";
	this.el.appendChild(this.label);
	//this.el.appendChild(GTableTools.createElement({'tag': 'span'}).innerHTML = tLabel);

	this.setText = function (text, id) {
		this.label.innerHTML = "Label for el #" + id + ":\t'" + text + "'";
		this.id = id;

		this.restoreRadioVal();

		// Just to add more visual effect of scrolling
		this.el.className = this.el.className.replace(/gtRowStylish\d+/mg, "");
		this.el.className += " gtRowStylish" + (id % (4));
	}

	this.saveRadioVal = function(val){
		setCookie("el"+this.id, val);
	}

	this.restoreRadioVal = function(){
		var cookieVal = getCookie("el" + this.id);
		var val = cookieVal? cookieVal: 0;
		for(var i=0; i< this.numOfRadioButtons; i++){
			if(this.radioBoxes[i].value == val)
				this.radioBoxes[i].checked = true;
			else
				this.radioBoxes[i].checked = false;
		}
	}

	return this;
}
RowElement.prototype.numOfRadioButtons = 3;

var GTable = function (opt) {
	this.initialize(opt);
	this.display();
	return this;
}

GTable.prototype.defaultSettings = {
	'rowHeight': 20,
	'data': [],
	'width': 500,
	'rows_to_display': 20
}

/**
 * Base initialization
 * @param opt
 */
GTable.prototype.initialize = function (opt) {
	log('Initialize new GTable');
	// Create settings
	if (typeof opt !== "object") {
		opt = {};
	}

	this.settings = this.defaultSettings;
	for (var name in opt) {
		this.settings[name] = opt[name];
	}

	if (typeof opt['holder_id'] !== "string") {
		throw("To create Gtable item holder_id must be defined as option");
		return;
	}

	if (!(this.holder = document.getElementById(opt['holder_id']))) {
		throw("Element to create Gtable was not found at DOM. Check id: " + holder_id);
		return;
	}


	// Create display elements
	this.scroller_holder = GTableTools.createElement({
		'tag': 'div',
		'class': 'GTable_scroller',
		'id': 'scroller_holder',
		'style': "height: " + (this.settings.rowHeight * this.settings.data.length) + "px;"
	});
	this.scroller = GTableTools.createElement({
		'tag': 'div',
		'class': 'GTable_scroller',
		'id': 'scroller',
		'style': "height: " + (this.settings.rowHeight * this.settings.data.length) + "px;"
	});
	this.table = GTableTools.createElement({
		'tag': 'div',
		'class': 'GTable_table',
		'id': 'table',
		'style': "height: " + (this.settings.rowHeight * this.settings.rows_to_display) + "px;"
	});
	this.informer = GTableTools.createElement({
		'tag': 'div',
		'class': 'GTable_informer',
		'id': 'informer'
	});

	this.holder.appendChild(this.table);
	this.scroller_holder.appendChild(this.scroller);
	this.holder.appendChild(this.scroller_holder);
	this.holder.appendChild(this.informer);

	var that = this;
	this.scroller_holder.onscroll = function () {
		that.onScroll(arguments[0]);
	}

	this.holder.setAttribute('class', (this.holder.getAttribute('class') ? this.holder.getAttribute('class') : "") + " GTable_holder");
	this.scroller_holder.setAttribute('style',
		+'height: ' + (this.settings.rows_to_display * this.settings.rowHeight) + "px;"
			+ 'max-height: ' + (this.settings.rows_to_display * this.settings.rowHeight) + "px;");
}

/**
 * Feel row array and create element at table
 */
GTable.prototype.display = function () {
	this.rows = [];
	for (var i = 0; i < this.settings.rows_to_display; i++) {
		var row = new RowElement(this.settings.data[i]);
		this.rows.push(row);
		this.table.appendChild(row.el);
	}
}

/**
 * Show msg at informer
 * @param  text
 */
GTable.prototype.infoMsg = function (text) {
	if (this.informer)
		this.informer.innerHTML = text.toString();
}

GTable.prototype.onScroll = function () {
	var el = arguments[0].originalTarget || arguments[0].srcElement;
	var scroll = (el.scrollTop / el.scrollHeight);
	var start = Math.floor(this.settings.data.length * scroll);
	var stop = start + this.settings.rows_to_display;
	var msg = "";
	msg += "<strong>onScroll:</strong> " + scroll * 100 + "%";
	msg += "<br />";
	msg += "Show from " + start + " - " + stop + " from " + this.settings.data.length;

	this.infoMsg(msg);
	this.printRows(start);
}

GTable.prototype.saveScroll = function (start) {
	var cookieVal = setCookie("gtScroll",this.scroller.scrollTop);
}

GTable.prototype.restoreScroll = function () {
	var cookieVal = getCookie("gtScroll");
	var val = cookieVal? cookieVal: 0;
	this.scroller.scrollTop = val;
}

GTable.prototype.printRows = function (start) {
	for (var i = 0; i < this.rows.length; i++) {
		this.rows[i].setText(this.settings.data[start + i], start + i);
	}
}



/* Typical code */
function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return undefined;
	} else {
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

function setCookie(cookieName, cookieValue, nDays) {
	var today = new Date();
	var expire = new Date();
	if (!nDays) nDays = 30;
	expire.setTime(today.getTime() + 3600000 * 24 * nDays);
	document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/; expires=" + expire.toGMTString();
}