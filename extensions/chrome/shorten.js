// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function shortenURL(tab){
	var url = tab.url;
	var req = new XMLHttpRequest();
	req.open("POST", "http://fnil.me/link/add");
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.onreadystatechange = function(){           
		if(req.readyState === 4 && req.status === 200){
			var rt = JSON.parse(req.responseText);
			var notification;
			if(rt.error){
				notification = webkitNotifications.createNotification(
					'icon.png',
					'Shorten error',
					rt.error
				);
			}else{
				copyToClipboard(rt.result);
				notification = webkitNotifications.createNotification(
					'icon.png',
					'Shorten',
					'Shorten URL:'+rt.result+",it's on clipboard,you can paste it."
				);
			}
			notification.show();
			setTimeout(function(){
				notification.cancel();
			},4000);
		}
	}
	req.send(JSON.stringify({'url':url}));
}

function copyToClipboard(text){
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}


chrome.browserAction.onClicked.addListener(function(tab) {
	shortenURL(tab);
});