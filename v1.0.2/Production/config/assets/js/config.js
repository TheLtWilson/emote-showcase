function getFromElements(){let checkForNerdsBypassingCharacterLimits=document.getElementById("customHeaderText").value.substring(0,20);return{style:{accentColor:document.getElementById("accentColor").value,backgroundColor:document.getElementById("backgroundColor").value,headerFontColor:document.getElementById("headerFontColor").value,fontColor:document.getElementById("fontColor").value},settings:{showTwitch:document.getElementById("showTwitch").checked,showBTTV:document.getElementById("showBTTV").checked,showFFZ:document.getElementById("showFFZ").checked,showSevenTV:document.getElementById("showSevenTV").checked,showCustomHeaderText:document.getElementById("showCustomHeaderText").checked,showHeaderPFP:document.getElementById("showHeaderPFP").checked,customHeaderText:checkForNerdsBypassingCharacterLimits}}}function showAlert(type,text,time){switch(type){case"SUCCESS":document.getElementById("alertbox").className="alert alert-success",document.getElementById("alertboxtext").innerText=text.toString(),document.getElementById("alertbox").style.display="block",time&&setTimeout(()=>{document.getElementById("alertbox").style.display="none"},time);break;case"WARNING":document.getElementById("alertbox").className="alert alert-warning",document.getElementById("alertboxtext").innerText=text.toString(),document.getElementById("alertbox").style.display="block",time&&setTimeout(()=>{document.getElementById("alertbox").style.display="none"},time);break;case"DANGER":document.getElementById("alertbox").className="alert alert-danger",document.getElementById("alertboxtext").innerText=text.toString(),document.getElementById("alertbox").style.display="block",time&&setTimeout(()=>{document.getElementById("alertbox").style.display="none"},time)}}function showSettings(data){for(const property in data.settings)"boolean"==typeof data.settings[property]?null!=document.getElementById(property.toString())&&(document.getElementById(property.toString()).checked=data.settings[property]):null!=document.getElementById(property.toString())&&(document.getElementById(property.toString()).value=data.settings[property].toString());for(const property in data.style)null!=document.getElementById(property.toString())&&(document.getElementById(property.toString()).value=data.style[property].toString())}window.Twitch.ext.configuration.onChanged(()=>{var global=window.Twitch.ext.configuration.global,broadcaster=window.Twitch.ext.configuration.broadcaster;showSettings(JSON.parse(global.content)),broadcaster&&showSettings(JSON.parse(broadcaster.content))}),document.getElementById("saveButton").addEventListener("click",()=>{let data=getFromElements();window.Twitch.ext.configuration.set("broadcaster","2",JSON.stringify(data)),showAlert("SUCCESS","Successfully saved changes.",2e3)}),document.getElementById("resetButton").addEventListener("click",()=>{var global=window.Twitch.ext.configuration.global;showSettings(JSON.parse(global.content)),showAlert("WARNING",'All values have been reset to their defaults. Click "Save Changes" to save changes.',5e3)});