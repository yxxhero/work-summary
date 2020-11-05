//部分用lodashJS中方法，部分是原生JS


//截取并排序
let speciments = [{ speciment_id: '212-332', name: '张三' }, { speciment_id: '212-2', name: '王五' }, { speciment_id: '212-33', name: '赵四' }];
//法一：
speciments = speciments && speciments.reduce((res, item) => {
  item.speciment_id = _.last(item.speciment_id.split('-'));
  return [...res, item]
}, []).sort((a, b) => {
  return a.speciment_id - b.speciment_id
})
//法二：
speciments = speciments && speciments.sort((a, b) => {
  return _.last(a.speciment_id.split('-')) - _.last(b.speciment_id.split('-'))
})


//模版用法
renderTestResult('result_explain', '<%- payload && payload.testing_result && payload.testing_result.result_explain && payload.testing_result.result_explain.explain && payload.testing_result.result_explain.explain.replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r") %>');
function renderTestResult(domName, datas) {
  var resultDom = document.getElementById(domName);
  datas = datas.split(/\n/);
  for (var i = 0; i < datas.length; i++) {
    var divDom = document.createElement('div');
    divDom.innerHTML = datas[i];
    resultDom.appendChild(divDom);
  }
}


//2020-03-04日期格式
function Appendzero(obj) {
  if (obj < 10) return "0" + "" + obj;
  else return obj;
}

function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return year + "-" + Appendzero(month) + "-" + Appendzero(day);
}


//JSON.parse遇见转义字符
function escapeString(data) {
  var dataString = data.replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r");
  return JSON.parse(dataString);
}


//实现ES6中join逗号分割
function joinArr(item) {
  var nameStr = '';
  for (var i = 0; i < item.length; i++) {
    if (nameStr.length === 0) {
      nameStr += item[i]
    } else {
      nameStr += "," + item[i]
    }
  }
  return nameStr;
}


//切割数组   [[123],[1,2]]
console.log(group(arr, 3))

function group(array, subGroupLength) {
  var index = 0;
  var newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }
  return newArray;
}


//lodash中_.get()原生写法
function deepGet(object, path, defaultValue) {
  return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
    .reduce((o, k) => (o || {})[k], object) || defaultValue;
}


//momentJS今天到一年前今天
const newStrat = moment();
const newEnd = moment().subtract(1, "years");
let newList = new Array();
newList.push(newEnd)
newList.push(newStrat)


//CSS避免分页
/*
@media print
  {
    table {page-break-inside:avoid;}
  }
*/


//div识别角标，可编辑的div
/*
<div dangerouslySetInnerHTML={{__html: value}} contenteditable='true'></div>
*/


//js中字符串超长作固定长度加省略号（...）处理
/* * 
 用途：js中字符串超长作固定长度加省略号（...）处理
 参数说明：
    str:需要进行处理的字符串，可含汉字
    len:需要显示多少个汉字，两个英文字母相当于一个汉字
    ~是按位取bai反运算，~~是取du反两次。
 */
function beautySub(str, len) {
  var reg = /[\u4e00-\u9fa5]/g,
    slice = str.substring(0, len),
    cCharNum = (~~(slice.match(reg) && slice.match(reg).length)),
    realen = slice.length * 2 - cCharNum - 1;
  return str.substr(0, realen) + (realen < str.length ? "..." : "");
}


//添加句号
request.from.doctor.complain = request.from.doctor.complain.slice(0, request.from.doctor.complain.length) + '。'


