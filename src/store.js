var StoreCtrl = (function () {
    var dataStore, selectedPersons, currentPerson;
    initStore();
    function initStore() {
        dataStore = new Map();
        selectedPersons = new Map();
        currentPerson = undefined;
    }
    return {
        addPersonToStore: function (person) {
            dataStore.set(person.name, person);
            currentPerson = person;
        },
        addSelectedPerson: function (person) {
            selectedPersons.set(person.name, person);
        },
        removePerson: function (name) {
            selectedPersons.delete(name);
            dataStore.delete(name);
        },
        getSelectedPersons: function () {
            return selectedPersons;
        },
        getAllPersons: function () {
            return dataStore;
        },
        cleanAllData: function () {
            initStore();
        },
        computeChartsData: function () {
            var categories = [];
            var series = [];
            for (var key of selectedPersons.keys()) {
                categories = [...categories, ...Array.from(selectedPersons.get(key).dataMap.keys())];
            }
            categories = [...new Set(categories)];

            for (var key of selectedPersons.keys()) {
                var single = {};
                single.name = key;
                single.color = selectedPersons.get(key).color;
                single.data = categories.map(item => {
                    if (selectedPersons.get(key).dataMap.get(item)) {
                        return selectedPersons.get(key).dataMap.get(item)
                    }
                    return 0;
                });
                series.push(single);
            }
            return {
                categories: categories,
                series: series
            }
        },
        checkIfPersonExist: function(name){
            if(Array.from(dataStore.keys()).indexOf(name) > -1) return true;
            return false;
        }
    };
})();
