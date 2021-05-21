import xlsx from "xlsx";

export function readWorkFlowFile(file) {
  return new Promise((resolve) => {
    let wb = new Workbook();
    let workbook = [];
    let reader = new FileReader();
    reader.readAsBinaryString(file[0]);
    //异步
    reader.onload = (event) => {
      let data = event.target.result;
      let workbook = xlsx.read(data, { type: "binary" });
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      console.log(sheet);
      let columnMax = sheet["!ref"];
      // 匹配数字
      let column_arr = /([A-Z]+)([0-9]+):([A-Z]+)([0-9]+)/i.exec(columnMax);

      let raw_min = column_arr[1], //A
        col_min = column_arr[2], //1
        raw_max = column_arr[3], //N
        col_max = column_arr[4]; //20

      wb.workNo = sheet.B2["w"];
      wb.workName = sheet.B3["w"];
      wb.userProtectionTools = sheet.B4["w"];
      wb.userTools = sheet.B5["w"];
      wb.partName = sheet.B6["w"];
      wb.sequence = sheet.D3["w"];
      console.log(wb);
      let j = ["A", "B", "C", "D", "E", "I"];

      let wpl = [];
      for (let i = 9; i <= col_max - 3; i++) {
        console.log("=========");
        let wp = new WorkbookProcess();
        j.forEach((u) => {
          let p = sheet[u + i];
          console.log(p);
          if (p != undefined) {
            console.log(p.w);
            let n = sheet[u + i].w;
            switch (u) {
              case "A":
                wp.id = n;
                break;
              case "B":
                wp.explanation = n;
                break;
              case "c":
                wp.minutes = n;
                break;
              case "D":
                wp.seconds = n;
                break;
              case "E":
                wp.MainSteps = n;
                break;
              case "I":
                wp.focus = n;
                break;
            }
          }
        });
        wpl.push(wp);
      }
      console.log(wpl);
      wb.process = wpl;

      for (let i = 0; i < 2; i++) {
        let t = parseInt(col_max) - i;
        console.log("B" + t);
        console.log(sheet["B" + t]);
        if (sheet["B" + t] != undefined) {
          if (i == 0) {
            wb.other = sheet["B" + t].w;
          }
          if (i == 1) {
            wb.ban = sheet["B" + t].w;
          }
        }
      }

      console.log(wb);
    };

    //当load结束，回调
    //当执行resolve()方法，会激活调用处的then()方法
    reader.onloadend = () => {
      resolve(wb);
    };
  });
}

class Workbook {
  workNo;
  workName;
  userProtectionTools;
  userTools;
  partName;
  sequence;
  process;
  ban;
  other;
}

class WorkbookProcess {
  id;
  explanation;
  minutes;
  seconds;
  MainSteps;
  focus;
}
