document.querySelector('#search').addEventListener('click', function () {
    var name = document.querySelector('#input').value;
    if (!name) {
        window.alert("please input a name first!");
        return;
    }
    if (StoreCtrl.checkIfPersonExist(name)) {
        window.alert("This name is already there!");
        document.querySelector('#input').value = '';
        return;
    }
    ChartCtrl.clearChart();
    personService.getPersonInfoByName(name).then(function (data) {
        getSelectList(data)
        var person = PersonCtrl.createPerson(name, data);
        document.querySelector('#input').value = '';
        StoreCtrl.addPersonToStore(person);
        ChartCtrl.updateChart(Array.from(person.dataMap.keys()), [{
            name: name,
            color: person.color,
            data: Array.from(person.dataMap.values())
        }]);
    });
    
});

document.querySelector('#combine').addEventListener('click', function () {
    // check if data are there
    if (StoreCtrl.getSelectedPersons().size === 0) {
        window.alert("Please add person!");
        return;
    }
    // parse selected data list
    var chartsData = StoreCtrl.computeChartsData();
    handlerChartData(chartsData)
    // update chart UI
    ChartCtrl.updateChart(chartsData.categories, chartsData.series);
});

document.querySelector('#cleanAll').addEventListener('click', function () {
    document.getElementById('select').style.display = 'none'
    document.getElementById('card').style.display = 'none'
    document.getElementById('tableData').style.display = 'none'
    
    //remove from UI cards
    var persons = StoreCtrl.getAllPersons();
    for (var key of persons.keys()) {
        document.querySelector('#' + persons.get(key).id).remove();
    }
    //remove from data store
    StoreCtrl.cleanAllData();
    // clear chart
    ChartCtrl.clearChart();
    
});

let tableDataTemp = [];
let tableData = [];

(function () {
    axios.get('https://filterbubblespring.azurewebsites.net/api/v1/suggestion/getAccount').then(res => {
        tableDataTemp = res.data.data
    })
})()

function changeSelect() {
    let sel = document.getElementById('select')
    let v = sel.options[sel.options.selectedIndex].value
    tableData = tableDataTemp.filter(item => item.category === v)
    
    document.getElementById('tableData').style.display = tableData.length > 0 ? 'block' : 'none'
    console.log(tableData, '表格数据')
    let table = document.getElementById('table')
    table.innerHTML = ''
    
    tableData.forEach(item => {
        let tableChildNode = document.createElement('div')
        tableChildNode.innerHTML = `<div><div class="name">${item.twitterusername}</div><div class="url"><a href="${item.url}">${item.url}</a></div></div>`
        // select 添加 option
        table.appendChild(tableChildNode)
    })
}

function handlerChartData(objData) {
    let list = []
    objData.series.forEach((item, index) => {
        item.data.forEach((value, mapIndex) => {
            if (!list[mapIndex]) {
                list[mapIndex] = 0
            }
            list[mapIndex] += value;
        })
    })
    
    let data = []
    list.forEach((item, index) => {
        data.push({
            category: objData.categories[index],
            value: item
        })
    })
    getSelectList(data)
}

function getSelectList(list) {
    if (!list.length) {
        return
    }
    console.log(list, '所有的数据')
    
    let selectNode = document.getElementById('select')
    selectNode.options.length = 0
    document.getElementById('specNode').innerHTML = ''
    
    selectNode.style.display = 'block'
    document.getElementById('card').style.display = 'block'
    
    // 找出分类的名字
    let key = Object.keys(list[0]).filter(item => item !== 'category')[0]
    // 过滤少于20的
    let selectData = list.filter(item => item[key] < 20);
    console.log(selectData, '小于20的')
    
    selectData.forEach(item => {
        let specNodeP = document.getElementById('specNode')
        let optionDom = document.createElement('option')
        let specNode = document.createElement('div')
        specNode.innerHTML = `<div>${item['category']}</div>`
        optionDom.innerHTML = `<option>${item['category']}</option>`
        // select 添加 option
        selectNode.appendChild(optionDom)
        specNodeP.appendChild(specNode)
    })
    
    changeSelect()
}

new Vue({
    el: '#app',
    data: {
        tableDataTemp: [],
        tableData: [],
    },
    created() {
        // axios.get('https://filterbubblespring.azurewebsites.net/api/v1/suggestion/getAccount').then(res => {
        //     this.tableDataTemp = res.data.data
        // })
    },
    methods: {
        // changeSelect() {
        //     let sel = document.getElementById('select')
        //     let v = sel.options[sel.options.selectedIndex].value
        //     this.tableData = this.tableDataTemp.filter(item => item.category === v)
        //
        //     document.getElementById('tableData').style.display = this.tableData.length > 0 ? 'block' : 'none'
        //     console.log(this.tableData, '表格数据')
        // }
    }
})
