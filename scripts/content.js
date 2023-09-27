// remove unwanted elements function
function remEl(el) {
    const elArray = document.querySelectorAll(el);
    elArray.forEach(function(zilch, index) {
        const parent = elArray[index].parentElement;
        parent.removeChild(elArray[index]);
    });
}
// listen for message from background.js
chrome.runtime.onMessage.addListener(function (msg) {
    // ping msg recieved to the console
    console.log("recieved: " + msg.fileSysValOne + "/" + msg.fileSysValTwo);
    // set up variables
    const url = msg.url;
    const navArray = msg.navArray;
    const fileSysValOne = msg.fileSysValOne;
    const fileSysValTwo = msg.fileSysValTwo;
    // remove stylesheet and other elements using the remove element function
    remEl('link');
    remEl('.overlay');
    remEl('.logo');
    remEl('.button');
    remEl('#buttons br');
    // set up nav links div in place of the old nav buttons
    const buttonsDiv = document.getElementById('buttons');
    const navLinksDiv = document.createElement('div');
    navLinksDiv.id = 'navLinks';
    buttonsDiv.appendChild(navLinksDiv);
    const navLinkArray = document.querySelectorAll('#buttons a');
    navLinkArray.forEach(function(zilch, index) {
        navLinkArray[index].innerHTML = navArray[index];
        navLinksDiv.appendChild(navLinkArray[index]);
    });
    // create the file system
    const fileSys = document.createElement('div');
    fileSys.id = 'fileSys';
    const mvm = document.createElement('a');
    mvm.innerHTML = 'ManVsMath > ';
    mvm.href = 'https://manvsmaths.com/home.html'
    fileSys.appendChild(mvm);
    // set up value one
    const valOne = document.createElement('a');
    valOne.innerHTML = fileSysValOne + ' > ';
    // sort out the href for fileSysValOne
    before_  = url.split('_')[0];   
    if (url.includes("calculus")) {
        valOne.href = before_ + '_calculusmain.html';
    } else if (url.includes("statistics")) {
        valOne.href = before_ + "_statisticsmain.html"
    } else if (url.includes("teachers")) {
        valOne.href = "https://manvsmaths.com/teachers/teachersmain.html";
    } else if (url.includes("lollipop" ||
                url.includes("ncea") ||
                url.includes("plus"))) {
        valOne.href = url;
    } else {
        valOne.href = before_ + '_main.html';
    }
    fileSys.appendChild(valOne);
    // set up val two
    const valTwo = document.createElement('a');
    valTwo.innerHTML = fileSysValTwo;
    valTwo.href = url;
    fileSys.appendChild(valTwo);
    buttonsDiv.appendChild(fileSys);
    // fix image overflow issue on 13 calculus main page
    if (url === "https://manvsmaths.com/13c/13_calculusmain.html") {
            document.querySelectorAll('.maintext')[2].setAttribute('id', "imgOverflow");
    }
    // fix the table backgrounds on teachers matrix page
    if (url === "https://manvsmaths.com/teachers/teachersmatrix.html") {
            const tdArray = document.querySelectorAll('td');
    for (let i = 0; i <= tdArray.length; i ++) {
        const el = tdArray[i];
        el.setAttribute('style', 'none');
    }
    }
});