chrome.contextMenus.create({"title": "Add user to IDO block list", "contexts":['selection'],"onclick": selectUser});

function selectUser(info, tab) {
  if(info.selectionText.charAt(0) === '@')
    info.selectionText = info.selectionText.slice(1);

  var selection = []
  selection.push(info.selectionText);

  chrome.storage.sync.get('blockedUserNames', function(result){
    if(result.blockedUserNames == "" || result.blockedUserNames == null) {
      chrome.storage.sync.set({'blockedUserNames': selection}, function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, {action: "refresh"}, function(response) {});
        });
      });
      return;
    }

    storedValues = result.blockedUserNames;
    storedValues.push(info.selectionText);
    chrome.storage.sync.set({'blockedUserNames': storedValues}, function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, {action: "refresh"}, function(response) {});
        });
    });
  });
}
