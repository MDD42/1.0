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
	document.querySelector('#totalPrice').innerText = total;
}

	// function total (){
	// 	var total = 0;
	// 	var totalPrice = 0;
	// 	Quantity = document.getElementById('quantity').value, 
	// 	Price = document.getElementById('price').value,
	// 	totalPrice = (Price * Quantity);
	// 	total
	
	// 	document.getElementById('totalPrice').innerHTML = totalPrice;
	// }
	


	// var total = 0;
	// // инициализация где-то вверху переменной куда будем писать сумму покупок
	// function increaseTotal(amount) {
	// 	total += amount , renderTotal()
	// } 
	// function renderTotal() {
	// // просто отображает значение из переменной тотал на веб страницу
	// }
	// и 
	// decreaseTotal(amount) {
	// // вызывается при удаление и тоже вызывает renderTotal()
	// }


// function addItem(event) {
// 	event.preventDefault();

// 	if (addInput.value === '') {
// 		return alert('Необходимо ввести название.');
// 	}

// 	const targetItem = createShopItem(addInput.value);
// 	targetList.appendChild(targetItem);
// 	addInput.value = '';
// }

// const AddForm = document.getElementById('add-form');
// const additem = document.getElementById('item');
// const shoppingList = document.getElementById('shopping-list');
// const tableItems = document.querySelectorAll('.table');

// function main() {
//     AddForm.addEventListener('submit', addshopItem);
//     tableItems.forEach(item => bindEvents(item));
// }


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






// var fullTotal = function () {
// 	var totalPrice = 0;
// 	var quantity = document.getElementsByTagName('td')[3].innerHTML;
// 	var price = document.getElementsByTagName('td')[4].innerHTML;
	
// 	var totalPrice = (quantity * price);
// }
// document.getElementById('totalPrice').innerHTML = totalPrice;



// var tdSpan = document.querySelectorAll('.xspColumnViewStart > span'),
//     sum = 0;
// [].forEach.call(tdSpan, function(s){
//     sum += +s.innerHTML;
// });
// console.log(sum);


// function f(){
//     var p = document.getElementById('prod').value,
//         n = document.getElementById('num').value,
//         s = document.getElementById('sum').value = Number(p) * Number(n);
// }




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
