// pages/movies/more-movies/more-movies.js
var app = getApp();
// var util = require('../../../utils/util.js');
var util = require('../../../utils/util.js');
Page({

  data: {
    navTitle: '',
    requestUrl: '',
    totalCount: 0,
    count: 10,
    movies: []

  },
  onLoad: function (options) {
    var catetory = options.catetory;
    this.data.navTitle = catetory;
    var dataUrl = "";
    switch (catetory) {
      case "正在上映":
        dataUrl = app.globalData.doubanapi + "/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanapi + "/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a";
        break;
      case "top250":
        dataUrl = app.globalData.doubanapi + "/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a";
        break;

      default:
        break;
    }
    this.data.requestUrl = dataUrl;
    util.get(dataUrl, (data) => {
      this.processDoubanData(data);
    })

  },
  /**
   * UI渲染完执行，因此这个时候改变标题可行
   */
  onReady: function (options) {
    wx.setNavigationBarTitle({
      title: this.data.navTitle
    })

  },
  // onScrollLower: function (event) {

  //   var dataUrl = this.data.requestUrl + '&start=' + this.data.totalCount + '&count=' + this.data.count;
  //   console.log("加载更多" + dataUrl);
  //   wx.showNavigationBarLoading({
  //     complete: (res) => {},
  //   })
  //   util.get(dataUrl, (data) => {
  //     this.processDoubanData(data);
  //   })

  // },
  processDoubanData: function (data) {
    var subjects = data.subjects;
    this.data.totalCount += subjects.length;
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
    console.log("movies");
    console.log(movies);
    var newMovies = this.data.movies.concat(movies);
    console.log("newMovies");
    console.log(newMovies);
    this.setData({
      movies: newMovies
    });
    console.log("setData movies");
    console.log(this.data.movies);
    wx.hideNavigationBarLoading({
      complete: (res) => {},
    })

  },
  onPullDownRefresh: function (event) {
    console.log("下拉刷新");
    this.data.movies = [];

    util.get(this.data.requestUrl, (data) => {
      this.processDoubanData(data);
    })
  },
  onReachBottom: function () {
    var dataUrl = this.data.requestUrl + '&start=' + this.data.totalCount + '&count=' + this.data.count;
    console.log("加载更多" + dataUrl);
    wx.showNavigationBarLoading({
      complete: (res) => {},
    })
    util.get(dataUrl, (data) => {
      this.processDoubanData(data);
    })
  }
})