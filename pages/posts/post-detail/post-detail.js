// pages/posts/post-detail/post-detail.js
var postsdData = require('../../../data/posts-data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    var postItem = postsdData.postList[postId];
    this.setData({
      postItem
    });
    this.setData({
      postId
    });
    // wx.setStorageSync('key', "kingja");
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var collected = postsCollected[postId];
      if (collected) {
        this.setData({
          collected
        });
      }
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }

    if (this.data.isPlaying && app.globalData.g_isPlayingMusic) {
      this.setData({
        isPlaying: true
      });
    }

    this.setMusicPlayListener();

  },
  setMusicPlayListener: function () {

    wx.onBackgroundAudioPlay((res) => {
      console.log('onBackgroundAudioPlay');
      this.setData({
        isPlaying: true
      });
      app.globalData.g_isPlayingMusic = true;
    });
    wx.onBackgroundAudioPause((res) => {
      console.log('onBackgroundAudioPause');
      this.setData({
        isPlaying: false
      });
      app.globalData.g_isPlayingMusic = false;
    })

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

  },
  onCollect: function (event) {
    console.log("收藏");
    var postsCollected = wx.getStorageSync('posts_collected');
    var collected = postsCollected[this.data.postId];
    collected = !collected;
    postsCollected[this.data.postId] = collected;
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected
    });

    wx.showToast({
      title: collected ? '收藏成功' : '取消成功',
      icon: 'success'
    })
  },
  onShare: function (event) {
    wx.showActionSheet({
      itemList: ["分享给微信好友", "分享到朋友圈", "分享到QQ", "分享到微博"],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    });
  },
  onMusicClick: function (event) {
    var isPlaying = this.data.isPlaying;
    if (isPlaying) {
      wx.pauseBackgroundAudio({
        complete: (res) => {},
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.postItem.music.url,
        title: this.data.postItem.music.title,
        coverImgUrl: this.data.postItem.music.coverImg
      })
    }
    isPlaying = !isPlaying;
    this.setData({
      isPlaying
    });



  }
})