var posts = document.getElementsByClassName('cf');
chrome.storage.sync.get('blockedUserNames', function(result){
  var storedValues = result.blockedUserNames;
  if(storedValues != null){
    for (var i = 0, l = posts.length; i < l; i++) {
      for (var j = 0, k = storedValues.length; j < k; j++){
        var user = 'a[href="https://www.in-depthoutdoors.com/community/members/' + storedValues[j] + '/"]'
        var nodeValue = $(user).parents("article").attr("id");
        var elem = document.querySelector('#' + nodeValue);
        elem.parentNode.removeChild(elem);
      }
    }
  }
})
