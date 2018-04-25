function ClearList() {
  chrome.storage.sync.set({blockedUserNames: ""}, function() {
    var status = document.getElementById('status');
    status.textContent = 'List cleared saved.';
    PopulateList();
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function PopulateList() {
  chrome.storage.sync.get('blockedUserNames', function(result) {
    var storedValues = result.blockedUserNames;
    var text = "<ul>";
    for (i = 0; i < storedValues.length; i++) {
      text += "<li>" + storedValues[i] + " <button id='" + storedValues[i] + "'>Remove</button></li>";
    }
    text += "</ul>";
    document.getElementById("users").innerHTML = text;
    AddButtonListeners();
  });
}

function RemoveUser() {
    var theUser = this.id;
    chrome.storage.sync.get(null, function(result, error) {
      var userList = result['blockedUserNames'];
      if (userList.includes(theUser)) {
        var newUserList = userList.filter(function(item) {
          return item !== theUser;
        });

      chrome.storage.sync.set({'blockedUserNames': newUserList});
      location.reload();
    }
  });
}

function AddButtonListeners() {
  var buttons = document.getElementsByTagName('button');
  for (var x = 0; x < buttons.length - 1; x++) {
    var but = buttons[x];
    but.addEventListener('click', RemoveUser)
  }
}

document.addEventListener('DOMContentLoaded', PopulateList);
document.getElementById('clearList').addEventListener('click', ClearList);
