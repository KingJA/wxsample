Page({

  onTap:function(){
    // //隐藏
    // wx.navigateTo({
    //   url: '../posts/posts'
    // })

    //卸载， 跳转后左上角没返回按钮
    wx.redirectTo({
      url: '../posts/posts'
    })
  }
  
})