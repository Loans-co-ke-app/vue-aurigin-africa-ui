export function exportToCsv(filename: string, data: Array<any>) {
  function convertToCsv(data: Array<any>) {
    const header = Object.keys(data[0]).join(",") + "\n";
    const body = data
      .map((obj) =>
        Object.values(obj)
          .map((val) => `"${val}"`)
          .join(",")
      )
      .join("\n");
    return header + body;
  }
  // Convert objects to CSV string
  const csvData = convertToCsv(data);

  // Create a Blob object with the CSV data
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

  // Create a download link with the Blob URL
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);

  // Click the download link to download the CSV file
  link.click();
}
