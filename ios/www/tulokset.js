/*		function fire(){
							$('#contacts-table tr *:nth-child(1)').toggleClass('hidden');
							$('#contacts-table tr *:nth-child(4)').toggleClass('aright');
		}
		var Contacts = {
			index: window.localStorage.getItem("Contacts:index"),
			$table: document.getElementById("contacts-table"),
			$form: document.getElementById("contacts-form"),
			$button_save: document.getElementById("contacts-op-save"),
			// $button_discard: document.getElementById("contacts-op-discard"),

			init: function() {
				// initialize storage index
				if (!Contacts.index) {
					window.localStorage.setItem("Contacts:index", Contacts.index = 1);
				}
				// initialize form
				//Contacts.$form.reset();
				//Contacts.$button_discard.addEventListener("click", function(event) {
				//	Contacts.$form.reset();
			//		Contacts.$form.id_entry.value = 0;
			//	}, true);
				Contacts.$form.addEventListener("submit", function(event) {
					var entry = {
						id: parseInt(this.id_entry.value),
						treeni: this.treeni.value,
						tulos: this.tulos.value
					};
					if (entry.id == 0) { // add
						Contacts.storeAdd(entry);
						Contacts.tableAdd(entry);
					}
					else { // edit
						Contacts.storeEdit(entry);
						Contacts.tableEdit(entry);
					}
					this.reset();
					this.id_entry.value = 0;
					event.preventDefault();
				}, true);

				// initialize table
				if (window.localStorage.length - 1) {
					var contacts_list = [], i, key;
					for (i = 0; i < window.localStorage.length; i++) {
						key = window.localStorage.key(i);
						if (/Contacts:\d+/.test(key)) {
							contacts_list.push(JSON.parse(window.localStorage.getItem(key)));
						}
					}

					if (contacts_list.length) {
						contacts_list
							.sort(function(a, b) {
								return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
							})
							.forEach(Contacts.tableAdd);	
					}
				}
				Contacts.$table.addEventListener("click", function(event) {
					var op = event.target.getAttribute("data-op");
					if (/edit|remove/.test(op)) {
						var entry = JSON.parse(window.localStorage.getItem("Contacts:"+ event.target.getAttribute("data-id")));
						if (op == "edit") {
							navigator.notification.alert("Edit");
							Contacts.$form.treeni.value = entry.treeni;
							Contacts.$form.tulos.value = entry.tulos;
							Contacts.$form.id_entry.value = entry.id;
						}
						else if (op == "remove") {
							navigator.notification.alert("Remove");
							if (confirm('Haluatko varmasti poistaa tuloksen:'+ entry.treeni +' '+ entry.tulos)) {
								Contacts.storeRemove(entry);
								Contacts.tableRemove(entry);
							}
						}
						event.preventDefault();
					}
				}, true);
			},

			storeAdd: function(entry) {
				entry.id = Contacts.index;
				window.localStorage.setItem("Contacts:index", ++Contacts.index);
				window.localStorage.setItem("Contacts:"+ entry.id, JSON.stringify(entry));
			},
			storeEdit: function(entry) {
				window.localStorage.setItem("Contacts:"+ entry.id, JSON.stringify(entry));
			},
			storeRemove: function(entry) {
				window.localStorage.removeItem("Contacts:"+ entry.id);
			},

			tableAdd: function(entry) {
				var $tr = document.createElement("tr"), $td, key;
				for (key in entry) {
					if (entry.hasOwnProperty(key)) {
						$td = document.createElement("td");
						$td.appendChild(document.createTextNode(entry[key]));
						$tr.appendChild($td);
					}
				}
				$td = document.createElement("td");
				$td.innerHTML = '<a class="ui-btn ui-btn-inline ui-icon-edit ui-btn-icon-notext" data-op="edit" data-theme="d" data-id="'+ entry.id +'">Edit</a><a class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-notext" data-op="remove" data-id="'+ entry.id +'">Remove</a>';
				$tr.appendChild($td);
				$tr.setAttribute("id", "entry-"+ entry.id);
				Contacts.$table.appendChild($tr);
			},
			tableEdit: function(entry) {
				var $tr = document.getElementById("entry-"+ entry.id), $td, key;
				$tr.innerHTML = "";
				for (key in entry) {
					if (entry.hasOwnProperty(key)) {
						$td = document.createElement("td");
						$td.appendChild(document.createTextNode(entry[key]));
						$tr.appendChild($td);
					}
				}
				$td = document.createElement("td");
				$td.innerHTML = '<a class="ui-btn ui-btn-inline ui-icon-edit ui-btn-icon-notext" data-op="edit" data-id="'+ entry.id +'">Edit</a><a class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-notext" data-op="remove" data-id="'+ entry.id +'">Remove</a>';
				$tr.appendChild($td);
			},
			tableRemove: function(entry) {
				Contacts.$table.removeChild(document.getElementById("entry-"+ entry.id));
			}
		};
		Contacts.init();*/

