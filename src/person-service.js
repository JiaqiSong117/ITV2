var personService = (function () {
  function showProgressBar() {
    document.querySelector('#progress').classList.add('active');
  }

  function clearProgressBar() {
    document.querySelector('#progress').classList.remove('active');
  }
  return {
    getPersonInfoByName: function (name) {
      return new Promise((resolve, reject) => {
        showProgressBar();
        axios
          .get(
            "https://filterbubbleflask.azurewebsites.net/api/tasks/CombinedSearch/?1=" + name
          )
          .then(function (response) {
            var result = response.data || [];
            result = JSON.parse(result);
            console.log(result);
            var item15 = [
              "CRIME",
              "HEALTHY LIVING",
              "ENTERTAINMENT",
              "ARTS & CULTURE",
              "STYLE & BEAUTY",
              "PARENTING",
              "POLITICS",
              "SPORTS",
              "BUSINESS",
              "WORLD NEWS",
              "FOOD & DRINK",
              "GREEN",
              "TRAVEL",
              "WELLNESS",
              "QUEER VOICES",
              "RELIGION"
            ];
            var result1 = [];
            for (let i = 0; i < result.length; i++) {
              for (const j of item15) {
                if (j == result[i].category) {
                  result1.push(result[i])
                }
              }
            }
            console.log(result1);
            if (result.length) {
              resolve(result1);
            } else {
              window.alert("empty result!");
            }
            clearProgressBar();
          })
          .catch(function (error) {
            window.alert("wrong search!");
            clearProgressBar();
          });
      });

    }
  };
})();