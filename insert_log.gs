function onEdit(e) {
  var user = Session.getActiveUser().getEmail();

  var ss = SpreadsheetApp.getActiveSpreadsheet(); //現在触っているファイルを取得
  var sheet = ss.getSheetByName('シート1'); //対象のシート名を選択(シート1の部分にシート名記載)
  var currentRow = sheet.getActiveCell().getRow(); //アクティブなセルの行番号を取得
  var currentCol = sheet.getActiveCell().getColumn(); //アクティブなセルの列番号を取得
  var currentCell = sheet.getActiveCell().getValue(); //アクティブなセルの入力値を取得
  var updateRange_date = sheet.getRange('B' + currentRow); //どの列に更新日時を挿入したいか。この場合はB列
  
  if(currentRow > 1　&& currentCol == 1) { //2行目以降かつA列の変更を参照とする
    var rowStart = e.range.rowStart;
    var rowEnd = e.range.rowEnd;
    var columnStart = e.range.columnStart;
    var columnEnd = e.range.columnEnd;
    
    for (var r = rowStart; r <= rowEnd; r++) {
      for (var c = columnStart; c <= columnEnd; c++) {
      // 編集されたセル(r, c)
      var edit_user = sheet.getRange(r, c+1);
      edit_user.setValue(e.user.getEmail());
      var date_range = sheet.getRange(r, c+2);
      date_range.setValue(Utilities.formatDate(new Date(), 'JST', 'yyyy/MM/dd'));
      }
    }
  }
}
