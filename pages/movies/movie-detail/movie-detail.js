var util = require('../../../utils/util.js');
import { Movie } from 'class/Movie.js';
var app = getApp();
Page({
  data: {

  },

  onLoad: function (options) {
    var movieId = options.id;
    var detailUrl = app.globalData.doubanbase + "/v2/movie/subject/" + movieId;
    var movie = new Movie(detailUrl);
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })

    // util.get(detailUrl, (data) => {
    //   console.log(data);
    //   var director = {
    //     avatar: "",
    //     name: "",
    //     id: ""
    //   }

    //   if (data.directors[0] != null) {
    //     if (data.directors[0].avatars != null) {
    //       director.avatar = data.directors[0].avatars.large;
    //     }
    //     director.name = data.directors[0].name;
    //     director.id = data.directors[0].id;
    //   }

    //   var movie = {
    //     movieImg: data.images ? data.images.large : "",
    //     country: data.countries[0],
    //     title: data.title,
    //     originalTitle: data.original_title,
    //     wishCount: data.wish_count,
    //     commentCount: data.comments_count,
    //     year: data.year,
    //     generes: data.genres.join(","),
    //     stars: util.convertToStarsArray(data.rating.stars),
    //     score: data.rating.average,
    //     director: director,
    //     casts: util.convertToCastString(data.casts),
    //     castsInfo: util.convertToCastInfos(data.casts),
    //     summary: data.summary

    //   }
    //   this.setData({
    //     movie
    //   });

    //   console.log(this.data.movie);


    // });
  },
  
  /*查看图片*/
  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  }
})