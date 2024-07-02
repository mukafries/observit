const xlsx = require("xlsx");
const fs = require("fs");

export function exportToExcel(jsonArr, outputFilename) {
  let workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(
    workbook,
    xlsx.utils.json_to_sheet(jsonArr, "sample")
  );
  xlsx.writeFile(workbook, outputFilename + ".xlsx");
}