//竖向表格
function renderParameterTable() {
  var container = document.getElementById('test_parameter')
  var datas = escapeString('<%- JSON.stringify((payload && payload.test_parameter) || [], function replacer(key, value){if(typeof value === "string"){return value.replace(/\'/g,"&rsquo;").replace(/\"/g,"&rsquo;");} return value;}) %>');

  var rows = [
    { name: 'test_name', value: '' },
    { name: 'genes', value: '目标基因数' },
    { name: 'length', value: '目标长度（M)' },
    { name: 'coverage', value: '目标覆盖度（%)' },
    { name: 'depth', value: '目标平均深度' },
    { name: 'depth_10', value: '目标平均深度>10位点比（%）' }
  ];
  if ((datas && datas.length === 0) || (datas && datas[0].test_name === '')) {
    rows.splice(0, 1)
  }
  for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    var row = rows[rowIndex];
    var tr = document.createElement('tr');
    var firstTd = document.createElement('td');
    firstTd.width = '200px';
    var firstTdText = document.createTextNode(row.value);

    firstTd.appendChild(firstTdText);
    tr.appendChild(firstTd);
    for (var tdIndex = 0; tdIndex < datas.length; tdIndex++) {
      var td = document.createElement('td');
      var tdData = datas[tdIndex];

      var tdText = document.createTextNode(tdData[row.name] || '');
      td.appendChild(tdText);
      tr.appendChild(td);
    }
    if (datas && datas.length === 0) {
      var td = document.createElement('td');
      var tdText = document.createTextNode('');
      td.appendChild(tdText);
      tr.appendChild(td);
    }
    container.appendChild(tr);
  }
}



//html识别换行
renderTestResult('reference', '<%- payload && payload.testing_result && payload.testing_result.description && payload.testing_result.description.reference && payload.testing_result.description.reference.replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r") %>');

function renderTestResult(domName, datas) {
  var resultDom = document.getElementById(domName);
  datas = datas.split(/\n/);
  for (var i = 0; i < datas.length; i++) {
    var divDom = document.createElement('div');
    divDom.innerHTML = datas[i];
    resultDom.appendChild(divDom);
  }
}



//判断字符是否为空的方法
function isEmpty(obj) {
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  if (typeof obj == "undefined" || obj == null || obj == "" || re.test(obj)) {
    return true;
  } else {
    return false;
  }
}


//为空或全部为空格正则
var test = "      ";
if (test.match(/^[ ]*$/)) {
  console.log("为空或全部为空格");
}



//react动态设置className
/*
  className={`${newClassName ? 'newStyle': ''}`}
  style={{fontWeight: (data._id === newProjectName._id) ? 'blod': 'normal'}}
*/


//html文字乱码
<meta http-equiv="content-type" content="text/html; charset=utf-8" />


//react onchange setState 解决方案，使用延迟器。
function handleChange(value) {
  if (this.timer) {
    clearTimeout(this.timer)
  }
  const { onBlur, onChange } = this.props;
  this.timer = setTimeout(() => {
    this.setState({
      text: value
    }, () => {
      onBlur && onBlur(value);
    })
  }, 500)
}


//实现去掉前后字符
function renderParameterTable() {
  var testResult = document.getElementById('result')
  var payloadData = '<%- JSON.stringify(payload && payload.testConclusion && payload.testConclusion.literature_one) %>';
  payloadData = payloadData.substr(1)
  payloadData = payloadData.substr(0, payloadData.length - 1);
  testResult.innerHTML = payloadData;
}


//解决父元素display:flex布局下的子元素宽度无效问题
/*
  子元素设置：width: 120px;
            flex-shrink: 0;
*/


//react props传递过来的数据更改了，加cloneDeep就不更改props了
function handleConfirm({ forms, datas, category }) {
  const { detectionResults } = this.state;
  detectionResults.push({ forms, datas: _.cloneDeep(datas), category });
  this.setState({
    detectionResults,
    deleted: null
  });
}


//隐藏浏览器内置打印按钮，隐藏浏览器滚动条，使用属性src={`${url}#toolbar=0`}
<iframe
  id="iframeid"
  src={`${url}#toolbar=0`}
  width="100%"
  height={clientHeight > 700 ? '900px' : '600px'}
  frameborder={0}
></iframe>


