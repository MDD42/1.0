function tabShop(){
	document.getElementById('shopping-list').style.display ='block';
	document.getElementById('done-list').style.display = 'none';
	document.getElementById('del-list').style.display = 'none';
}

function tabDone(){
	document.getElementById('shopping-list').style.display ='none';
	document.getElementById('done-list').style.display = 'block';
	document.getElementById('del-list').style.display = 'none';
}

function tabDel(){
	document.getElementById('shopping-list').style.display ='none';
	document.getElementById('done-list').style.display = 'none';
	document.getElementById('del-list').style.display = 'block';
}

var tableShop = document.getElementById('table-shop'),
tableDone = document.getElementById('table-done'),
tableDel = document.getElementById('table-del'),
shopList = [],
doneList = [],
delList = [];

function Purchase(number, done, del, item, quantity, price) {
	this.id = number;
	this.done = done;
	this.del = del;
	this.item = item;
	this.quantity = quantity;
	this.price = price;
}




document.getElementById("add").addEventListener("click", function() {
	shopList[shopList.length] = new Purchase(shopList.length+1, false, false,
	document.getElementById('item').value,
	document.getElementById('quantity').value,
	document.getElementById('price').value);
	out(tableShop, shopList);
	});

function countTotal() {
	const total = shopList.reduce(function(sum, item) { return sum += item.price});
	document.getElementById('totalPrice').innerText = total;
	}


function addRow(targetTable) {
	tr = document.createElement('tr'),
	tdNumber = document.createElement('td'),
	tdDone = document.createElement('td'), 
	tdItem = document.createElement('td'), 
	tdQuantity = document.createElement('td'), 
	tdPrice = document.createElement('td'), 
	tdAction = document.createElement('td');
	removeButton = document.createElement('button');
	removeButton.innerHTML = '<strong>&#215;</strong>';
	removeButton.className = 'remove';
	removeButton.addEventListener('click', function() { remove(this.parentElement)});
	updateButton = document.createElement('button');
	updateButton.innerHTML = '<strong>&#9998;</strong>';
	updateButton.className = 'update';
	updateButton.addEventListener('click', function() { update(this.parentElement)});

	tr.appendChild(tdNumber);
	tr.appendChild(tdDone);
	tr.appendChild(tdItem);
	tr.appendChild(tdQuantity);
	tr.appendChild(tdPrice);
	tr.appendChild(tdAction);
	tdAction.appendChild(removeButton);
	tdAction.appendChild(updateButton);
	targetTable.appendChild(tr);
}


function done(item) {
	if (!item.getElementsByTagName('input')[0].checked) {
		var parent = item.parentElement;
		shopList[shopList.length] = new Purchase(shopList.length+1, true, false, parent.getElementsByTagName('td')[2].innerHTML, parent.getElementsByTagName('td')[3].innerHTML, parent.getElementsByTagName('td')[4].innerHTML);
		out(tableShop, shopList);
		parent.parentElement.removeChild(parent);		
		doneList.splice(parent.getElementsByTagName('td')[0].getElementsByTagName('strong')[0].innerHTML, 1);
	}
	else {
		var parent = item.parentElement;
		doneList[doneList.length] = new Purchase(doneList.length+1, true, false, parent.getElementsByTagName('td')[2].innerHTML, parent.getElementsByTagName('td')[3].innerHTML, parent.getElementsByTagName('td')[4].innerHTML);
		out(tableDone, doneList);
		parent.parentElement.removeChild(parent);	
		shopList.splice(parent.getElementsByTagName('td')[0].getElementsByTagName('strong')[0].innerHTML-1, 1);
	}		
}

function out(targetTable, list){
	addRow(targetTable);
	for (var key in list) {
		tdNumber.innerHTML = '<strong>' + ++key + '</strong>';
		if (list === doneList) {
			tdDone.innerHTML = '<input type="checkbox" class="done" onclick ="done(this.parentElement);" checked />';
		} else {
			tdDone.innerHTML = '<input type="checkbox" class="done" onclick ="done(this.parentElement);" />';
		}
		tdItem.innerHTML = list[--key].item;
		tdQuantity.innerHTML = list[key].quantity;
		tdPrice.innerHTML = list[key].price;
		if (list === doneList) {
			updateButton.style.display='none';
		}
		if(list === delList){
			updateButton.style.display='none';
			removeButton.addEventListener('click', function() {fullremove(this.parentElement)});
		}
	}
}




function remove (item) {
	var parent = item.parentElement;	
	delList[delList.length] = new Purchase(delList.length+1, true, true, parent.getElementsByTagName('td')[2].innerHTML, parent.getElementsByTagName('td')[3].innerHTML, parent.getElementsByTagName('td')[4].innerHTML);		
	out(tableDel, delList);
	parent.parentElement.removeChild(parent);
}

function fullremove (item) {
	var parent = tr.parentElement;
	parent.removeChild(tr); 
}


function update (itim) {
	var parent = item.parentElement;
	parent.style.backgroundColor = "grey";
}
