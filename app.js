// app.js
App({
  globalData: {
    raceNameData: [
      { 
        label :'水稻品种',
        value : 'race-0',
        children: [
          {label: '籼稻', value: 'race-0-0'},
          {label: '粳稻', value: 'race-0-1'},
          {label: '杂交稻', value: 'race-0-2'},
        ]
      }
    ],
    raceTypeData: [
      { 
        label :'早中晚型',
        value : 'raceType-0',
        children: [
          {label: '早稻', value: 'raceType-0-0'},
          {label: '中稻', value: 'raceType-0-1'},
          {label: '晚稻', value: 'raceType-0-2'},
        ]
      }
    ],
    raceMethodData: [
      { 
        label :'种植方式',
        value : 'raceMethod-0',
        children: [
          {label: '直播', value: 'raceMethod-0-0'},
          {label: '移栽', value: 'raceMethod-0-1'},
        ]
      }
    ]
  },

  /**
   * 搜索对应
   */
  findLabelByValue(value, data) {
    for (const item of data) {
      if (item.value === value) {
        return item.label;
      }
      if (item.children) {
        const label = this.findLabelByValue(value, item.children);
        if (label) {
          return label;
        }
      }
    }
    return null;
  },
})
