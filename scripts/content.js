// remove unwanted elements function
function remEl(el) {
    const elArray = document.querySelectorAll(el);
    elArray.forEach(function(zilch, index) {
        const parent = elArray[index].parentElement;
        parent.removeChild(elArray[index]);
    });
}
// Get ready to rumble!!!!
chrome.runtime.onMessage.addListener(function (msg) {
    // add tag to allow for font changing
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('http-equiv', 'Content-Security-Policy');
    metaTag.setAttribute('content', 'upgrade-insecure-requests');
    document.querySelector('head').appendChild(metaTag);
    // ping msg recieved
    console.log("recieved: " + msg.fileSysValOne + "/" + msg.fileSysValTwo);
    // set up the variables
    const url = msg.url;
    const navArray = msg.navArray;
    const fileSysValOne = msg.fileSysValOne;
    const fileSysValTwo = msg.fileSysValTwo;
    // remove stylesheet and other elements
    remEl('link');
    remEl('.overlay');
    remEl('.logo');
    remEl('.button');
    remEl('#buttons br');
    // fix image overflow
    if (url === "https://manvsmaths.com/13c/13_calculusmain.html") {
        document.querySelectorAll('.maintext')[2].setAttribute('id', "imgOverflow");
    }
    // replace nav buttons and set up nav links div
    const buttonsDiv = document.getElementById('buttons');
    // sort out the nav links
    const navLinksDiv = document.createElement('div');
    navLinksDiv.id = 'navLinks';
    buttonsDiv.appendChild(navLinksDiv);
    const navLinkArray = document.querySelectorAll('#buttons a');
    navLinkArray.forEach(function(zilch, index) {
        navLinkArray[index].innerHTML = navArray[index];
        // add the nav links div
        navLinksDiv.appendChild(navLinkArray[index]);
    });
    // create file system
    const fileSys = document.createElement('div');
    fileSys.id = 'fileSys';
    const mvm = document.createElement('a');
    mvm.innerHTML = 'ManVsMath > ';
    mvm.href = 'https://manvsmaths.com/home.html'
    fileSys.appendChild(mvm);
    //val one
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
    // val two
    const valTwo = document.createElement('a');
    valTwo.innerHTML = fileSysValTwo;
    valTwo.href = url;
    fileSys.appendChild(valTwo);
    buttonsDiv.appendChild(fileSys);
    // fix the table backgrounds
    const tdArray = document.querySelectorAll('td');
    for (let i = 0; i <= tdArray.length; i ++) {
        const el = tdArray[i];
        el.setAttribute('style', 'none');
    }
});