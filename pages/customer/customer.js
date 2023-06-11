// pages/customer/customer.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ch: 0,
    curTab: 0,
    markers: [],
    raceName: "",
    raceType: "",
    raceMethod: "",
    racePeriod: "",
    raceNameOptions: getApp().globalData.raceNameData,
    raceTypeOptions: getApp().globalData.raceTypeData,
    raceMethodOptions: getApp().globalData.raceMethodData,
    racePeriodOptions: getApp().globalData.racePeriodData,
    raceNameValue:['0', '0-0'],
    raceTypeValue:['0', '0-0'],
    raceMethodValue:['0', '0-0'],
    racePeriodValue:['0', '0-0'],
    raceDate: new Date('2021-12-23').getTime(), 
    raceTimeText: "",
    raceDateStart: '2000-01-01 00:00:00',
    raceDateEnd: '2050-09-09 12:12:12'
  },
  changeTab: function(e) {
    let curTab = e.currentTarget.dataset.curtab;
    this.setData({
      curTab
    })
  },
  swiperChange: function(e) {//切换
    if(e.detail.source == 'touch') {
      let curTab = e.detail.current;
      this.setData({
        curTab
      })
    }
  },
  onTapMap: function (event){
    const latitude = event.detail.latitude;
    const longitude = event.detail.longitude;
    var that = this;
    qqmapsdk.reverseGeocoder({
      location:{
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        const latitude_res = res.result.location.lat;
        const longitude_res = res.result.location.lng;
        that.setData({
          coordinate_txt: latitude_res.toFixed(6) + ',' + longitude_res.toFixed(6),
          place_txt: res.result.address,
          address_txt: res.result.formatted_addresses.recommend,
          latitude: latitude_res,
          longitude: longitude_res,
          markers: [{
            id: 0,
            iconPath: `../../img/Marker3_Activated@3x.png`,
            latitude: res.result.location.lat,
            longitude: res.result.location.lng,
            width: 30,
            height: 30
          }]
        });
      },
      fail: function(error) {
        console.error(error);
      },
    })
  },
  handlePopup(e) {
    var button_id = e.currentTarget.id;
    var raceNameVisible_tmp;
    var raceTypeVisible_tmp;
    var raceMethodVisible_tmp;
    var racePeriodVisible_tmp;
    
    switch (button_id)
    {
      case "race-name":
        raceNameVisible_tmp = true;
        break;
      case "race-type":
        raceTypeVisible_tmp = true;
        break;
      case "race-method":
        raceMethodVisible_tmp = true;
        break;
      case "race-period":
        racePeriodVisible_tmp = true;
        break;
      default:
        break;
    }
    this.setData(
      {

      },
      () => {
        this.setData({ 
          raceNameVisible: raceNameVisible_tmp,
          raceTypeVisible: raceTypeVisible_tmp,
          raceMethodVisible: raceMethodVisible_tmp,
          racePeriodVisible: racePeriodVisible_tmp
        });
      },
    );
  },
  onVisibleChange(e) {
    this.setData({
      raceNameVisible: e.detail.visible,
      raceTypeVisible: e.detail.visible,
      raceMethodVisible: e.detail.visible,
      racePeriodVisible: e.detail.visible
    });
  },
  onRaceNameChange(e) {
    var raceNameValue_tmp = e.detail.value;
    var selectedLabel = getApp().findLabelByValue(raceNameValue_tmp[1], this.data.raceNameOptions);
    this.setData({
      raceNameValue: e.detail.value,
      raceName: selectedLabel
    });
  },
  onRaceTypeChange(e) {
    var raceTypeValue_tmp = e.detail.value;
    var selectedLabel = getApp().findLabelByValue(raceTypeValue_tmp[1], this.data.raceTypeOptions);
    this.setData({
      raceTypeValue: e.detail.value,
      raceType: selectedLabel
    });
  },
  onRaceMethodChange(e) {
    var raceMethodValue_tmp = e.detail.value;
    var selectedLabel = getApp().findLabelByValue(raceMethodValue_tmp[1], this.data.raceMethodOptions);
    this.setData({
      raceMethodValue: e.detail.value,
      raceMethod: selectedLabel
    });
  },
  onRacePeriodChange(e) {
    var racePeriodValue_tmp = e.detail.value;
    var selectedLabel = getApp().findLabelByValue(racePeriodValue_tmp[1], this.data.racePeriodOptions);
    this.setData({
      racePeriodValue: e.detail.value,
      racePeriod: selectedLabel
    });
  },

  showPicker(e) {
    const { mode } = e.currentTarget.dataset;
    console.log(mode);
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },
  hidePicker() {
    const { mode } = this.data;
    console.log(this);
    this.setData({
      [`${mode}Visible`]: false,
    });
  },

  onConfirm(e) {
    const { value } = e.detail;
    const { mode } = this.data;

    console.log('confim', value);

    this.setData({
      [mode]: value,
      [`${mode}Text`]: value,
    });

    this.hidePicker();
  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        //转为rpx
        let ch = (750 / res.screenWidth) * res.windowHeight - 80;
        this.setData({
          ch
        }) 
      },
    })

    qqmapsdk = new QQMapWX({
      key: 'GA7BZ-B753Z-5QFX5-Z7C7H-FOI7F-56FIN'
    });
    var that = this;
    qqmapsdk.reverseGeocoder(
      {
        success: function(res) {
          const latitude_res = res.result.location.lat;
          const longitude_res = res.result.location.lng;
          that.setData({
            coordinate_txt: latitude_res.toFixed(6) + ',' + longitude_res.toFixed(6),
            place_txt: res.result.address,
            address_txt: res.result.formatted_addresses.recommend,
            latitude: latitude_res,
            longitude: longitude_res,
            markers: [{
              id: 0,
              iconPath: `../../img/Marker3_Activated@3x.png`,
              latitude: res.result.location.lat,
              longitude: res.result.location.lng,
              width: 30,
              height: 30
            }]
          });
        },

        fail: function(res)
        {

        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})