//富文本的数据带标签的字符串处理
const dealString = (str) => {
  let result = "";
  let flag = false;
  for (let char of str) {
    if (char === ">") {
      flag = true;
    }
    if (char === "<") {
      flag = false
    }
    if (flag && char !== ">") {
      result = result + char;
    }
  }
  return result;
}

let str = `<p><span style="color: rgb(51, 51, 51); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">餐饮复工需要什么手续和准备工作。</span><br>
</p>`

console.log(dealString(str));//餐饮复工需要什么手续和准备工作。


// test.describeStacks(queryPara, queryHeader).then(function (data) {
//     console.log(data);
// });
//方法一
async function fn() {
  let data = await test.describeStacks(queryPara, queryHeader);
  console.log(data);
  return data;
}
fn().then(res => {
  console.log(res);
})
//方法二
let data;
async function fn() {
  data = await test.describeStacks(queryPara, queryHeader)
  console.log(data);
}
fn();


//设置对象数据操作
if (!_.size(_.get(payload, 'sample_info_modify'))) {
  payload.sample_info_modify = {
    sample_id: _.get(finalData, 'sample_id'),
    test_id: _.get(finalData, 'test_id'),
    type: _.get(finalData, 'type')
  }
}


//tree类型数据处理
function nameList(data) {
  function nameList(dataList) {
    let tempList = [];
    if (dataList.type == 'atom') {
      const temp = dataList.assigne.map(i => ({
        name: i.name
      }));
      tempList = tempList.concat(temp);
    } else {
      dataList.subtasks.forEach(obj => {
        tempList = tempList.concat(nameList(obj));
      });
    }
    return tempList;
  }
  const writer_plan = nameList(data.sequence[0]);
  const auditor_plan = nameList(data.sequence[1]);
  return {
    writer_plan,
    auditor_plan
  }
}


//tree类型数据处理
const getUsers = (tasks) => {
  let assignes = [];
  tasks.forEach((task) => {
    const { assigne, subtasks } = task;
    assignes = assignes.concat(assigne);
    if (subtasks) {
      assignes = assignes.concat(getUsers(subtasks));
    }
  });
  return assignes;
};
getUsers(_.filter(a.sequence, s => s.category === 'writer'))


//过滤数组中努力了，undefined等无效值
var arr = [1, 2, 3, null, 4, undefined, 5, null]
arr = arr.filter(Boolean)


//统计字符串中各种类型数据的长度
function getChartWidth(dataStr) {
  var chinese = /[\u4E00-\u9FA5]/g;
  var capital = /[A-Z]/g;
  var lowercase = /[a-z]/g;
  var number = /[0-9]/g;
  var chineseWidth = 0;
  var capitalWidth = 0;
  var lowercaseWidth = 0;
  var numberWidth = 0;
  if (dataStr.match(chinese)) {
    chineseWidth = dataStr.match(chinese) && dataStr.match(chinese).length
  } else if (dataStr.match(capital)) {
    capitalWidth = dataStr.match(capital) && dataStr.match(capital).length
  } else if (dataStr.match(lowercase)) {
    lowercaseWidth = dataStr.match(lowercase) && dataStr.match(lowercase).length
  } else if (dataStr.match(number)) {
    numberWidth = dataStr.match(number) && dataStr.match(number).length
  }

  return { chineseWidth, capitalWidth, lowercaseWidth, numberWidth }
}


//JOSN.stringify遇见轮回指针数据报错处理  
//方法一：indent为2层
JSON.safeStringify = (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === "object" && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent
  );
  cache = null;
  return retVal;
};
console.log('options', JSON.safeStringify(你的JSON))

//如果需要JSON存储到sessionStorage里，推荐使用方法一；

//方法二：util是nodejs本身自带，不用安装，react也基于node跑的
import { inspect } from 'util'
console.log(inspect(你的JSON))


//React中的forceUpdate 强制更新




