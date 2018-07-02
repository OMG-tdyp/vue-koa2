const fs = require('fs');
fs.readFile('./goods.json','utf8',function(err,data) {
    let newData = JSON.parse(data);
    let pushData = [];
    newData.RECORDS.map((value,index) => {
        value.IMAGE1 && pushData.push(value);
    });
    fs.writeFile('./data_json/newGoods.json',JSON.stringify(pushData),err => {
        err ? console.log('写入文件失败') : console.log('写入文件成功');
    })
});