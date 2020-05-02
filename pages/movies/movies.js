// pages/movies/movies.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerShow: true,
    searchPanelShow: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var theatersUrl = app.globalData.doubanbase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingsoonUrl = app.globalData.doubanbase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanbase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMoviesList(theatersUrl, "theater", "正在上映");
    this.getMoviesList(comingsoonUrl, "comingsoon", "即将上映");
    this.getMoviesList(top250Url, "top250", "top250");

  },
  getMoviesList: function (url, key, categoryTitle) {
    wx.request({
      url: url,
      header: {
        "Content-Type": "application/xml"
      },
      success: (res) => {
        this.processDoubanData(res.data, key, categoryTitle);
      },
      fail: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log();
      },
    });
  },
  processDoubanData: function (data, key, categoryTitle) {
    var subjects = data.subjects;
    var movies = [];

    for (var index in subjects) {
      var subject = subjects[index];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var movie = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      };
      movies.push(movie);
    }
    console.log(movies);
    var data = {};
    data[key] = {
      movies,
      categoryTitle
    };
    this.setData(data);

  },
  onMoreMovies: function (e) {
    console.log('更多');
    var catetory = e.currentTarget.dataset.catetory;
    console.log(catetory);
    wx.navigateTo({
      url: '/pages/movies/more-movies/more-movies?catetory=' + catetory,
    })

  },
  onBindFocus: function (e) {
    console.log('onBindFocus');
    this.setData({
      containerShow: false,
      searchPanelShow: true
    });

  },
  onBindinput: function (e) {

    console.log('onBindinput');
  },

  onCancelImgTab: function (e) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    });
  }
})