var $table = document.getElementById("contacts-table");

function table_add(entry, index)
{
	//console.log(entry);
	var $tr = document.createElement("tr"), $td, key;
		
	$td = document.createElement("td");
	$td.appendChild(document.createTextNode(index));
	$tr.appendChild($td);
	
	$td = document.createElement("td");
	console.log(typeString[entry.type]);
	$td.appendChild(document.createTextNode(typeString[entry.type]));
	$tr.appendChild($td);
	
	$td = document.createElement("td");
	$td.appendChild(document.createTextNode(entry.result));
	$tr.appendChild($td);
	
	$td = document.createElement("td");
	$td.innerHTML = '<a class="ui-btn ui-btn-inline ui-icon-edit ui-btn-icon-notext" data-op="edit" data-theme="d" data-id="'+ entry.id +'">Edit</a><a class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-notext" data-op="remove" data-id="'+ entry.id +'">Remove</a>';
	$tr.appendChild($td);
	$tr.setAttribute("id", "entry-"+ entry.id);
	
	$table.appendChild($tr);
}

function table_edit(entry, index)
{
	var $tr = document.getElementById("entry-"+ entry.id), $td, key;
	$tr.innerHTML = "";
	
	$td = document.createElement("td");
	$td.appendChild(document.createTextNode(index));
	$tr.appendChild($td);
	
	$td = document.createElement("td");
	$td.appendChild(document.createTextNode(typeString[entry.type]));
	$tr.appendChild($td);
	
	$td = document.createElement("td");
	$td.appendChild(document.createTextNode(entry.result));
	$tr.appendChild($td);
	
	$td = document.createElement("td");
	$td.innerHTML = '<a class="ui-btn ui-btn-inline ui-icon-edit ui-btn-icon-notext" data-op="edit" data-id="'+ entry.id +'">Edit</a><a class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-notext" data-op="remove" data-id="'+ entry.id +'">Remove</a>';
	$tr.appendChild($td);
}

function table_remove(entry_id)
{
	$table.removeChild(document.getElementById("entry-"+ entry_id));
}

function array_edit(entry)
{
	$.each(activityJson[activityType]['activities'], function(i, data){
		if(data['id'] == entry.id)
		{
			data['result'] = entry.result;
			data['type'] = entry.type;
		}
	});
	console.log(activityJson[activityType]);
}

function array_remove(index)
{
	activityJson[activityType]['activities'].splice(index-1, 1);
}

function array_add(entry, id)
{
  activityJson[activityType]['activities'].push(entry);
  console.log(activityJson[activityType]);
}

