/**
 * @fileOverview tests.js Gives testing code for the new page.
 * This spec is managed by the Jasmine testing library.
 **/

describe ("Help New Suite", function() {

  // Load the fixtures from html2js
  var keys = Object.keys(__html__);
  var selectKey;
  keys.forEach(function(key) {
    if( key.indexOf("Help/new.html") >= 0 ) {
      selectKey = key;
    }
  });

  // Get an HTML document defined by the pre-processor.
  // This is a rough hack because HTML2JS seems to assign the
  // key to the absolute URL, which is not reliable on
  // continuous integration.
  beforeEach(function() {
    document.body.innerHTML = __html__[selectKey];
  });

  it("initializes properly", function() {
    
    // Should initialize the navigation
    callbacks.pendingLogin();
    var domain = privlyNetworkService.contentServerDomain();

    if( privlyNetworkService.platformName() !== "HOSTED" ) {

      // if the app is not hosted, the user should first be directed to the
      // content_server page of the app bundle.
      expect($(".home_domain").attr("href")).toBe('../Help/content_server.html');
    } else {

      // if the application is hosted, the URL should connect to the domain's root
      expect($(".home_domain").attr("href")).toBe("http://" + window.location.href.split("/")[2]);
    }
    expect(domain.split("/")[2]).toBe($(".home_domain").text());
  });
  
});
