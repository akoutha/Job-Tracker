function myFunction(company,pname,date,email,medium,interest,rec,link) {
  // define a custom style for all data labels
  var c = company
  var p = pname
  var d = date
  var e = email
  var m = medium
  var i = interest
  var r = rec
  var l = link
  var name = "newtestpt2"
  var labelStyle ={};
  labelStyle[DocumentApp.Attribute.BOLD] = true;
  labelStyle[DocumentApp.Attribute.FONT_SIZE] = 11;
  var sheet = null;
  
   // get today's date
  var today = new Date();
  
  // create a formatted version of today's date
  var formatted_today = Utilities.formatDate(today, "EDT","yyyy-MM-dd");   
  
  // number of hours from now to check for meetings
  var hours = 2;
  
  // create variable for now
  var now = new Date();
  
  // create variable for number of hours from now in milliseconds
  var period_from_now = new Date(now.getTime() + (hours * 60 * 60 * 1000));
  
  


  //<------------------------CREATE A MEETING NOTES FOLDER---------------------------------->
  
  // check to see if a meeting notes folder exists
  var meeting_notes_folder_exists = DriveApp.getFoldersByName('Job Tracking').hasNext();
  
  Logger.log('meeting_notes_folder_exists = ' + meeting_notes_folder_exists);
  // create the main meeting notes folder if it does note exist
  if (meeting_notes_folder_exists == false) {
    DriveApp.createFolder('Job Tracking');
    Logger.log('Job Tracking folder created');
  }
  
  // locate folder named Meeting Notes and instatiate variable
  var meeting_notes_folder = DriveApp.getFoldersByName('Job Tracking').next();
  //Create doc 
  
  var file_exists = DriveApp.getFoldersByName('Job Tracking').next().getFilesByName(name).hasNext()
  if(file_exists == false){
    sheet = SpreadsheetApp.create(name);
    sheet.appendRow(['Company','Position Name','Date','Email','Medium','Interest','Recruiter','Link','Status']);
    sheet.appendRow([c,p,d,e,m,i,r,l]);
    var file = DriveApp.getRootFolder().getFilesByName(name).next()
    file.makeCopy(DriveApp.getFoldersByName('Job Tracking').next()).setName(file.getName());
    file.setTrashed(true);
    var spread_2 = DriveApp.getFilesByName(name).next().getId()
    var copy = SpreadsheetApp.openById(spread_2)
    
  
    
    Logger.log(sheet.getUrl()); 
    /* var file = DriveApp.getRootFolder().getFilesByName(name).next();
      file.makeCopy(DriveApp.getFoldersByName('Job Tracking').next()).setName(file.getName());
      file.setTrashed(true);
      var spread_2 = DriveApp.getFilesByName(name).next().getId() ;
      var spread_copy = SpreadsheetApp.openById(spread_2) */
      
      //copy.appendRow(['Company','Position Name','Date','Email','Medium','Interest','Recruiter','Link'])
      var cell = copy.getRange('A1:H1')
      cell.setFontColor("white")
      cell.setBackground("black")
      cell.setHorizontalAlignment("center")
      //spread_copy.appendRow([c,p,d,e,m,i,r,l])
      
      
  }
  else{
    //sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name)
    var yeet = DriveApp.getFoldersByName('Job Tracking').next().getFilesByName(name).next().getId()
    var s2 = SpreadsheetApp.openById(yeet).getActiveSheet().activate()
   // var s = SpreadsheetApp.getActiveSpreadsheet()s
   // var ss = s.getSheetByName(name)
   // ss.activate()
    //var sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name)
    s2.appendRow([c,p,d,e,m,i,r,l])
    var row = s2.getLastRow()
    var lastRow = 'A'+row+':'+'H'+row
    //var lastCell = 'H'+row
    var lastCellRow = s2.getRange(lastRow)
   lastCellRow.setBackground('yellow')
   // ss.appendRow([c,p,d,e,m,i,r,l])
   
      
    
  }
  
  
}

function doGet() {// runs HTML code
  
  return HtmlService.createTemplateFromFile('test2').evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME); 
  //return HtmlService.createHtmlOutputFromFile('test').setSandboxMode(HtmlService.SandboxMode.IFRAME);
}