$('#contacts-table').on('click', function(event){
		var op = event.target.getAttribute("data-op");
			if (/edit|remove/.test(op)) {
				
				var treeni, tulos;
				$.each(activityJson[activityType]['activities'], function(i, data){
					if(data['id'] == event.target.getAttribute("data-id"))
					{
						cur_id = event.target.getAttribute("data-id");
						treeni = data['type'];
						tulos = data['result'];
						cur_index = i + 1;
					}
				});
				
				if (op == "edit") {
					action_type = 'edit';
				}
				else if (op == "remove") {
					action_type = 'remove';
					//if (confirm('Haluatko varmasti poistaa tuloksen: '+ typeString[treeni] +' '+ tulos)) {
					//	server_remove(event.target.getAttribute("data-id"));
					//}
                        navigator.notification.confirm('Haluatko varmasti poistaa tuloksen: '+ typeString[treeni] +' '+ tulos, function(){server_remove(event.target.getAttribute("data-id"));}, "Taisto", "OK, Cancel")
				}
				event.preventDefault();
			}
});

$('#contacts-op-save').click(function(event){
	var treeni = document.getElementById('contacts-form').treeni.value;
	var tulos = document.getElementById('contacts-form').tulos.value;
	
	if(action_type == 'edit')
	{
		var entry = {id:cur_id, type: treeni, result: tulos};
		
		server_edit(entry);
	}
	else if(action_type == 'add')
	{
		var entry = {id:'xxxxxxxx'+move_index, type: treeni, result: tulos};
		
		var server_entry = {result: tulos, type: treeni, resultType:"count", ts: new Date().getTime()};
		server_add(server_entry);
		
		/*table_add(entry, move_index);
		array_add(entry);
		
		move_index++;*/
	}
	
	action_type = 'add';
	event.preventDefault();
});

function server_remove(id)
{
	$.mobile.loading("show");

	$.ajax({
      beforeSend: function(xhrObj){
              xhrObj.setRequestHeader("token", clientId + ";" + token);
      },
      type: "POST",
      url: baseURL+'/rest/activity/delete/' + id,
      dataType: "json",
      success: function(json){
       // navigator.notification.alert(json, function(){}, "Taisto", "OK");
        console.log(json);
        
        table_remove(id);
				array_remove(cur_index);
				
				$.mobile.loading("hide");
      },
 			error: function(json)
      {
      	console.log(json);
        navigator.notification.alert("Fail to Delete Data from the Server!", function(){}, "Taisto", "OK");
      	$.mobile.loading("hide");
      }
	});
}

function server_add(entry)
{
	$.mobile.loading("show");
	
	$.ajax({
      beforeSend: function(xhrObj){
              xhrObj.setRequestHeader("token", clientId + ";" + token);
              xhrObj.setRequestHeader("Content-Type", "application/json");
      },
      type: "POST",
      url: baseURL+'/rest/activity/save',
      dataType: "json",
      data: JSON.stringify([entry]),
      //data: [entry],
      success: function(json){
      //  navigator.notification.alert(json);
        console.log(json);
        
        table_add(entry, move_index);
				array_add(entry);
				move_index++;
				
				$.mobile.loading("hide");
      },
 			error: function(json)
      {
      	console.log(json);
      	navigator.notification.alert("Fail to Save Data on the Server!", function(){}, "Taisto", "OK");
      	$.mobile.loading("hide");
      }
	});
}

function server_edit(entry)
{
	$.mobile.loading("show");
	
	$.ajax({
      beforeSend: function(xhrObj){
              xhrObj.setRequestHeader("token", clientId + ";" + token);
              xhrObj.setRequestHeader("Content-Type", "application/json");
      },
      type: "POST",
      url: baseURL+'/rest/activity/update/' + entry.id,
      dataType: "json",
      data: JSON.stringify(entry),
      success: function(json){
        
        console.log(json);
        
        table_edit(entry, cur_index);
				array_edit(entry);
				cur_index = 0;
				
				$.mobile.loading("hide");
      },
 			error: function(json)
      {
      	console.log(json);
      	navigator.notification.alert("Fail to Update Data on the Server!", function(){}, "Taisto", "OK");
      	$.mobile.loading("hide");
      }
	});
}