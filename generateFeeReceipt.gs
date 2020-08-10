function onOpen(){
	SpreadsheetApp.getUi().createMenu('Generate Fee Receipt').addItem('Generate Fee Receipt', 'createPDF').addToUi() 
}

function createPDF(){
	let copyFile = DriveApp.getFileById('enter google sheet id here').makeCopy(),
        copyID = copyFile.getId(),
        copyDoc = DocumentApp.openById(copyID),
        copyBody = copyDoc.getBody()
    
    let  activeSheet = SpreadsheetApp.getActiveSheet(),
	numberOfColumn = activeSheet.getLastColumn(),
	activeRowIndex = activeSheet.getActiveRange().getRowIndex(),
	activeRow = activeSheet.getRange(activeRowIndex, 1, 1, numberOfColumn).getValues(),
	headerRow = activeSheet.getRange(1, 1, 1, numberOfColumn).getValues(),
	columnIndex = 0,
    now = new Date()
    

  copyBody.replaceText('<<timestamp>>',  now)
  for (; columnIndex < headerRow[0].length; columnIndex++){
   copyBody.replaceText('<<' + headerRow[0][columnIndex] + '>>',  activeRow[0][columnIndex])
  }
  
  copyDoc.saveAndClose()

  let desintation = DriveApp.getFolderById('enter google folder id here')
  let  newFile = desintation.createFile(copyDoc.getAs('application/PDF'))
  
  newFile.setName(activeRow[0][0] + ' '  + 'Paid Fee challan for Month August 2020')
  
  copyFile.setTrashed(true)
  
  SpreadsheetApp.getUi().alert(activeRow[0][0] + ' '  + 'Fee challan is saved on google drive as pdf')
}

